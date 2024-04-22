import * as helper from "../../helper";

export const getDistrictList: Model = async ({ propsArray }) => {
    try {
        const data = await helper.buildSelectQuery(propsArray, "lgd_district_master");
        return data.arrData;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const getAreaTypeList: Model = async ({ propsArray }) => {
    try {
        const data = await helper.buildSelectQuery(propsArray, "lgd_bmc_master");
        return data.arrData;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const getBlockList: Model = async ({ propsArray }) => {
    try {
        const data = await helper.buildSelectQuery(propsArray, "lgd_bmc_master");
        return data.arrData;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const getGpWardList: Model = async ({ propsArray }) => {
    try {
        const data = await helper.buildSelectQuery(propsArray, "lgd_gp_ward_master");
        return data.arrData;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const pinCodeSuggestion: Model = async ({ propsArray }) => {
    try {
        const data = await helper.buildSelectQuery(propsArray, "lgd_pin_po_master");
        return data;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const getPoliceStationList: Model = async ({ propsArray }) => {
    try {
        const data = await helper.buildSelectQuery(propsArray, "lgd_police_station");
        return data;
    } catch (error: any) {
        throw Error(error.message);
    }
};
