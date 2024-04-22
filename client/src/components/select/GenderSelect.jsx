const GenderSelect = ({ ...rest }) => {
  return (
    <>
      <select {...rest}>
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

export default GenderSelect;
