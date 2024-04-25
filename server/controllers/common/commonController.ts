import * as commonModel from "../../model/common/commonModel";
import * as eodbJurisdictionModel from "../../model/queryBuilders/eodbJurisdictionModel";
import * as eodbServiceMasterModel from "../../model/queryBuilders/eodbServiceMasterModel";

export const getServiceWiseUserManual: Controller = async (req, res) => {
    try {
        const data = await commonModel.getServiceWiseUserManual();
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const serviceWiseUserManualPdfData: Controller = async (req, res) => {
    try {
        const data = await commonModel.serviceWiseUserManualPdfData({
            spmID: req.query.spmID,
        });
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const listEServiceData: Controller = async (req, res) => {
    try {
        const data = await commonModel.listEServiceData();
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getDistrictList: Controller = async (req, res) => {
    try {
        const getDetailsArrayProps = [
            {
                fields: `id, district_code, district_name`,
                whereAddOn: [{ item: `state_id = 19` }, { item: `is_active= '1'` }],
                orderBy: [{ item: "district_name", order: "ASC" }],
                isPagination: [{ status: false, isPaginationState: "" }],
            },
        ];
        const data = await eodbJurisdictionModel.getDistrictList({ propsArray: getDetailsArrayProps });
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAreaTypeList: Controller = async (req, res) => {
    try {
        const getDetailsArrayProps = [
            {
                fields: `category`,
                whereAddOn: [{ item: `district_code = ${req.query.districtCode}` }],
                isPagination: [{ status: false, isPaginationState: "" }],
                groupBy: `category`,
            },
        ];
        const data = await eodbJurisdictionModel.getAreaTypeList({ propsArray: getDetailsArrayProps });
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getBlockList: Controller = async (req, res) => {
    try {
        const getDetailsArrayProps = [
            {
                fields: `bmc_name, bmc_code`,
                whereAddOn: [{ item: `district_code = ${req.query.districtCode}` }, { item: `category= '${req.query.areaType}'` }, { item: `is_active= '1'` }],
                orderBy: [{ item: "bmc_name", order: "ASC" }],
                isPagination: [{ status: false, isPaginationState: "" }],
            },
        ];
        const data = await eodbJurisdictionModel.getBlockList({ propsArray: getDetailsArrayProps });
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getGpWardList: Controller = async (req, res) => {
    try {
        const getDetailsArrayProps = [
            {
                fields: `gp_ward_code, gp_ward_name`,
                whereAddOn: [{ item: `bmc_code = ${req.query.blockCode}` }, { item: `is_active= '1'` }],
                orderBy: [{ item: "order_by, gp_ward_name", order: "ASC" }],
                isPagination: [{ status: false, isPaginationState: "" }],
            },
        ];
        const data = await eodbJurisdictionModel.getGpWardList({ propsArray: getDetailsArrayProps });
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const pinCodeSuggestion: Controller = async (req, res) => {
    try {
        const queryPin: any = req.query.pinCode;
        let customWhereAddOn = "";
        if (/^\d+$/.test(queryPin)) customWhereAddOn = `pincode::text like '${queryPin}%'`;
        else if (typeof queryPin === "string") customWhereAddOn = `po_name like '${queryPin}%'`;
        else customWhereAddOn;

        const getDetailsArrayProps = [
            {
                fields: `id, pincode as value, po_name, concat (district_name, ', ', state_name ) AS district_state `,
                whereAddOn: [{ item: `${customWhereAddOn}` }, { item: `state_code = 19` }],
                isPagination: [{ status: false, isPaginationState: "" }],
            },
        ];
        const data = await eodbJurisdictionModel.pinCodeSuggestion({ propsArray: getDetailsArrayProps });

        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getPoliceStationList: Controller = async (req, res) => {
    try {
        const getDetailsArrayProps = [
            {
                fields: `id, name_of_police_station, police_station_code `,
                whereAddOn: [{ item: `dristrict_code = ${req.query.districtCode}` }, { item: `is_active = 'Y'` }],
                orderBy: [{ item: "name_of_police_station", order: "ASC" }],
                isPagination: [{ status: false, isPaginationState: "" }],
            },
        ];
        const data = await eodbJurisdictionModel.getPoliceStationList({ propsArray: getDetailsArrayProps });

        console.log(req.query.districtCode);

        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getServiceList: Controller = async (req, res) => {
    try {
        const deptId = req.query.departmentCode;
        const listing = req.query.listing;
        const service_name = req.query.service_name;

        const whereArray: any = [];
        if (service_name) {
            whereArray.push({
                item: `UPPER(service_name) like  '%' || UPPER('${service_name}') || '%'`,
            });
        }
        if (deptId) {
            whereArray.push({
                item: `dept_id = '${req.query.departmentCode}'`,
            });
        }

        const getDetailsArrayProps = [
            {
                fields: `service_id, service_name`,
                whereAddOn: whereArray.length > 0 ? whereArray : [],
                orderBy: [{ item: "service_name", order: "ASC" }],
                isPagination: [{ status: listing === "true" ? true : false, isPaginationState: req.query }],
            },
        ];
        const data = await eodbServiceMasterModel.getDetails({ propsArray: getDetailsArrayProps });
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
