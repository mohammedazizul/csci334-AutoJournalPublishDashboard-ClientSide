import "./Forgot.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt, faLock, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

const Forgot3 = () => {
  return (
    <div className="forgotMainDiv" id="bgsetting">
        <br/>
        <FontAwesomeIcon style={{fontSize:"100px",color:"purple"}} icon={faExchangeAlt}/><br/><br/>
        <h1>Create New Password</h1>
        <p>
            You new password must be different from the previous used passwords.
        </p><br/><br/>
        <form>
            <label><FontAwesomeIcon icon={faLock}/>&nbsp;&nbsp;</label>
            <input type="password"  placeholder="Password"/><br/><br/>
            <label><FontAwesomeIcon icon={faLock}/>&nbsp;&nbsp;</label>
            <input type="password"  placeholder="Confirm Password"/><br/><br/>
            <button type="submit" style={{backgroundColor:"#eb94f9"}}><FontAwesomeIcon icon={faSyncAlt}/>&nbsp;&nbsp; Reset Password</button>
        </form>
    </div>
  );
};

export default Forgot3;
