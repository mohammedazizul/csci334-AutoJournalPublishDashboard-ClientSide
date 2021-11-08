import "./SignIn.css";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import Logo from "../../Logo/logo512.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpen,
  faLock,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";

const SignIn = () => {
  const [, setLoggedInUser] = useContext(UserContext);

  let history = useHistory();

  const [userEmail, setUserEmail] = useState(null);
  const [userPasswd, setUserPasswd] = useState(null);

  // STANDARD POST REQUEST - POST - (WORKING FINE)
  // creating data to send to BE
  let formData = new FormData();
  formData.append("email", userEmail);
  formData.append("password", userPasswd);

  const processSignin = () => {
    // to Display the key/value pairs
    // for (var pair of formData.entries()) {
    //   console.log("Form Data: ", pair[0] + ", " + pair[1]);
    // }

    const urlToPost = `http://localhost/jess-backend/processes/login.php`;

    fetch(urlToPost, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Sign in :", data);
        if (data.error) {
          history.push({ pathname: "/", state: data });
          alert(data.error);
        } else {
          setLoggedInUser({
            username: data.username,
            personID: data.personID,
            email: data.email,
            type: data.type,
            dob: data.dob,
            isLoggedIn: true,
          });
          history.push({
            pathname: "/dashboard/manuscript-table",
            state: data,
          });
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const [emailError, setEmailError] = useState({
    display: "none",
  });
  const [PasswdError, setPasswdError] = useState({
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

  const handleUserPasswd = (e) => {
    let pwd = e.target.value;
    setUserPasswd(pwd);

    if (pwd !== "") {
      setPasswdError({
        display: "none",
      });
    }
  };

  const handleLogin = (e) => {
    let re = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    if (userEmail === null) {
      e.preventDefault();
      setEmailError({
        display: "",
        color: "red",
      });
    } else if (!re.test(userEmail)) {
      e.preventDefault();
      alert("Email Format: ...@...com !");
    } else if (userPasswd === null) {
      e.preventDefault();
      setPasswdError({
        display: "",
        color: "red",
      });
    } else {
      processSignin();
    }
  };

  return (
    <div className="SigninMainDiv" id="bgsetting">
      <img src={Logo} alt="logo" />
      <br />
      <label>
        <FontAwesomeIcon icon={faEnvelopeOpen} />
        &nbsp;&nbsp;
      </label>
      <input type="text" placeholder="Email" onChange={handleUserEmail} />
      <br />
      <span style={emailError}>please enter your email</span>

      <br />
      <br />

      <label>
        <FontAwesomeIcon icon={faLock} />
        &nbsp;&nbsp;
      </label>
      <input
        type="password"
        placeholder="Password"
        onChange={handleUserPasswd}
      />
      <br />
      <span style={PasswdError}>Please enter your password</span>

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
    </div>
  );
};

export default SignIn;
