import request from "request";
import * as crypto from "crypto";
import moment from "moment";
import Paginator from "./paginator";
const algorithm = "aes-256-cbc";
const key = "fca5b46888534a2abf05d1f1877334e1383e95d3c4e31c993053ac55080fd092";
const iv = "629edbcc19a5e0a6caa24aa646ed14d5";

export const sendSMS: BulkSms = async (message, type, recipients) => {
    try {
        let feedId: any = "";
        if (type === "OTP") feedId = 386799;
        else if (type === "SMS") feedId = 386800;

        const username = process.env.SMS_USERNAME;
        const password = process.env.SMS_PASSWORD;
        // const sender = process.env.SMS_SENDER_NAME;

        const urlString = "https://bulkpush.mytoday.com/BulkSms/SingleMsgApi?";
        const fieldQuery = `feedid=${feedId}&username=${username}&password=${password}&To=${recipients}&Text=${message}`;

        const url = urlString + fieldQuery;

        const sendSms = await request(url);

        if (sendSms) return true;
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const encrypt = (text: string) => {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString("hex");
};

export const decrypt = (encrypted: string) => {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
    let decrypted = decipher.update(Buffer.from(encrypted, "hex"));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};

export const timestamp = () => {
    // Create a moment object representing the current date and time
    const now = moment();
    // Convert the moment object to a Unix timestamp (milliseconds since the Unix epoch)
    const timestamp = now.valueOf();

    return timestamp;
};

// Construct the WHERE clause dynamically based on the presence of conditions
// export const whereClause = (statement: any) => {
//     try {
//         if (!statement) throw Error("Invalid where statement found in your query string.");
//         let whereClause = "";
//         if (statement.length > 0) {
//             whereClause = `WHERE ${statement
//                 .map((condition) => {
//                     // Split condition by comma and join with "and" if necessary
//                     const conditions = condition.split(",").map((c) => c.trim());
//                     return conditions.join(" and ");
//                 })
//                 .join(" and ")}`;
//         }
//         return whereClause;
//     } catch (error: any) {
//         throw Error(error.message);
//     }
// };
export const whereClause = (statement: any[]) => {
    try {
        // if (!statement || statement.length === 0) throw Error("Invalid where statement array provided.");
        if (!statement || statement.length === 0) return "";

        let whereClause = statement[0].item ? "WHERE " : "";

        // Iterate through each item in statement
        statement.forEach((joinItem, index) => {
            // Extract the item's condition
            const condition = joinItem.item;

            // Add 'and' between conditions if not the first condition
            if (index !== 0) {
                whereClause += " and ";
            }

            // Append the condition to the whereClause
            whereClause += condition;
        });

        return whereClause;
    } catch (error: any) {
        throw Error(error.message);
    }
};

// Construct the ORDER BY clause if orderBy is provided
export const orderByClause = (statement: any) => {
    try {
        let newStatement: any = statement ? `ORDER BY ` : "";
        if (statement && statement.length > 0)
            statement.map((item, index) => {
                newStatement += `${item.item} ${item.order} `;
                if (index < statement.length - 1) {
                    newStatement += ", ";
                }
            });
        return newStatement;
    } catch (error: any) {
        throw Error(error.message);
    }
};

// Construct the limit clause if limit is provided
export const limitClause = (statement: any, isPagination: any = "") => {
    try {
        if (isPagination.status) {
            const paginator = new Paginator(isPagination.isPaginationState);
            return `LIMIT ${paginator.limit} OFFSET ${paginator.offset}`;
        } else {
            return statement ? `LIMIT ${statement}` : "";
        }
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const selectFieldsClause = (arrayData) => {
    `${arrayData[0].JoinTables ? arrayData[0].JoinTables[0].joinFields : !arrayData[0].isPagination[0].status ? arrayData[0].fields : arrayData[0].fields + `, COUNT ( * ) OVER ( ) AS total_records`}`;

    if (arrayData[0].JoinTables && !arrayData[0].isPagination[0].status) {
        return arrayData[0].JoinTables[0].joinFields;
    } else if (arrayData[0].JoinTables && arrayData[0].isPagination[0].status) {
        return arrayData[0].JoinTables[0].joinFields + " , COUNT ( * ) OVER ( ) AS total_records";
    } else if (!arrayData[0].JoinTables && !arrayData[0].isPagination[0].status) {
        return arrayData[0].fields;
    } else if (!arrayData[0].JoinTables && arrayData[0].isPagination[0].status) {
        return arrayData[0].fields + " , COUNT ( * ) OVER ( ) AS total_records";
    }
};

export const buildOwnerShipTree = (nodes, parentId = null) => {
    const tree: any = [];
    nodes
        .filter((node) => node.parent_id === parentId)
        .forEach((node) => {
            const newNode: any = {
                value: node.id,
                label: node.ownership_name,
                children: buildOwnerShipTree(nodes, node.id),
            };
            tree.push(newNode);
        });
    return tree;
};
