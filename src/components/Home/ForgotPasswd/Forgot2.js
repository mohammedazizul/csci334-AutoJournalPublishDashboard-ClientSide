import "./Forgot.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";

const Forgot2 = () => {
  return (
    <div className="forgotMainDiv" id="bgsetting">
        <br/>
        <FontAwesomeIcon style={{fontSize:"100px",color:"purple"}} icon={faEnvelopeOpenText}/><br/><br/>
        <h1>Check your mail</h1>
        <p>
            We have sent a password recovery instruction to your email. <br/><br/><br/>
            Did not receive the email? Check your spam filter, or try again.
        </p>
    </div>
  );
};

export default Forgot2;
