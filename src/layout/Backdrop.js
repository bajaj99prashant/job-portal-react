import React from "react";
import "../css/backdrop.css";
import { useStateValue } from "../DataLayer";

const Backdrop = ({ show }) => {
  // eslint-disable-next-line
  const [{ showModal }, dispatch] = useStateValue();
  const handleBackdrop = () => {
    dispatch({
      type: "SHOW_MODAL",
    });
  };
  return show ? (
    <>
      {/* eslint-disable-next-line */}
      <div className="backdrop" onClick={() => handleBackdrop()}></div>
    </>
  ) : null;
};

export default Backdrop;
