import React, { useEffect, useRef, useState } from "react";

const AsyncSelect = ({
  loadOptions,
  onItemSubmit,
  value,
  onChange,
  className,
  placeholder = "",
  allowUserInput = false,

  ...rest
}) => {
  const [localValue, setLocalValue] = useState("");
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const inputRef = useRef();
  const valueRef = useRef();
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    if (value) pincodeFetcher(value);
    setLocalValue(value);
  }, [value]);
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (valueRef.current && valueRef.current.contains(e.target)) {
        // let s = list?.find((item) => item.key === localValue);
        // if (s) {
        //     setLocalValue(s.key);
        //     onChange && onChange(s.key);
        // }
      } else if (inputRef.current && !inputRef.current.contains(e.target)) {
        if (localValue === "") onChange("");
        setOpen(false);
      }
    };
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, [open, localValue, list]);

  const pincodeFetcher = async (pin) => {
    if (pin.length < 4) {
      return;
    }
    const data = await loadOptions(pin);
    setList(data);
  };

  const handleOnChange = async (_value) => {
    setLocalValue(_value);
    if (allowUserInput) {
      onChange(_value.toUpperCase());
    }
    pincodeFetcher(_value);
  };

  const handleOnItemClick = (_selectedKey, _selectedVal) => {
    setOpen(false);
    let s = list?.find((item) => item.key === _selectedKey);
    let a = s?.setValue || localValue;
    setLocalValue(a);
    setSelected(_selectedVal);
    onItemSubmit && onItemSubmit(s);
    onChange && onChange(_selectedVal);
  };

  return (
    <>
      <div className={`async-select ${className}`}>
        <input
          onClick={() => {
            setOpen(true);
          }}
          ref={valueRef}
          className={"form-control " + className}
          value={value}
          style={{ caretColor: "transparent" }}
          placeholder={placeholder}
          readOnly
        />

        {open && (
          <ul className="async-select-items-wrapper">
            <input
              ref={inputRef}
              autoComplete="off"
              type="text"
              id="123"
              className={"form-control " + className}
              onChange={(e) => handleOnChange(e.currentTarget.value)}
              value={localValue}
              {...rest}
              autoFocus
              placeholder="enter pin or postoffice name"
              style={{ position: "relative", right: "2rem", width: "21.3rem" }}
            />
            <div>
              {localValue ? (
                list.length ? (
                  list.map((item, index) => (
                    <li
                      key={item.key}
                      onClick={() => handleOnItemClick(item.key, item.setValue)}
                      className={`async-select-items ${selected === item.setValue ? " active " : ""}`}
                    >
                      {item.value}
                    </li>
                  ))
                ) : (
                  <li className="async-select-items disabled">No Options</li>
                )
              ) : (
                ""
                // <p className="text-muted lh-1  text-break text-nowrap mt-1" style={{ position: "relative", right: "2rem" }}>
                //   to search enter pin or postoffice name
                // </p>
              )}
            </div>
          </ul>
        )}
      </div>
    </>
  );
};

export default AsyncSelect;
