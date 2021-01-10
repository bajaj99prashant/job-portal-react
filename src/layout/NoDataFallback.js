import { Link } from "@reach/router";
import React from "react";
import "../css/noDataFallback.css";

const NoDataFallback = ({ user }) => {
  return (
    <div className="NoData d-flex align-items-center justify-content-center text-center">
      {user === "recruiter" ? (
        <div>
          <img src="icons/post.svg" alt="post img" className="mb-2" />
          <p>Your posted jobs will show here!</p>
          <Link to="/user/post-job" className="btn btn-primary btn-sm">
            Post a job
          </Link>
        </div>
      ) : user === "candidate" ? (
        <div>
          <img src="icons/apply.svg" alt="post img" />
          <p>We do not have any matching opportunities for you currently.</p>
          <Link to="/user/applied-jobs" className="btn btn-primary btn-sm">
            See applied jobs
          </Link>
        </div>
      ) : (
        <div>
          <img src="icons/apply.svg" alt="post img" />
          <p>See all jobs posted for you.</p>
          <Link to="/user" className="btn btn-primary btn-sm">
            See all jobs
          </Link>
        </div>
      )}
    </div>
  );
};

export default NoDataFallback;
