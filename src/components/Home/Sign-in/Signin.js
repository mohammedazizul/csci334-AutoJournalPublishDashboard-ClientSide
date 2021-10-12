import React from "react";
import Logo from "../../Logo/logo512.png";
import "./Signin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelopeOpen, faLock, faUserCircle} from "@fortawesome/free-solid-svg-icons";

const Signin = () => {
  return (
    <div className="SigninMainDiv" id="bgsetting">
          <img src={Logo} alt="logo"/>
          <form>
            <label><FontAwesomeIcon icon={faEnvelopeOpen}/>&nbsp;&nbsp;</label>
            <input type="text" className="line" placeholder="Email"/>

            <br/><br/>

            <label><FontAwesomeIcon icon={faLock}/>&nbsp;&nbsp;</label>
            <input type="text" className="line" placeholder="Password"/>

            <br/>

            <p>Forgot Password?</p>

            <br/>
            
            <button className="button" style={{backgroundColor:"#f9e6ac"}}><FontAwesomeIcon icon={faUserCircle}/>&nbsp;&nbsp; Sign in</button>
          </form>
    </div>
  );
};

export default Signin;
