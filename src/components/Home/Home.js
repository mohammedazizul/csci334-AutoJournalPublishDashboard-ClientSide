import React from "react";
import "./Home.css";
import { useHistory } from "react-router";
import Logo from "../Logo/logo512.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  let history = useHistory();

  const goToSignIn = () => {
    history.push("/sign-in");
  };

  const goToSignUp = () => {
    history.push("/sign-up");
  };

  return (
    <div className="homeMainDiv">
      <img src={Logo} alt="logo" />

      <div>
        <button
          className="button"
          onClick={goToSignIn}
          style={{ backgroundColor: "#f9e6ac" }}
        >
          <FontAwesomeIcon icon={faUserCircle} />
          &nbsp;&nbsp; Sign in
        </button>

        <button
          className="button"
          onClick={goToSignUp}
          style={{ backgroundColor: "#bae9f4" }}
        >
          <FontAwesomeIcon icon={faUserPlus} />
          &nbsp;&nbsp; Sign up
        </button>
      </div>
    </div>
  );
};

export default Home;
