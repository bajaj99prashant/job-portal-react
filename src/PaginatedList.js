import React, { useState, useEffect } from "react";
import Hero from "./layout/Hero";
import NoDataFallback from "./layout/NoDataFallback";
import JobsCard from "./layout/JobsCard";
import { useStateValue } from "./DataLayer";
import { navigate } from "@reach/router";
import Modal from "./layout/Modal";
import ModalContent from "./layout/ModalContent";
import Backdrop from "./layout/Backdrop";
import {
  getAvailableJobsApi,
  alreadyAppliedJobsApi,
  getPostedJobsApi,
} from "./apiService";

const PaginatedList = ({ appliedJobs }) => {
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue();
  const [currentPage, setPage] = useState(0);
  const [totalPages, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [user, setUser] = useState("recruiter");

  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    headers["Authorization"] = state.token;
    if (state.token === null && state.id === null) {
      navigate("/login");
    } else if (appliedJobs === true) {
      setUser(null);
      alreadyAppliedJobsApi(headers)
        .then((res) => res.json())
        .then((data) => {
          setInitialData(data.data);
        })
        .catch((err) => console.log(err));
    } else if (state.user === 0) {
      setUser("recruiter");
      getPostedJobsApi(headers)
        .then((res) => res.json())
        .then((data) => {
          setInitialData(data.data.data);
        })
        .catch((err) => console.log(err));
    } else if (state.user === 1) {
      setUser("candidate");
      getAvailableJobsApi(headers)
        .then((res) => res.json())
        .then((data) => {
          setInitialData(data.data);
        })
        .catch((err) => console.log(err));
    } else {
      dispatch({
        type: "SET_BG",
        bg: true,
      });
      navigate("/login");
    }
    dispatch({
      type: "SET_BG",
      bg: false,
    });
  }, []);

  useEffect(() => {
    const perPage = 8;
    setTotal(Math.ceil(initialData.length / perPage));
    const offset = currentPage * perPage;
    setData(initialData.slice(offset, offset + perPage));
  }, [currentPage, initialData]);

  const handleModal = () => {
    dispatch({
      type: "SHOW_MODAL",
    });
  };

  return (
    <>
      <div className="container">
        <Hero user={user} />
        <div className={data.length > 0 ? "row" : null}>
          {data.length > 0 ? (
            data.map((obj, i) => (
              <JobsCard
                key={i}
                user={user}
                heading={obj.title}
                description={obj.description}
                location={obj.location}
                id={obj.id}
              />
            ))
          ) : (
            <NoDataFallback user={user} />
          )}
        </div>
        <div
          className={`justify-content-center mt-5 ${
            data.length === 0 ? "d-none" : "d-flex"
          }`}
        >
          {currentPage !== 0 ? (
            <button
              className="btn btn-sm btn-outline-dark mx-1"
              onClick={() => setPage(currentPage - 1)}
            >
              {"<"}
            </button>
          ) : (
            <button className="btn btn-sm btn-outline-secondary disabled">
              {"<"}
            </button>
          )}
          <button
            className="btn btn-sm btn-outline-dark mx-1"
            onClick={() => setPage(currentPage)}
          >
            {currentPage + 1}
          </button>
          {currentPage + 1 < totalPages ? (
            <button
              className="btn btn-sm btn-outline-dark mx-1"
              onClick={() => setPage(currentPage + 1)}
            >
              {">"}
            </button>
          ) : (
            <button className="btn btn-sm btn-outline-secondary disabled">
              {">"}
            </button>
          )}
        </div>
      </div>

      {state.showModal ? (
        <>
          <Backdrop show={state.showModal} />
          <Modal show={state.showModal}>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="p-1">Applicants for this job</h5>
              <button
                className="btn btn-sm modal-close"
                onClick={() => handleModal()}
              >
                <img src="icons/close.svg" alt="close" />
              </button>
            </div>
            <hr className="mt-1 mb-0" />
            <ModalContent />
          </Modal>
        </>
      ) : null}
    </>
  );
};

export default PaginatedList;
