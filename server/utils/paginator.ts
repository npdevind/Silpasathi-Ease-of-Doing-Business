import { QueryResult } from "pg";

class Paginator {
    page: number;
    limit: number;
    offset: number;
    siblingCount: number;
    query: any;
    baseUrl: string;

    constructor(query, baseUrl = "", siblingCount = 1) {
        if (query.page && (isNaN(parseInt(query.page)) || parseInt(query.page) <= 0)) throw Error("Invalid page number");
        if (query.limit && (isNaN(parseInt(query.limit)) || parseInt(query.limit) <= 0)) throw Error("Invalid page limit");
        const page = query.page ? parseInt(query.page) : 1;
        const limit = query.limit ? parseInt(query.limit) : 10;
        const offset = (page - 1) * limit;
        this.page = page;
        this.limit = limit;
        this.offset = offset;
        this.query = query;
        this.baseUrl = baseUrl;
        this.siblingCount = siblingCount;
    }

    #range(start, end) {
        const length = end - start + 1;
        return Array.from({ length }, (_, idx) => idx + start);
    }
    // TODO: Some issue occurs will fix later
    #generateSearchQueryParam(totalRecords) {
        const searchParams = new URLSearchParams(this.query);
        searchParams.set("limit", String(this.limit));

        let pageLinksNumber: any = [];

        const DOTS = "...";
        const totalPages = Math.ceil(totalRecords / this.limit);

        // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        const totalPageNumbers = this.siblingCount + 5;

        /*
        If the number of pages is less than the page numbers we want to show in our
        paginationComponent, we return the range [1..totalPageCount]
        */
        if (totalPageNumbers >= totalPages) {
            pageLinksNumber = this.#range(1, totalPages);
        }

        const leftSiblingIndex = Math.max(this.page - this.siblingCount, 1);
        const rightSiblingIndex = Math.min(this.page + this.siblingCount, totalPages);
        /*
        We do not want to show dots if there is only one position left 
        after/before the left/right page count as that would lead to a change if our Pagination
        component size which we do not want
        */
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex <= totalPages - 2;
        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        if (!shouldShowLeftDots && shouldShowRightDots && leftSiblingIndex == 2) {
            const middleRange = this.#range(leftSiblingIndex, rightSiblingIndex);
            pageLinksNumber = [firstPageIndex, ...middleRange, DOTS, lastPageIndex];
        }
        if (!shouldShowLeftDots && shouldShowRightDots && leftSiblingIndex != 2) {
            //const leftItemCount = 2 * this.siblingCount;
            const leftRange = this.page === 1 ? [] : this.#range(1, leftSiblingIndex);
            const rightRange = this.#range(this.page, rightSiblingIndex);

            pageLinksNumber = [...leftRange, ...rightRange, DOTS, totalPages];
        }

        if (shouldShowLeftDots && !shouldShowRightDots && rightSiblingIndex == totalPages - 1) {
            const middleRange = this.#range(leftSiblingIndex, rightSiblingIndex);

            pageLinksNumber = [firstPageIndex, DOTS, ...middleRange, lastPageIndex];
        }

        if (shouldShowLeftDots && !shouldShowRightDots && rightSiblingIndex != totalPages - 1) {
            const rightRange = this.page === rightSiblingIndex ? [] : this.#range(rightSiblingIndex, totalPages);
            const leftRange = this.#range(leftSiblingIndex, this.page);

            pageLinksNumber = [firstPageIndex, DOTS, ...leftRange, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = this.#range(leftSiblingIndex, rightSiblingIndex);

            pageLinksNumber = [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }

        if (this.page === 0 || pageLinksNumber.length < 2) return [];

        const links: any = [];
        const lastPage = pageLinksNumber[pageLinksNumber.length - 1];
        searchParams.set("page", String(1));

        links.push({ active: false, disabled: this.page === 1, query: `${this.baseUrl}?${searchParams.toString()}`, label: "First" });
        searchParams.set("page", String(this.page - 1));
        links.push({ active: false, disabled: this.page === 1, query: `${this.baseUrl}?${searchParams.toString()}`, label: "Prev" });

        pageLinksNumber.forEach((item) => {
            if (item === DOTS) links.push({ active: false, disabled: true, query: "", label: DOTS });
            else {
                searchParams.set("page", item);

                links.push({
                    active: item === this.page,
                    query: `${this.baseUrl}?${searchParams.toString()}`,
                    label: item,
                });
            }
        });

        searchParams.set("page", String(this.page + 1));
        links.push({ active: false, disabled: this.page === lastPage, query: `${this.baseUrl}?${searchParams.toString()}`, label: "Next" });
        searchParams.set("page", lastPage);
        links.push({ active: false, disabled: this.page === lastPage, query: `${this.baseUrl}?${searchParams.toString()}`, label: "Last" });
        return links;
    }

    paginate(result: QueryResult<any>) {
        const totalRecords = result.rows[0] ? Number(result.rows[0].total_records) : 0;
        const totalPages = Math.ceil(totalRecords / this.limit);
        const links = this.#generateSearchQueryParam(totalRecords);

        const data = {
            from: (this.page - 1) * this.limit + 1,
            to: (this.page - 1) * this.limit + this.limit <= totalRecords ? (this.page - 1) * this.limit + this.limit : totalRecords,
            links: links,
            total_records: totalRecords,
            total_pages: totalPages,
            data_per_page: this.limit,
            current_page: this.page,
            data: result.rows.map((item) => {
                delete item.total_records;
                return { ...item };
            }),
        };

        return data;
    }
}

export = Paginator;
