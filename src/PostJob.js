import React, { useState, useEffect } from "react";
import FormWrapper from "./layout/FormWrapper";
import FormInput from "./layout/FormInput";
import "./css/postJob.css";
import { createJobApi } from "./apiService";
import { useStateValue } from "./DataLayer";
import { navigate } from "@reach/router";

function PostJob() {
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [titleErr, setTitleErr] = useState("");
  const [descErr, setDescErr] = useState("");
  const [locationErr, setLocationErr] = useState("");

  useEffect(() => {
    if (state.user !== 0) {
      navigate("/login");
    } else if (state.token !== null && state.id !== null) {
      dispatch({
        type: "SET_BG",
        bg: true,
      });
    }
  }, []);

  const ManageInput = (e, setErrorFunc, setFunc) => {
    setErr("");
    if (e.target.value !== "") {
      setErrorFunc("");
      setFunc(e.target.value);
    } else {
      setErrorFunc("Field should be valid");
      setFunc(e.target.value);
    }
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    setErr("");

    if (title !== "" && description !== "" && location !== "") {
      setLoading(true);
      const data = {
        title: title,
        description: description,
        location: location,
      };
      const headers = { "Content-Type": "application/json" };
      headers["Authorization"] = state.token;
      createJobApi(data, headers)
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            navigate("/user");
          } else {
            setErr("Some Error occurred.");
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setErr("fill all the fields correctly");
    }
  };
  return (
    <FormWrapper>
      <h3 className="pb-2 pt-3">Post a Job</h3>
      <form onSubmit={handlePostJob}>
        <FormInput
          name="title"
          type="text"
          placeholder="Enter job title"
          value={title}
          error={titleErr}
          changeMe={(e) => ManageInput(e, setTitleErr, setTitle)}
        >
          Job title*
        </FormInput>

        <div className="form-group">
          <label htmlFor="description">
            Description
            <textarea
              name="description"
              rows="4"
              className={`form-control-sm form-control bg-light ${
                descErr ? "border-danger" : null
              }`}
              placeholder="Enter job description"
              onChange={(e) => ManageInput(e, setDescErr, setDescription)}
            >
              {description}
            </textarea>
          </label>
          <p className="text-right text-danger mt-0 pt-0">{descErr}</p>
        </div>

        <FormInput
          name="location"
          type="text"
          placeholder="Enter location"
          value={location}
          error={locationErr}
          changeMe={(e) => ManageInput(e, setLocationErr, setLocation)}
        >
          Location*
        </FormInput>
        <p className="text-center text-danger my-1">{err}</p>
        <button
          type="submit"
          className="btn btn-primary btn-sm px-4 mb-3 center-btn"
        >
          {loading ? <img src="icons/loader.svg" alt="loading..." /> : "Post"}
        </button>
      </form>
    </FormWrapper>
  );
}

export default PostJob;
