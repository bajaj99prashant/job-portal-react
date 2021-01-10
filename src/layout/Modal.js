import React from "react";
import "../css/modal.css";

function Modal(props) {
  return (
    <div
      className="modale"
      style={{
        transform:
          props.show === true ? "translateY(-50%)" : "translateY(-100%)",
        opacity: props.show === true ? 1 : 0,
      }}
    >
      {props.children}
    </div>
  );
}

export default Modal;
