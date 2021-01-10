import React, { useState, useEffect } from "react";
import { Link, navigate } from "@reach/router";
import FormWrapper from "./layout/FormWrapper";
import FormInput from "./layout/FormInput";
import { useStateValue } from "./DataLayer";
import { registerApi } from "./apiService";
import { emailValidation } from "./formValidation";

const Signup = () => {
  //eslint-disable-next-line
  const [state, dispatch] = useStateValue();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [skills, setSkills] = useState("");
  const [userRole, setUserRole] = useState(-1);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [confirmPassErr, setConfirmPassErr] = useState("");

  useEffect(() => {
    dispatch({
      type: "SET_USER",
      user: "noOne",
    });
    dispatch({
      type: "SET_BG",
      bg: true,
    });
  }, []);

  const errorValidation = () => {
    if (
      emailValidation(email) === "OK" &&
      name !== "" &&
      userRole !== -1 &&
      password !== "" &&
      password === confirmPass
    ) {
      return true;
    } else {
      return false;
    }
  };

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

  const handleSignup = (e) => {
    setErr("");
    e.preventDefault();

    if (errorValidation()) {
      setLoading(true);
      const data = {
        email: email,
        userRole: userRole,
        password: password,
        confirmPassword: confirmPass,
        name: name,
        skills: skills,
      };

      registerApi(data)
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          console.log(resData);
          // eslint-disable-next-line
          if (resData?.errors?.length > 0) {
            setErr("There is some error");
          } else {
            dispatch({
              type: "SET_TOKEN_AND_ID",
              token: resData.data.token,
              id: resData.data.id,
            });
            dispatch({
              type: "SET_USER",
              user: resData.data.userRole,
            });
            dispatch({
              type: "SET_EMAIL",
              user: resData.data.email,
            });
            navigate("/user");
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      setErr("Check all the fields while submitting data");
    }
  };

  return (
    <FormWrapper>
      <h3 className="pb-2 pt-3">Signup</h3>
      <p className="mb-0">{"I'm a'"}</p>
      <div className="mb-3">
        <button
          className={`btn ${
            userRole === 0 ? "btn-primary" : "btn-light"
          } btn-sm px-4 mr-1`}
          onClick={() => setUserRole(0)}
        >
          Recruiter
        </button>
        <button
          className={`btn ${
            userRole === 1 ? "btn-primary" : "btn-light"
          } btn-sm px-4 mr-1`}
          onClick={() => setUserRole(1)}
        >
          Candidate
        </button>
      </div>
      <form onSubmit={handleSignup}>
        <FormInput
          value={name}
          error={nameErr}
          changeMe={(e) => ManageInput(e, setNameErr, setName)}
          placeholder="Enter your full name"
          name="name"
          type="text"
        >
          Full Name*
        </FormInput>
        <FormInput
          value={email}
          error={emailErr}
          changeMe={(e) => ManageInput(e, setEmailErr, setEmail)}
          placeholder="Enter your email"
          name="email"
          type="email"
        >
          Email Address*
        </FormInput>
        <div className="d-flex justify-content-between">
          <FormInput
            value={password}
            error={passErr}
            changeMe={(e) => ManageInput(e, setPassErr, setPassword)}
            placeholder="Enter your password"
            name="password"
            type="password"
            classes="half mb-0"
          >
            Create Password*
          </FormInput>
          <FormInput
            value={confirmPass}
            error={confirmPassErr}
            changeMe={(e) => ManageInput(e, setConfirmPassErr, setConfirmPass)}
            placeholder="Enter your password"
            name="confirmPass"
            type="password"
            classes="half mb-0"
          >
            Confirm Password*
          </FormInput>
        </div>
        <FormInput
          value={skills}
          changeMe={(e) => setSkills(e.target.value)}
          placeholder="Enter comma seperated skills"
          name="skills"
          type="text"
        >
          Skills
        </FormInput>
        <p className="text-center text-danger my-1">{err}</p>
        <button
          type="submit"
          className="btn btn-primary btn-sm px-4 center-btn"
        >
          {loading ? <img src="icons/loader.svg" alt="loading..." /> : "Signup"}
        </button>
      </form>
      <div className="w-100 text-center p-2">
        <p>
          Have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </FormWrapper>
  );
};

export default Signup;
