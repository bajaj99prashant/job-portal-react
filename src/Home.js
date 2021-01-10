import React, { useEffect } from "react";
import { Link, navigate } from "@reach/router";
import { useStateValue } from "./DataLayer";
import "./css/home.css";

const Home = () => {
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    if (state.token !== null && state.id !== null) {
      navigate("/user");
    } else {
      dispatch({
        type: "SET_BG",
        bg: true,
      });
      setTimeout(() => {
        dispatch({
          type: "SET_LOGOUT_MESSAGE",
        });
      }, 2000);
    }
  }, []);
  const handleLogoutMessage = () => {
    dispatch({
      type: "SET_LOGOUT_MESSAGE",
    });
  };
  return (
    <div className="home container">
      <div className="row my-5">
        <div className="col-sm-5 d-flex align-items-center justify-content-center">
          <div className="main-content p-2">
            <h1>Welcome to</h1>
            <h1 className="mb-2">
              My<span>Jobs</span>
            </h1>
            <Link
              to="/signup"
              className="btn btn-primary btn-sm mx-0 w-50 my-4"
              onClick={() => handleLogoutMessage()}
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="col-sm-7">
          <div className="image-container"></div>
        </div>
      </div>

      <div className="my-3">
        <h4 className="px-2 secondary-heading">Why Us</h4>
        <div className="row secondary-section">
          <div className="col-sm-4">
            <div className="card-section">
              <h4>Get More</h4>
              <h4>Visibility</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                ullam officia enim cum omnis culpa unde minus fugit laudantium,
                repellat ea sunt error, aut neque quam iste molestiae! Dolore,
                maiores.
              </p>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card-section">
              <h4>Get More</h4>
              <h4>Visibility</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                ullam officia enim cum omnis culpa unde minus fugit laudantium,
                repellat ea sunt error, aut neque quam iste molestiae! Dolore,
                maiores.
              </p>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card-section">
              <h4>Get More</h4>
              <h4>Visibility</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                ullam officia enim cum omnis culpa unde minus fugit laudantium,
                repellat ea sunt error, aut neque quam iste molestiae! Dolore,
                maiores.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
