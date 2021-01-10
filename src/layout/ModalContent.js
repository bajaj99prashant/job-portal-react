import React, { useState, useEffect } from "react";
import "../css/modalContent.css";
import { useStateValue } from "../DataLayer";
import { getJobCandidatesApi } from "../apiService";

function ModalContent() {
  const [state] = useStateValue();
  const [applicants, setApplicants] = useState([]);
  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    headers["Authorization"] = state.token;
    getJobCandidatesApi(state.jobIdModal, headers)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setApplicants(data.data);
        }
        console.log(data);
      })
      .catch((err) => {
        setApplicants([]);
        console.log(err);
      });
  }, []);
  return (
    <div>
      {applicants.length > 0 ? (
        <p className="m-2">Total {applicants.length} applicants</p>
      ) : (
        <p className="m-2">0 applicants</p>
      )}

      <div className="bg-light modal-content">
        {applicants.length > 0 ? (
          <div className="row m-1">
            {applicants.map((applicant, i) => (
              <div className="col-12 col-md-6 p-2" key={i}>
                <div className="modal-card p-3 border">
                  <div className="d-flex align-items-center">
                    <div className="letter">
                      {applicant.name[0].toUpperCase()}
                    </div>
                    <div className="px-4">
                      <h6>{applicant.name}</h6>
                      <p>{applicant.email}</p>
                    </div>
                  </div>
                  <div>
                    <h6>Skills</h6>
                    <p>{applicant.skills}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center my-auto">
            <img src="icons/resume.svg" alt="resume logo" />
            <h5 className="mt-2 no-application">No applications available!</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalContent;
