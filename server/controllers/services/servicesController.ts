import * as eodbServiceMasterModel from "../../model/queryBuilders/eodbServiceMasterModel";

export const getServiceNameSuggestion: Controller = async (req, res) => {
    try {
        const getDetailsArrayProps = [
            {
                fields: "service_name",
                whereAddOn: [],
                isPagination: [{ status: false }],
            },
        ];
        let getData = await eodbServiceMasterModel.getServiceList({ propsArray: getDetailsArrayProps });
        getData = getData.map((item) => item.service_name);
        res.json(getData);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
