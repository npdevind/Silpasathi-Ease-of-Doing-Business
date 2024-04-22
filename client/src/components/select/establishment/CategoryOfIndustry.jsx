import React from "react";

const CategoryOfIndustry = ({ ...rest }) => {
  return (
    <>
      <select {...rest}>
        <option value="" disabled>
          Select Category Of Industry
        </option>
        {[
          { item: "Micro", val: "micro" },
          { item: "Small", val: "small" },
          { item: "Medium", val: "medium" },
          { item: "Large", val: "large" },
        ].map((ele, index) => (
          <option value={ele.val} key={index}>
            {ele.item}
          </option>
        ))}
      </select>
    </>
  );
};

export default CategoryOfIndustry;
