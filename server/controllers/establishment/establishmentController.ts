import * as ownerShipModel from "../../model/queryBuilders/eodbOwnerShipModel";
import * as eodbEstablishmentModel from "../../model/queryBuilders/eodbEstablishmentModel";
import { buildOwnerShipTree } from "../../utils";

export const getOwnerShipList: Controller = async (req, res) => {
    try {
        const getDetailsArrayProps = [
            {
                fields: "id, ownership_name, parent_id",
                whereAddOn: [],
                isPagination: [{ status: false }],
            },
        ];
        const getData = await ownerShipModel.getDetails({ propsArray: getDetailsArrayProps });
        res.json(await buildOwnerShipTree(getData));
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getEstablishmentList: Controller = async (req, res) => {
    try {
        const getDetailsArrayProps = [
            {
                fields: `est_id, est_name, to_char(created_date, 'dd-mm-yyyy') as created_date`,
                whereAddOn: [{ item: `uid = ${req.user?.uid}` }],
                orderBy: [{ item: "created_date", order: "DESC" }],
                isPagination: [{ status: true, isPaginationState: req.query ? req.query : "" }],
                JoinTables: [
                    {
                        status: true,
                        joinFields: `
                        A.est_id,
                        A.est_name,
                        to_char( A.created_date, 'dd-mm-yyyy' ) AS created_date,
                        A.industry_category,
                        A.est_district,
                        A.est_subdivision,
                        A.est_areatype,
                        A.est_block_mun_code,
                        A.est_gp_ward_code,
                        A.est_postoffice,
                        A.est_pincode,
                        A.est_policestation,
                        concat (A.address,', ',ds.district_name,', ',bm.bmc_name,', ',gm.gp_ward_name,', ',pom.po_name,', ',A.est_pincode) AS address,
                        B.ownership_name`,
                        joinWhereAddOn: [{ item: `A.uid = ${req.user?.uid}` }],
                        joinOrderBy: [{ item: "A.created_date", order: "DESC" }],
                        tables: [
                            { name: `eodb_ownership as B`, joinType: `left join`, joinOn: `on A.ownership_type::int = B.id` },
                            { name: `lgd_district_master as ds`, joinType: `left join`, joinOn: `on ds.district_code = A.est_district` },
                            // { name: `sub_division as sd`, joinType: `left join`, joinOn: `on sd.sub_div_code = A.est_subdivision` },
                            { name: `lgd_bmc_master as bm`, joinType: `left join`, joinOn: `on bm.bmc_code = A.est_block_mun_code` },
                            { name: `lgd_gp_ward_master as gm`, joinType: `left join`, joinOn: `on gm.gp_ward_code = A.est_gp_ward_code` },
                            { name: `lgd_pin_po_master as pom`, joinType: `left join`, joinOn: `on pom.id = A.est_postoffice` },
                        ],
                    },
                ],
            },
        ];
        const getData = await eodbEstablishmentModel.getDetails({ propsArray: getDetailsArrayProps });
        res.json(getData);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const addNewEstablishment: Controller = async (req, res) => {
    try {
        const insertArrayProps = {
            uid: req.user?.uid,
            est_name: req.body.establishment_name,
            industry_category: req.body.category_industry,
            gender_of_owner_industry: req.body.female_ownership,
            ownership_type: req.body.ownership_type[0],
            ownership_typesub: req.body.ownership_type[1] ? req.body.ownership_type[1] : "",
            ownership_typesub1: req.body.ownership_type[2] ? req.body.ownership_type[2] : "",
            ownership_typesub2: req.body.ownership_type[3] ? req.body.ownership_type[3] : "",
            ownership_otext: req.body.other_ownership_name,
            est_district: parseInt(req.body.district),
            est_areatype: req.body.areaType,
            est_block_mun_code: parseInt(req.body.block),
            est_gp_ward_code: parseInt(req.body.gpWard),
            est_pincode: parseInt(req.body.pinCode),
            est_postoffice: parseInt(req.body.postOfficeCode),
            est_policestation: req.body.policeStation,
        };
        const insertData = await eodbEstablishmentModel.insertDetails({ propsArray: insertArrayProps });
        if (insertData) {
            res.json({
                message: "Unit save successfully",
                data: insertData,
            });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
