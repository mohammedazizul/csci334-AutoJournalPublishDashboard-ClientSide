import "./Forgot.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Forgot2 = () => {
  return (
    <div className="forgotMainDiv" id="bgsetting">
        <br/>
        <FontAwesomeIcon style={{fontSize:"100px",color:"purple"}} icon={faEnvelopeOpenText}/><br/><br/>

        <h1>Check your mail</h1><br/>

        <form>
          <label>TAC: </label>

          <input type="text"  placeholder="TAC"/><br/><br/>

          <Link to="/home/forgot-password3">
            <button type="submit" style={{backgroundColor:"#eb94f9"}}>Submit</button>
          </Link>
        </form><br/><br/>

        <p>
            We have sent a password recovery TAC number to your email. <br/><br/>
            Did not receive the email? Check your spam filter, or&nbsp;
            <Link to="/home/forgot-password1">
               try again
            </Link>.
        </p>
    </div>
  );
};

export default Forgot2;
