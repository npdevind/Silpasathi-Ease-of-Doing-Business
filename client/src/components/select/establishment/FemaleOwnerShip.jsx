import React from "react";

const FemaleOwnerShip = ({ ...rest }) => {
  return (
    <>
      <select {...rest}>
        <option value="" disabled>
          Select
        </option>
        {[
          { item: "Yes", val: "y" },
          { item: "No", val: "n" },
        ].map((ele, index) => (
          <option value={ele.val} key={index}>
            {ele.item}
          </option>
        ))}
      </select>
    </>
  );
};

export default FemaleOwnerShip;
