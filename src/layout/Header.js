import React from "react";
import "../css/header.css";
import { Link } from "@reach/router";
import HeaderRight from "./HeaderRight";
import { useStateValue } from "../DataLayer";

const Header = ({ user }) => {
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue();
  const handleLogoutMessage = () => {
    dispatch({
      type: "SET_LOGOUT_MESSAGE",
    });
  };
  return (
    <div className="header container mb-2 pt-4 pb-2 navbar">
      <h5 className="jobs-heading">
        <Link to="/">
          My<span>Jobs</span>
        </Link>
      </h5>
      <div className="heading-right ml-auto">
        {user === -1 ? (
          <Link to="/login" onClick={() => handleLogoutMessage()}>
            Login/Signup
          </Link>
        ) : user === 0 ? (
          <HeaderRight person="R" purpose="Post a Job" link="/user/post-job" />
        ) : user === 1 ? (
          <HeaderRight
            person="C"
            purpose="Applied Jobs"
            link="/user/applied-jobs"
          />
        ) : null}
      </div>
    </div>
  );
};

export default Header;
