import con from "../../config/db";
import bcrypt from "bcryptjs";
import { timestamp } from "../../utils";

export const userDetails: Model = async ({ username }) => {
    try {
        const userDataQuery = `
        SELECT 
            A.uid,
            A.name AS username,
            A.pass,
            ur.rid,
            r.NAME AS role,
            b.fname,
            b.mname,
            b.lname,
            b.mobile,
            b.email,
            A.access 
        FROM
            users AS A 
            LEFT JOIN eodb_users_details AS b ON b.uid = A.uid
            LEFT JOIN users_roles AS ur ON ur.uid = A.uid
            LEFT JOIN ROLE AS r ON r.rid = ur.rid 
        WHERE
            A.NAME = '${username}'`;

        const runUserDataQuery = await con.query(userDataQuery);
        if (runUserDataQuery.rows.length === 0) throw Error("Invalid username.");
        return runUserDataQuery.rows[0];
    } catch (error: any) {
        throw Error(error.message);
    }
};

export const updateUserPassword: Model = async ({ body, userIp }) => {
    try {
        // Hash the new password
        const hashPassword = bcrypt.hashSync(body.password, 10);
        const getOldPass = await con.query(`SELECT password FROM eodb_user_pass_log WHERE uid = $1 ORDER BY created_on DESC LIMIT 3`, [body.uId]);

        // Get the raw password entered by the user
        const rawPassword = body.password;

        if (getOldPass.rows.length > 0) {
            // Loop through the stored hashed passwords and compare them with the raw password
            for (const oldPassword of getOldPass.rows) {
                if (bcrypt.compareSync(rawPassword, oldPassword.password)) {
                    throw new Error("You cannot use any of your last three passwords.");
                }
            }
        }

        const time = await timestamp();

        await con.query(`BEGIN`);

        // Update the user's password in the users table
        const updatePasswordQuery = `UPDATE users SET pass = $1, access = $2 WHERE uid = $3`;
        await con.query(updatePasswordQuery, [hashPassword, time, body.uId]);

        // Update the user's last used password in the eodb_users_details table
        const savePassword = `UPDATE eodb_users_details SET ld_pass = $1 WHERE uid = $2`;
        await con.query(savePassword, [body.password, body.uId]);

        const insertPasswordLog = `INSERT INTO eodb_user_pass_log (uid, password, ip_address, created_on)
        VALUES ($1, $2, $3, $4);`;
        await con.query(insertPasswordLog, [body.uId, hashPassword, userIp, time]);
        await con.query(`COMMIT`);
        return true;
    } catch (error: any) {
        await con.query(`ROLLBACK`);
        throw Error(error.message);
    }
};
