import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import { useStateValue } from "../DataLayer";
import "../css/headerRight.css";

const HeaderRight = ({ person, purpose, link }) => {
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue();
  const [showLogout, setShowLogout] = useState(false);
  const handleLogout = () => {
    dispatch({
      type: "RESET_STATE",
    });
    navigate("/");
    setShowLogout(false);
  };
  return (
    <ul className="nav">
      <li className="nav-item mr-4">
        <Link to={link}>{purpose}</Link>
      </li>
      {/* eslint-disable-next-line */}
      <li
        className="nav-item logout-nav"
        onClick={() => setShowLogout(!showLogout)}
      >
        <span className="user-profile">
          {person === "R" ? (
            <img src="icons/R.svg" alt="R" />
          ) : (
            <img src="icons/C.svg" alt="C" />
          )}
          <img src="icons/down.svg" className="p-1" alt="down" />
        </span>
        {showLogout ? (
          <div className="logout">
            <button className="btn btn-sm" onClick={() => handleLogout()}>
              logout
            </button>
          </div>
        ) : null}
      </li>
    </ul>
  );
};

export default HeaderRight;
