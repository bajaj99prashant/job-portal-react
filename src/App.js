import React from "react";
import "./css/app.css";
import { Router } from "@reach/router";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Header from "./layout/Header";
import PaginatedList from "./PaginatedList";
import PostJob from "./PostJob";
import ForgetPassword from "./ForgetPassword";
import { useStateValue } from "./DataLayer";

function App() {
  // eslint-disable-next-line
  const [{ bg, user, showLogoutMessage }, dispatch] = useStateValue();
  const handleLogoutMessage = () => {
    dispatch({
      type: "SET_LOGOUT_MESSAGE",
    });
  };
  return (
    <div className={`${bg ? "ful" : "hal"} h-100`}>
      <Header user={user} />
      {showLogoutMessage ? (
        <div className="logout-message">
          <h5>Logout</h5>
          <p>You have successfully logged out.</p>
          <button className="btn btn-sm" onClick={() => handleLogoutMessage()}>
            <img src="icons/close.svg" alt="close" />
          </button>
        </div>
      ) : null}
      <Router>
        <Home path="/" />
        <Login path="/login" />
        <Signup path="/signup" />
        <ForgetPassword path="/forget-password" />
        <PostJob path="/user/post-job" />
        <PaginatedList appliedJobs={false} path="/user" />
        <PaginatedList appliedJobs={true} path="/user/applied-jobs" />
      </Router>
    </div>
  );
}

export default App;
