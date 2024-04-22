import con from "../../config/db";
import { limitClause, orderByClause, whereClause } from "../../utils";

/**
 * Select statement for user details table
 */
export const getEodbUserDetails: Model = async ({ selectProps }) => {
    try {
        const whereAddOn = await whereClause(selectProps[0].whereAddOn);
        const orderBy = await orderByClause(selectProps[0].orderBy ? selectProps[0].orderBy : "");
        // Construct the final query
        const theQuery = `
            SELECT 
                ${selectProps[0].fields}
            FROM
                "eodb_users_details"
            ${whereAddOn}
            ${orderBy}`;

        const query = await con.query(theQuery);
        if (query.rowCount === 0) throw Error("Your details is not found.");
        return query.rows[0];
    } catch (error: any) {
        throw Error(error.message);
    }
};

/**
 * Update statement for user details table
 */
export const updateEodbUserDetails: Model = async ({ selectProps }) => {
    try {
        const whereAddOn = await whereClause(selectProps[0].whereAddOn);
        const theQuery = `update eodb_users_details set ${selectProps[0].fields} ${whereAddOn}`;
        await con.query(theQuery);
        return true;
    } catch (error: any) {
        throw Error(error.message);
    }
};

/**
 * Select statement for user table
 */
export const getEodbUser: Model = async ({ selectProps }) => {
    try {
        const whereAddOn = await whereClause(selectProps[0].whereAddOn);
        const orderBy = await orderByClause(selectProps[0].orderBy ? selectProps[0].orderBy : "");
        // Construct the final query
        const theQuery = `
            SELECT 
                ${selectProps[0].fields}
            FROM
                "users"
            ${whereAddOn}
            ${orderBy}`;

        const query = await con.query(theQuery);
        return query.rows[0];
    } catch (error: any) {
        throw Error(error.message);
    }
};

/**
 * Update statement for user table
 */
export const updateEodbUser: Model = async ({ selectProps }) => {
    try {
        const whereAddOn = await whereClause(selectProps[0].whereAddOn);
        const theQuery = `update users set ${selectProps[0].fields} ${whereAddOn}`;

        await con.query(theQuery);
        return true;
    } catch (error: any) {
        throw Error(error.message);
    }
};

/**
 * Select statement for user password log table
 */

export const getUserPasswordLog: Model = async ({ selectProps }) => {
    try {
        const whereAddOn = await whereClause(selectProps[0].whereAddOn);
        const orderBy = await orderByClause(selectProps[0].orderBy ? selectProps[0].orderBy : "");
        const limit = await limitClause(selectProps[0].limit ? selectProps[0].limit : "");
        const theQuery = `
        SELECT 
            ${selectProps[0].fields}
        FROM
            "eodb_user_pass_log"
        ${whereAddOn}
        ${orderBy}
        ${limit}`;

        const query = await con.query(theQuery);
        return query.rows;
    } catch (error: any) {
        throw Error(error.message);
    }
};

/**
 * Update statement for user password log table
 */
export const updateEodbUserPasswordLog: Model = async ({ selectProps }) => {
    try {
        const whereAddOn = await whereClause(selectProps[0].whereAddOn);
        const theQuery = `update eodb_user_pass_log set ${selectProps[0].fields} ${whereAddOn}`;

        await con.query(theQuery);
        return true;
    } catch (error: any) {
        throw Error(error.message);
    }
};
