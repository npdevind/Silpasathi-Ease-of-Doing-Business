import con from "../config/db";
import { limitClause, orderByClause, selectFieldsClause, whereClause } from "../utils";
import Paginator from "../utils/paginator";

export const buildSelectQuery = async (arrayData, tableName) => {
    try {
        const whereAddOn = await whereClause(arrayData[0].JoinTables ? arrayData[0].JoinTables[0].joinWhereAddOn : arrayData[0].whereAddOn);

        const orderBy = await orderByClause(arrayData[0].JoinTables ? arrayData[0].JoinTables[0].joinOrderBy : arrayData[0].orderBy ? arrayData[0].orderBy : "");

        const limit = await limitClause(arrayData[0].limit ? arrayData[0].limit : "", arrayData[0]?.isPagination[0]?.status ? arrayData[0].isPagination[0] : "");

        const groupByAddOn = arrayData[0].groupBy ? "group by " + arrayData[0].groupBy : "";

        const selectVal = await selectFieldsClause(arrayData);

        let theQuery: any = "";
        if (arrayData[0].JoinTables && arrayData[0].JoinTables[0].status) {
            let joinStatements: any = "";
            arrayData[0].JoinTables[0].tables.map((item) => {
                joinStatements += `${item.joinType} ${item.name} ${item.joinOn} `;
            });
            theQuery = `
                SELECT 
                    ${selectVal}
                FROM
                    ${tableName} as A
                ${joinStatements}               
                ${whereAddOn}
                ${orderBy}
                ${limit}`;
        } else {
            theQuery = `
            SELECT 
                ${selectVal}
            FROM
            ${tableName}
            ${whereAddOn}
            ${groupByAddOn}
            ${orderBy}
            ${limit}`;
        }

        // console.log(tableName + ">> " + theQuery);

        const query: any = await con.query(theQuery);
        if (arrayData[0]?.isPagination[0]?.status) {
            const paginator = new Paginator(arrayData[0]?.isPagination[0]?.status ? arrayData[0]?.isPagination[0]?.isPaginationState : "");
            return {
                queryString: theQuery,
                arrData: paginator.paginate(query),
            };
        } else {
            return {
                queryString: theQuery,
                arrData: query.rows,
            };
        }
    } catch (error: any) {
        console.log(error);
        throw Error(error.message);
    }
};

export const generateInsertQuery = async (data, tableName) => {
    try {
        const fields = Object.keys(data);
        const values = Object.values(data).map((value) => (typeof value === "string" ? `'${value}'` : value));

        const fieldList = fields.join(", ");
        const valueList = values.join(", ");

        const theQuery = `INSERT INTO ${tableName} (${fieldList}) VALUES (${valueList}) returning *`;

        const query = await con.query(theQuery);
        return query.rows;
    } catch (error: any) {
        console.log(error);
        throw Error(error.message);
    }
};
