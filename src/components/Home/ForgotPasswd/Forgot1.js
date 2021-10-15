import "./Forgot.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpen, faPaperPlane, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

const Forgot1 = () => {
  return (
    <div className="forgotMainDiv" id="bgsetting">
        <br/>
        <FontAwesomeIcon style={{fontSize:"100px",color:"purple"}} icon={faSyncAlt}/><br/><br/>
        <h1>Reset Password</h1>
        <p>
            Enter the email associated with your account and 
            we'll sent an email with instructions to reset your password.
        </p><br/><br/>
        <form>
            <label><FontAwesomeIcon icon={faEnvelopeOpen}/>&nbsp;&nbsp;</label>
            <input type="text"  placeholder="Email"/><br/><br/>
            <button type="submit" style={{backgroundColor:"#eb94f9"}}><FontAwesomeIcon icon={faPaperPlane}/>&nbsp;&nbsp; Send Instructions</button>
        </form>
    </div>
  );
};

export default Forgot1;
