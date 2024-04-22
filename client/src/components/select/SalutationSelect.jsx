import React from "react";

const SalutationSelect = ({ ...rest }) => {
  return (
    <>
      <select aria-label="Default select example" {...rest}>
        <option value="" disabled>
          Select One
        </option>
        {["Shri", "Smt", "Mr.", "Mrs.", "Ms.", "Janab", "Md.", "Dr.", "Mx", "Haji", "Sk.", "Mst"].map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
};

export default SalutationSelect;
