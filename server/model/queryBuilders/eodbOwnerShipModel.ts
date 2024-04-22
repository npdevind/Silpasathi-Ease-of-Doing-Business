import * as helper from "../../helper";

export const getDetails: Model = async ({ propsArray }) => {
    try {
        const data = await helper.buildSelectQuery(propsArray, "eodb_ownership");
        return data.arrData;
    } catch (error: any) {
        throw Error(error.message);
    }
};
