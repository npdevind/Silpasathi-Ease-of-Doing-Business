import * as eodbServiceMasterModel from "../../model/queryBuilders/eodbServiceMasterModel";
import * as eodbCommonAppMstModel from "../../model/queryBuilders/eodbCommonApplicationMasterModel";
import moment from "moment";

export const getServiceNameSuggestion: Controller = async (req, res) => {
    try {
        const getDetailsArrayProps = [
            {
                fields: "service_name",
                whereAddOn: [],
                isPagination: [{ status: false }],
            },
        ];
        let getData = await eodbServiceMasterModel.getDetails({ propsArray: getDetailsArrayProps });
        getData = getData.map((item) => item.service_name);
        res.json(getData);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const createNewCaf: Controller = async (req, res) => {
    try {
        /** get the service wise department id */
        const propsForGetDept = [
            {
                fields: "id, dept_id",
                whereAddOn: [{ item: `id in (${req.body.serviceId})` }],
                isPagination: [{ status: false }],
            },
        ];
        const serviceWiseDepartmentIds = await eodbServiceMasterModel.getDetails({ propsArray: propsForGetDept });

        /** get the last caf no  and creating a new caf no */
        const propsForGetLastCaf = [
            {
                fields: "caf_id_no ,caf_id",
                whereAddOn: [{ item: `caf_id_no IS NOT NULL ` }],
                orderBy: [{ item: "created_date", order: "DESC" }],
                isPagination: [{ status: false }],
                limit: 1,
            },
        ];
        const lastCafNo = await eodbCommonAppMstModel.getDetails({ propsArray: propsForGetLastCaf });

        const currentYear = moment().format("YYYY");

        const getYearFromLastCafNo = lastCafNo[0].caf_id_no.substring(3, 7);

        let newCafNo: any = "";
        let newCafId: any = "";

        if (parseInt(getYearFromLastCafNo) === parseInt(currentYear)) {
            const lastSixDigits = lastCafNo[0].caf_id_no.substring(lastCafNo[0].caf_id_no.length - 6);
            const incrementedNumber = parseInt(lastSixDigits) + 1;
            newCafId = incrementedNumber;
            newCafNo = "CAF" + getYearFromLastCafNo + incrementedNumber.toString().padStart(6, "0");
        } else {
            newCafId = "000001";
            newCafNo = "CAF" + currentYear + "000001";
        }

        /**Check my new caf no is already present in table */
        const propsForCheckCafExiting = [
            {
                fields: "count(1)",
                whereAddOn: [{ item: `caf_id_no = '${newCafNo}'` }],
                isPagination: [{ status: false }],
            },
        ];
        const checkCafExiting = await eodbCommonAppMstModel.getDetails({ propsArray: propsForCheckCafExiting });

        if (checkCafExiting[0].count != 0) throw Error("Something wrong! Please try again sometime later");

        // const insertCommonCafData = return new Promise(serviceWiseDepartmentIds.map(async (item) => {
        //     const insertArrayProps = {
        //         est_id: parseInt(req.body.unitId),
        //         service_id: parseInt(item.id),
        //         dept_code: parseInt(item.dept_id),
        //         caf_id_no: newCafNo,
        //         caf_id: parseInt(newCafId),
        //         uid: req.user?.uid,
        //     };
        //     const insertData = await eodbCommonAppMstModel.insertDetails({ propsArray: insertArrayProps });
        //     if (insertData) insertedIDs.push(insertData.eodb_app_id);
        //     return insertedIDs;
        // }));

        // eslint-disable-next-line no-async-promise-executor
        new Promise(async (resolve, reject) => {
            try {
                const insertedIDs: any = [];
                await Promise.all(
                    serviceWiseDepartmentIds.map(async (item) => {
                        const insertArrayProps = {
                            est_id: parseInt(req.body.unitId),
                            service_id: parseInt(item.id),
                            dept_code: parseInt(item.dept_id),
                            caf_id_no: newCafNo,
                            caf_id: parseInt(newCafId),
                            uid: req.user?.uid,
                        };
                        const insertData = await eodbCommonAppMstModel.insertDetails({ propsArray: insertArrayProps });
                        if (insertData) insertedIDs.push(insertData[0].eodb_app_id);
                    })
                );
                resolve(insertedIDs);
            } catch (error) {
                reject(error);
            }
        })
            .then((insertedIDs) => {
                res.json({
                    message: "CAF created successfully",
                    CafIds: insertedIDs,
                });
            })
            .catch((error) => {
                throw Error(error.message);
            });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
