import React, { useEffect, useState } from "react";

const GenderSelectBySalutation = ({ salutation = "", setGenderValFromSal, ...rest }) => {
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    let genderValue = "";
    if (["Shri", "Mr.", "Ms.", "Janab", "Md.", "Dr.", "Haji", "Sk."].includes(salutation)) {
      genderValue = "M";
    } else if (["Smt", "Mrs.", "Mst"].includes(salutation)) {
      genderValue = "F";
    } else if (["Mx"].includes(salutation)) {
      genderValue = "T";
    }

    setSelectedValue(genderValue);
    setGenderValFromSal(genderValue);
  }, [salutation, setGenderValFromSal]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedValue(value);
    setGenderValFromSal(value);
  };
  return (
    <>
      <select {...rest} value={selectedValue ? selectedValue : rest.value} onChange={handleChange}>
        <option value="" disabled>
          Select One
        </option>
        {[
          { item: "Male", val: "M" },
          { item: "Female", val: "F" },
          { item: "Transgender", val: "T" },
        ].map((ele, index) => (
          <option value={ele.val} key={index}>
            {ele.item}
          </option>
        ))}
      </select>
    </>
  );
};

export default GenderSelectBySalutation;
