import { Link, navigate } from "@reach/router";
import React, { useState, useEffect } from "react";
import FormWrapper from "./layout/FormWrapper";
import FormInput from "./layout/FormInput";
import { useStateValue } from "./DataLayer";
import { loginApi } from "./apiService";
import { emailValidation } from "./formValidation";

const Login = () => {
  //eslint-disable-next-line
  const [state, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");

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

  const handleLogin = (e) => {
    setErr("");
    e.preventDefault();

    if (emailValidation(email) === "OK" && password !== "") {
      setLoading(true);
      const data = {
        email: email,
        password: password,
      };

      loginApi(data)
        .then((res) => {
          res.json().then((dt) => {
            dispatch({
              type: "SET_TOKEN_AND_ID",
              token: dt.data.token,
              id: dt.data.id,
            });
            dispatch({
              type: "SET_USER",
              user: dt.data.userRole,
            });
            dispatch({
              type: "SET_EMAIL",
              user: dt.data.email,
            });
            navigate(`/user`);
          });
        })
        .catch((error) => {
          setErr(error.message);
          setLoading(false);
        });
    } else {
      setErr("no field should be empty or invalid");
    }
  };
  return (
    <FormWrapper>
      <h3 className="pb-2 pt-3">Login</h3>
      <form onSubmit={handleLogin}>
        <FormInput
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          error={emailErr}
          changeMe={(e) => ManageInput(e, setEmailErr, setEmail)}
        >
          Email
        </FormInput>
        <FormInput
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          error={passErr}
          changeMe={(e) => ManageInput(e, setPassErr, setPassword)}
        >
          Password <Link to="/forget-password">Forgot your password?</Link>
        </FormInput>
        <p className="text-center text-danger my-1">{err}</p>
        <button
          type="submit"
          className="btn btn-primary btn-sm px-4 center-btn"
        >
          {loading ? <img src="icons/loader.svg" alt="loading..." /> : "Login"}
        </button>
      </form>
      <div className="w-100 text-center p-2">
        <p>
          New to MyJobs? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </FormWrapper>
  );
};

export default Login;
