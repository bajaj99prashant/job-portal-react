import React, { useState, useEffect } from "react";
import FormWrapper from "./layout/FormWrapper";
import FormInput from "./layout/FormInput";
import { useStateValue } from "./DataLayer";
//eslint-disable-next-line
import { getResetPasswordToken, changePasswordApi } from "./apiService";
import { emailValidation } from "./formValidation";

function ForgetPassword() {
  //eslint-disable-next-line
  const [state, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [conNewPass, setConNewPass] = useState("");
  const [emailErr, setEmailErr] = useState("");
  //eslint-disable-next-line
  const [showEmail, setShowEmail] = useState(true);
  //eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch({
      type: "SET_USER",
      user: -1,
    });
    dispatch({
      type: "SET_BG",
      bg: true,
    });
  }, []);

  const ManageInput = (e, setErrorFunc, setFunc) => {
    if (e.target.value !== "") {
      setErrorFunc("");
      setFunc(e.target.value);
    } else {
      setErrorFunc("Fill the field correctly");
      setFunc(e.target.value);
    }
  };
  const handleEmailSubmit = (event) => {
    event.preventDefault();
    if (emailValidation(email) === "OK") {
      getResetPasswordToken(email)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } else {
      setEmailErr("Fill email correctly");
    }
  };
  return (
    <FormWrapper>
      {showEmail ? (
        <>
          <h3 className="pb-2 pt-3">Forgot your password?</h3>
          <p>
            Enter the email associated with your account and {"we'll"} send you
            instructions to reset your password.
          </p>
          <form onSubmit={(event) => handleEmailSubmit(event)}>
            <FormInput
              name={email}
              type="email"
              placeholder="Enter job email"
              value={email}
              changeMe={(e) => {
                ManageInput(e, setEmailErr, setEmail);
              }}
              error={emailErr}
            >
              Email Address
            </FormInput>

            <button
              type="submit"
              className="btn btn-primary btn-sm px-4 mb-3 center-btn"
            >
              {loading ? (
                <img src="icons/loader.svg" alt="loading..." />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </>
      ) : (
        <>
          <h3 className="pb-2 pt-3">Reset Your Password</h3>
          <p>Enter your password below.</p>
          <form>
            <FormInput
              name={newPass}
              type="password"
              placeholder="Enter your password"
              value={newPass}
              changeMe={(e) => setNewPass(e.target.value)}
            >
              New password
            </FormInput>

            <FormInput
              name={conNewPass}
              type="email"
              placeholder="Enter your password"
              value={conNewPass}
              changeMe={(e) => setConNewPass(e.target.value)}
            >
              Confirm new password
            </FormInput>

            <button
              type="submit"
              className="btn btn-primary btn-sm px-4 mb-3 center-btn"
            >
              {loading ? (
                <img src="icons/loader.svg" alt="loading..." />
              ) : (
                "Reset"
              )}
            </button>
          </form>
        </>
      )}
    </FormWrapper>
  );
}

export default ForgetPassword;
