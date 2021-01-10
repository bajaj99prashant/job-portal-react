import React from "react";
import "../css/jobsCard.css";
import { applyToJobApi } from "../apiService";
import { useStateValue } from "../DataLayer";
import { navigate } from "@reach/router";

function JobsCard({ user, heading, description, location, id }) {
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue();
  const handleModal = () => {
    dispatch({
      type: "JOB_ID_MODAL",
      jobId: id,
    });
    dispatch({
      type: "SHOW_MODAL",
    });
  };
  const applyToJob = () => {
    if (state.token !== null && state.id !== null) {
      const headers = { "Content-Type": "application/json" };
      headers["Authorization"] = state.token;
      const data = {
        jobId: id,
      };

      applyToJobApi(data, headers)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          navigate("/user/applied-jobs");
        });
    }
  };
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 my-3">
      <div className="job-card py-3">
        <h5 className="px-3">{heading}</h5>
        <p className="px-3">{description}</p>
        <p className="my-1 location px-2">
          <span>
            <img src="icons/location.svg" alt="location" />
            {` ${location}`}
          </span>
          {user === "recruiter" ? (
            <button
              className="btn btn-sm btn-primary float-right"
              onClick={() => handleModal()}
            >
              View Applications
            </button>
          ) : user === "candidate" ? (
            <button
              className="btn btn-sm btn-primary float-right"
              onClick={() => applyToJob()}
            >
              Apply
            </button>
          ) : null}
        </p>
      </div>
    </div>
  );
}

export default JobsCard;
