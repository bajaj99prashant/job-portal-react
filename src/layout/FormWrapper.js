import React from "react";
import "../css/formWrapper.css";

function FormWrapper({ children }) {
  return (
    <div className="external-wrapper">
      <div className="form-wrapper">{children}</div>
    </div>
  );
}

export default FormWrapper;
