import React from "react";
import "../css/input.css";

const FormInput = ({
  children,
  name,
  type,
  placeholder,
  changeMe,
  value,
  error,
  classes,
}) => {
  return (
    <div className={`form-group ${classes}`}>
      <label htmlFor={name} className="mb-0">
        {children}
        <input
          className={`form-control-sm form-control bg-light ${
            error ? "border-danger" : null
          }`}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={changeMe}
        />
      </label>
      <p className="text-right text-danger mt-0 pt-0">{error}</p>
    </div>
  );
};

export default FormInput;
