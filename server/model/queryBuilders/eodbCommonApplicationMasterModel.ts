import con from "../../config/db";
import * as helper from "../../helper/index";

export const getDetails: Model = async ({ propsArray }) => {
    try {
        const data = await helper.buildSelectQuery(propsArray, "eodb_common_application_master");
        return data.arrData;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const insertDetails: Model = async ({ propsArray }) => {
    try {
        await con.query(`BEGIN`);
        const data = await helper.generateInsertQuery(propsArray, "eodb_common_application_master");
        await con.query(`COMMIT`);
        return data;
    } catch (error: any) {
        await con.query(`ROLLBACK`);
        throw Error(error.message);
    }
};
