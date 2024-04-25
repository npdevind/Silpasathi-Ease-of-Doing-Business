import * as eodbDepartmentMasterModel from "../../model/queryBuilders/eodbDepartmentMasterModel";
import * as eodbUserAllModel from "../../model/queryBuilders/eodbUserAllModel";
import * as eodbCommonModel from "../../model/common/commonModel";
import con from "../../config/db";
import { timestamp } from "../../utils";
import bcrypt from "bcryptjs";
import ip from "ip";

export const adminDynamicNavBar: Controller = async (req, res) => {
    try {
        res.json({
            menuArray: [
                {
                    label: "Dashboard",
                    link: "/dashboard",
                    icon: "bi bi-speedometer2",
                    access: ["*"],
                },
                {
                    label: "Summary Report",
                    link: "",
                    icon: "bi bi-card-list",
                    access: ["maptrackuser"],
                    links: [
                        { label: "Service Wise", link: "/summary-report", icon: "bi bi-bar-chart", access: ["maptrackuser"] },
                        { label: "District Wise", link: "", icon: "bi bi-geo-alt", access: ["maptrackuser"] },
                    ],
                },
                {
                    label: "Shilper Samadhane",
                    link: "Shilper-Samadhane",
                    icon: "bi bi-card-list",
                    access: ["maptrackuser"],
                    links: [
                        { label: "Summary Report", link: "Summary-Report", icon: "bi bi-bar-chart", access: ["maptrackuser"] },
                        { label: "Service Wise List", link: "", icon: "bi bi-geo-alt", access: ["maptrackuser"] },
                    ],
                },
                {
                    label: "All Units",
                    link: "/unit",
                    icon: "bi bi-building",
                    access: ["investor"],
                },
                {
                    label: "All Services",
                    link: "/all-services",
                    icon: "bi bi-tools",
                    access: ["investor"],
                },
            ],
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getEodbDepartmentList: Controller = async (req, res) => {
    try {
        const getDetailsArrayProps = [
            {
                fields: "dept_id,department_name",
                whereAddOn: [{ item: `is_active = 1` }],
                orderBy: [{ item: "department_name", order: "ASC" }],
                isPagination: [{ status: false }],
            },
        ];
        const data = await eodbDepartmentMasterModel.getDetails({ propsArray: getDetailsArrayProps });
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getEodbUserDetails: Controller = async (req, res) => {
    try {
        const selectProps = [
            {
                fields: `salutation, fname as "fName", mname as "mName", lname as "lName", mobile, email, gender, is_consultant, trim(consultant_name) consultant_name`,
                whereAddOn: [{ item: `uid = ${req.user?.uid}` }],
            },
        ];
        const data = await eodbUserAllModel.getEodbUserDetails({ selectProps: selectProps });
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateUserProfile: Controller = async (req, res) => {
    try {
        const body = req.body;
        const userDetailsUpdateProps = [
            {
                fields: `
                    salutation = '${body.salutation}',
                    fname = '${body.fName}', 
                    mname = '${body.mName}', 
                    lname='${body.lName}', 
                    mobile = '${body.mobile}', 
                    email = '${body.email}', 
                    gender = '${body.gender}', 
                    is_consultant = '${body.is_consultant}', 
                    consultant_name = '${body.consultant_name}'`,
                whereAddOn: [{ item: `uid = ${req.user?.uid}` }],
            },
        ];
        const userUpdateProps = [
            {
                fields: `
                    mail = '${body.email}', 
                    changed = ${await timestamp()}`,
                whereAddOn: [{ item: `uid = ${req.user?.uid}` }],
            },
        ];
        await con.query(`BEGIN`);
        await eodbUserAllModel.updateEodbUserDetails({ selectProps: userDetailsUpdateProps });
        await eodbUserAllModel.updateEodbUser({ selectProps: userUpdateProps });
        await con.query(`COMMIT`);
        res.json({
            message: "Profile successfully updated",
        });
    } catch (error: any) {
        await con.query(`ROLLBACK`);
        res.status(400).json({ message: error.message });
    }
};

export const checkUserOldPass: Controller = async (req, res) => {
    try {
        const userSelectProps = [
            {
                fields: "pass",
                whereAddOn: [{ item: `uid = ${req.user?.uid}` }],
            },
        ];
        const queryPass: any = req.query.pass;

        const userOldPass = await eodbUserAllModel.getEodbUser({ selectProps: userSelectProps });

        if (!bcrypt.compareSync(queryPass, userOldPass.pass)) throw Error("Password incorrect");
        res.json({
            message: "Password Verified",
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const changeUserPassword: Controller = async (req, res) => {
    try {
        //check last three passwords
        const userPasswordLogProps = [
            {
                fields: `password`,
                whereAddOn: [{ item: `uid = ${req.user?.uid}` }],
                orderBy: [{ item: "created_on", order: "DESC" }],
                limit: 3,
            },
        ];

        const getUserOldPass = await eodbUserAllModel.getUserPasswordLog({ selectProps: userPasswordLogProps });

        // Get the raw password entered by the user
        const rawPassword = req.body.password;

        if (getUserOldPass.length > 0) {
            // Loop through the stored hashed passwords and compare them with the raw password
            for (const oldPassword of getUserOldPass) {
                if (bcrypt.compareSync(rawPassword, oldPassword.password)) {
                    throw new Error("You cannot use any of your last three passwords.");
                }
            }
        }

        //update password in users and user details table
        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        const userUpdateProps = [
            {
                fields: `pass = '${hashPassword}'`,
                whereAddOn: [{ item: `uid = ${req.user?.uid}` }],
            },
        ];
        const userDetailsUpdateProps = [
            {
                fields: `ld_pass = '${req.body.password}'`,
                whereAddOn: [{ item: `uid = ${req.user?.uid}` }],
            },
        ];

        //insert new password log in user password log table
        const userPasswordLogUpdateProps = [
            {
                fields: `password = '${hashPassword}', ip_address = '${ip.address()}'`,
                whereAddOn: [{ item: `uid = ${req.user?.uid}` }],
            },
        ];

        await con.query(`BEGIN`);
        await eodbUserAllModel.updateEodbUser({ selectProps: userUpdateProps });
        await eodbUserAllModel.updateEodbUserDetails({ selectProps: userDetailsUpdateProps });
        await eodbUserAllModel.updateEodbUserPasswordLog({ selectProps: userPasswordLogUpdateProps });
        await con.query(`COMMIT`);
        res.json({
            message: "Password successfully updated.",
        });
    } catch (error: any) {
        await con.query(`ROLLBACK`);
        res.status(400).json({ message: error.message });
    }
};

export const getTotalServiceCount: Controller = async (req, res) => {
    try {
        const getDetailsArrayProps = [
            {
                fields: `count(*) as "serviceCount"`,
                whereAddOn: [{ item: `uid = ${req.user?.uid}` }, { item: `is_active = 1` }],
                isPagination: [{ status: false }],
            },
        ];
        const data = await eodbCommonModel.getTotalServiceCount({ propsArray: getDetailsArrayProps });

        res.json(data[0]);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getTotalUnitCount: Controller = async (req, res) => {
    try {
        const getDetailsArrayProps = [
            {
                fields: `count(*) as "unitCount"`,
                whereAddOn: [{ item: `uid = ${req.user?.uid}` }, { item: `is_active = 1` }],
                isPagination: [{ status: false }],
            },
        ];
        const data = await eodbCommonModel.getTotalUnitCount({ propsArray: getDetailsArrayProps });

        res.json(data[0]);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getEstServiceInfo: Controller = async (req, res) => {
    try {
        const serviceType = req.query.serviceType;

        const getDetailsArrayProps = [
            {
                fields: ``,
                whereAddOn: [],
                isPagination: [{ status: true, isPaginationState: req.query ? req.query : "" }],
                JoinTables: [
                    {
                        status: true,
                        joinFields: `DISTINCT on (A.caf_id_no) A.service_id,A.eodb_app_id,A.est_id,A.caf_id_no,A.caf_id,A.legacy_application_id,A.redirect_url,A.app_submission_date,A.created_date,A.current_status,A.caf_status, sm.service_name, sm.service_type,dm.dept_id,dm.department_name`,
                        joinWhereAddOn: [
                            {
                                item: `A.uid = ${req.user?.uid}`,
                            },
                            { item: `A.is_active = 1` },
                            { item: serviceType === "onGoing" ? `A.caf_status not in (2,3)` : serviceType === "Approved" ? `A.caf_status = 2` : serviceType === "Rejected" ? `A.caf_status = 3` : `A.caf_status not in (2,3)` },
                        ],
                        joinOrderBy: [
                            { item: "A.caf_id_no", order: "DESC" },
                            { item: "A.eodb_app_id", order: "ASC" },
                        ],
                        tables: [
                            { name: `eodb_service_master as sm`, joinType: `left join`, joinOn: `on sm.id=A.service_id` },
                            { name: `eodb_department_master as dm`, joinType: `left join`, joinOn: `on dm.dept_id=sm.dept_id` },
                        ],
                    },
                ],
            },
        ];
        const data = await eodbCommonModel.getEstServiceInfo({ propsArray: getDetailsArrayProps });
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getEstServiceCount: Controller = async (req, res) => {
    try {
        const getDetailsArrayProps = [
            {
                fields: `COUNT ( CASE WHEN caf_status not in (2,3) THEN 1 ELSE NULL END ) total_pending,
                COUNT ( CASE WHEN caf_status = 2 THEN 1 ELSE NULL END ) total_approved,
                COUNT ( CASE WHEN caf_status = 3 THEN 1 ELSE NULL END ) total_rejected`,
                whereAddOn: [{ item: `uid = ${req.user?.uid}` }],
                isPagination: [{ status: false }],
            },
        ];
        const data = await eodbCommonModel.getEstServiceCount({ propsArray: getDetailsArrayProps });
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const estServiceInfoByCafId: Controller = async (req, res) => {
    try {
        const caf_id_no: any = req.query.cafId;
        //console.log(caf_id_no?.toString());
        //return;

        const getDetailsArrayProps = [
            {
                fields: ``,
                whereAddOn: [],
                isPagination: [{ status: false }],
                JoinTables: [
                    {
                        status: true,
                        joinFields: `A.current_status,A.caf_status,A.eodb_app_id,A.est_id,A.caf_id_no,A.caf_id,A.statuslevel,A.legacy_application_id,A.redirect_url,A.app_submission_date, A.created_date, sm.service_id,sm.service_name,sm.service_type,sm.rtps_timelines,dm.dept_id,dm.department_name,esm.status_title`,
                        joinWhereAddOn: [{ item: `A.uid = ${req.user?.uid}` }, { item: `A.is_active=1` }, { item: `A.caf_id_no = '${caf_id_no.toUpperCase()}'` }],
                        joinOrderBy: [
                            { item: "A.created_date", order: "DESC" },
                            { item: "A.eodb_app_id", order: "ASC" },
                        ],
                        tables: [
                            { name: `eodb_service_master as sm`, joinType: `left join`, joinOn: `on sm.id=A.service_id` },
                            { name: `eodb_department_master as dm`, joinType: `left join`, joinOn: `on dm.dept_id=sm.dept_id` },
                            { name: `eodb_status_master as esm`, joinType: `left join`, joinOn: `on esm.service_id = A.service_id and esm.status_code = A.current_status` },
                        ],
                    },
                ],
            },
        ];

        const data = await eodbCommonModel.estServiceInfoByCafId({ propsArray: getDetailsArrayProps });

        // Map over the data array and perform asynchronous operations
        const newData = await Promise.all(
            data.map(async (item, index) => {
                const getDetailsArrayPropsForStatus = [
                    {
                        fields: `status_title`,
                        whereAddOn: [{ item: `service_id = ${item.service_id}` }, { item: `is_active = 1` }],
                        isPagination: [{ status: false }],
                        orderBy: [{ item: "order_by", order: "ASC" }],
                    },
                ];

                try {
                    const statusData = await eodbCommonModel.getStatusPercentage({ propsArray: getDetailsArrayPropsForStatus });
                    const statusTitles = statusData.map((statusItem) => statusItem.status_title);

                    const itemStatusArray: any = [];
                    itemStatusArray.push(item.status_title);

                    // Split item.status_title and map over resulting array
                    const positions = itemStatusArray.map((word) => statusTitles.indexOf(word) + 1);

                    // Calculating the sum of positions
                    const sumOfPositions = positions.reduce((acc, curr) => acc + curr, 0);

                    // Calculating the percentage of completion based on the sum of positions
                    const statusPercentage = (sumOfPositions / statusTitles.length) * 100;

                    // Return updated item with statusPercentage
                    return { ...item, statusPercentage: Math.round(statusPercentage) };
                } catch (error) {
                    console.error("Error processing item:", error);
                    // Return original item with statusPercentage as undefined in case of error
                    return { ...item, statusPercentage: undefined };
                }
            })
        );

        // console.log(newData);

        res.json(newData);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const estServiceStatusList: Controller = async (req, res) => {
    try {
        const getDetailsArrayProps = [
            {
                fields: `status_title,redirect_url,status_code,redirect_url_text`,
                whereAddOn: [{ item: `is_active = 1` }, { item: `is_dashboard IN (1,2,3)` }, { item: `service_id =${req.query.serviceId}` }],
                isPagination: [{ status: false }],
                orderBy: [{ item: "order_by", order: "ASC" }],
            },
        ];
        const data = await eodbCommonModel.estServiceStatusList({ propsArray: getDetailsArrayProps });
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
