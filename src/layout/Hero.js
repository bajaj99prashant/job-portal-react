import React from "react";
import "../css/hero.css";

function Hero({ user }) {
  return (
    <div className="hero">
      {user === "recruiter" ? (
        <>
          <p>
            <img src="icons/home.svg" alt="home icon" className="mr-1" /> Home
          </p>
          <h5>Jobs posted by you</h5>
        </>
      ) : user === "candidate" ? (
        <>
          <p>
            <img src="icons/home.svg" alt="home icon" className="mr-1" /> Home
          </p>
          <h5>Jobs posted for you</h5>
        </>
      ) : (
        <>
          <p>
            <img src="icons/home.svg" alt="home icon" className="mr-1" /> Home
            {" > applied"}
          </p>
          <h5>Jobs applied by you</h5>
        </>
      )}
    </div>
  );
}

export default Hero;
