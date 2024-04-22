import con from "../../config/db";
import * as helper from "../../helper";

export const getServiceWiseUserManual = async () => {
    try {
        const query = `
        SELECT
            s.ID,
            s.service_id,
            s.service_name,
            s.is_active,
            dm.directoarte_name,
            spm.ID as "spmId",
            spm.page_details,
            spm.pdf_filename
        FROM
            eodb_service_master AS s
            LEFT JOIN eodb_directoarte_master AS dm ON dm.directoarte_id = s.directorate_id
            LEFT JOIN eodb_static_page_pdf_manage AS spm ON spm.service_id = s.service_id 
        WHERE
            spm.doc_category = 'USERMANUAL' 
            AND spm.is_active = 1 
        ORDER BY
            s.is_active DESC,
            dm.directoarte_name ASC,
            s.service_name ASC`;

        const runQuery = await con.query(query);
        if (runQuery.rows.length === 0) throw Error("No data found.");
        return runQuery.rows;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const serviceWiseUserManualPdfData: Model = async ({ spmID }) => {
    try {
        const query = `select * from eodb_static_page_pdf_manage where id = ${spmID}`;
        const runQuery = await con.query(query);
        if (runQuery.rows.length === 0) throw Error("No data found.");
        return runQuery.rows;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const listEServiceData = async () => {
    try {
        const query = `
    SELECT 
      b.department_name,
      a.service_name,
      a.published	
    FROM
      eodb_service_master
      AS A LEFT JOIN eodb_department_master AS b ON b.ID = b.dept_id 
    WHERE
      A.is_active = 1`;
        const runQuery = await con.query(query);
        if (runQuery.rows.length === 0) throw Error("No data found.");
        return runQuery.rows;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const getTotalServiceCount: Model = async ({ propsArray }) => {
    try {
        const data = await helper.buildSelectQuery(propsArray, "eodb_common_application_master");
        return data.arrData;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const getTotalUnitCount: Model = async ({ propsArray }) => {
    try {
        const data = await helper.buildSelectQuery(propsArray, "eodb_establishment_master");
        return data.arrData;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const getEstServiceInfo: Model = async ({ propsArray }) => {
    try {
        const data = await helper.buildSelectQuery(propsArray, "eodb_common_application_master");
        return data.arrData;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const getEstServiceCount: Model = async ({ propsArray }) => {
    try {
        const data = await helper.buildSelectQuery(propsArray, "eodb_common_application_master");
        return data.arrData;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const estServiceInfoByCafId: Model = async ({ propsArray }) => {
    try {
        const data = await helper.buildSelectQuery(propsArray, "eodb_common_application_master");
        return data.arrData;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const getStatusPercentage: Model = async ({ propsArray }) => {
    try {
        const data = await helper.buildSelectQuery(propsArray, "eodb_status_master");
        return data.arrData;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const estServiceStatusList: Model = async ({ propsArray }) => {
    try {
        const data = await helper.buildSelectQuery(propsArray, "eodb_status_master");
        return data.arrData;
    } catch (error: any) {
        throw Error(error.message);
    }
};
