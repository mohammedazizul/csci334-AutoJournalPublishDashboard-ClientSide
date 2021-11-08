import "./Forgot.css";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpen,
  faKey,
  faPaperPlane,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../App";

const Forgot1 = () => {
  let history = useHistory();

  const [, setLoggedInUser] = useContext(UserContext);

  const [userEmail, setUserEmail] = useState(null);
  const [TAC, setTAC] = useState(null);

  let formData = new FormData();
  formData.append("email", userEmail);

  const processForgot = () => {
    // to Display the key/value pairs
    for (var pair of formData.entries()) {
      console.log("Form Data: ", pair[0] + ", " + pair[1]);
    }

    const urlToPost = `http://localhost/jess-backend/processes/forgotpassword.php`;

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
        if (data.condition === "success") {
          console.log("Forgot password :", data);
          history.push({ pathname: "/forgot-password2", state: data });
          setLoggedInUser({
            email: data.email,
          });
        } else alert("User doesn't exist, please sign up first");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const [emailError, setEmailError] = useState({
    display: "none",
  });
  const [TACError, setTACError] = useState({
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
  const handleTAC = (e) => {
    let TAC = e.target.value;
    setTAC(TAC);

    if (TAC !== "") {
      setTACError({
        display: "none",
      });
    }
  };

  const handleSubmit = (e) => {
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
    } else if (TAC === null || TAC !== "867532") {
      e.preventDefault();
      setTACError({
        display: "",
        color: "red",
      });
    } else {
      processForgot();
    }
  };

  return (
    <div className="forgotMainDiv" id="bgsetting">
      <br />
      <FontAwesomeIcon
        style={{ fontSize: "100px", color: "purple" }}
        icon={faSyncAlt}
      />
      <br />
      <br />
      <h1>Reset Password</h1>
      <p>
        Enter the email associated with your account and we'll sent an email
        with instructions to reset your password.
      </p>
      <br />
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
        <FontAwesomeIcon icon={faKey} />
        &nbsp;&nbsp;
      </label>
      <input type="text" placeholder="TAC" onChange={handleTAC} />
      <br />
      <span style={TACError}>Please enter the correct 6-digit TAC</span>
      <br />
      <br />

      <button
        type="submit"
        style={{ backgroundColor: "#eb94f9" }}
        onClick={handleSubmit}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
        &nbsp;&nbsp; Validate
      </button>
    </div>
  );
};

export default Forgot1;
