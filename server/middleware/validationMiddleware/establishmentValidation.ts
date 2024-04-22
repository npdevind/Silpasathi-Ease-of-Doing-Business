export const insertEstablishment: Validator = async (req, res, next: any) => {
    try {
        const data = req.body;

        if (data.establishment_name === "") throw Error("Please enter unit name");
        if (/^[a-zA-Z ]+$/.test(data.establishment_name) === false) throw Error("Number or special character is not allowed in unit name.");
        if (data.category_industry === "") throw Error("Please select industry category.");
        if (data.female_ownership === "") throw Error("Please select owner of industry.");
        if (data.ownership_type === "" || data.ownership_type.length === 0) throw Error("Please select industry type.");
        if ((data.ownership_type.includes(7) || data.ownership_type.includes(19) || data.ownership_type.includes(15)) && data.other_ownership_name === "") throw Error("Please enter other ownership name.");
        if (data.district === "") throw Error("Please select district.");
        if (data.areaType === "") throw Error("Please select area type.");
        if (data.block === "")
            throw Error(
                `Please select ${
                    data.areaType.trim() === "C"
                        ? "Corporation"
                        : data.areaType.trim() === "B"
                        ? "Block"
                        : data.areaType.trim() === "M"
                        ? "Municipality"
                        : data.areaType.trim() === "N"
                        ? "Notified Area"
                        : data.areaType.trim() === "CB"
                        ? "Cantonment Area"
                        : "Area"
                }`
            );
        if (data.gpWard === "") throw Error("Please select Gp/Ward.");
        if (data.pinCode === "") throw Error("Please select pin code.");
        if (data.policeStation === "") throw Error("Please select police station.");

        next();
    } catch (error: any) {
        return res.status(422).json({ message: error.message });
    }
};
