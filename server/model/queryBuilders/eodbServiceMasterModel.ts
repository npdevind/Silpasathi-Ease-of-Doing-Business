import * as helper from "./../../helper/index";

export const getDetails: Model = async ({ propsArray }) => {
    try {
        const data = await helper.buildSelectQuery(propsArray, "eodb_service_master");
        return data.arrData;
    } catch (error: any) {
        throw Error(error.message);
    }
};
