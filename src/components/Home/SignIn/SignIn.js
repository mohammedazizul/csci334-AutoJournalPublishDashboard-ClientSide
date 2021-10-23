import "./SignIn.css";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Logo from "../../Logo/logo512.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpen,
  faLock,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SignIn = () => {
  // form data
  // const userData = {
  //   email: "",
  //   password: "",
  // };

  let history = useHistory();
  const [userEmail, setUserEmail] = useState(null);
  const [emailError, setEmailError] = useState({
    display: "none",
  });

  const handleUserEmail = (e) => {
    let email = e.target.value;
    setUserEmail(email);

    if (email !== "") {
      setEmailError({
        display: "none",
      });
    }
  };

  const handleLogin = (e) => {
    if (userEmail === null) {
      e.preventDefault();
      setEmailError({
        display: "",
        color: "red",
      });
      alert("ENTER USER EMAIL FIRST !");
    } else {
      console.log("user email: ", userEmail);
      //
      history.push("/dashboard/manuscript-table");
    }
  };

  return (
    <div className="SigninMainDiv" id="bgsetting">
      <img src={Logo} alt="logo" />
      {/* <form> */}
      <label>
        <FontAwesomeIcon icon={faEnvelopeOpen} />
        &nbsp;&nbsp;
      </label>
      <input type="text" placeholder="Email" onChange={handleUserEmail} />
      <span style={emailError}>please enter your email</span>

      <br />
      <br />

      <label>
        <FontAwesomeIcon icon={faLock} />
        &nbsp;&nbsp;
      </label>
      <input type="password" placeholder="Password" />

      <br />

      <Link to="/forgot-password1">
        <p>Forgot Password?</p>
      </Link>

      <br />

      <button
        type=""
        onClick={handleLogin}
        style={{ backgroundColor: "#f9e6ac" }}
      >
        <FontAwesomeIcon icon={faUserCircle} />
        &nbsp;&nbsp; Sign in
      </button>
      {/* </form> */}
    </div>
  );
};

export default SignIn;
