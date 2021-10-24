import "./Forgot.css";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpen,
  faPaperPlane,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";

const Forgot1 = () => {
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

  const handleSubmit = (e) => {
    let re = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    if (userEmail === null) {
      e.preventDefault();
      setEmailError({
        display: "",
        color: "red",
      });
    }else if(!re.test(userEmail)){
      e.preventDefault();
      alert("Email Format: ...@...com !");
    }else {
      console.log("user email: ", userEmail);
      //
      history.push("/forgot-password2");
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
        <input type="text" placeholder="Email" onChange={handleUserEmail} /><br />
        <span style={emailError}>please enter your email</span>
        <br />
        <br />
        <button 
                  type="submit" 
                  style={{ backgroundColor: "#eb94f9" }}
                  onClick={handleSubmit}>
            <FontAwesomeIcon icon={faPaperPlane} />
            &nbsp;&nbsp; Request TAC
        </button>
    </div>
  );
};

export default Forgot1;
