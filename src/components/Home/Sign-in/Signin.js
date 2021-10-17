import "./Signin.css";
import React from "react";
import Logo from "../../Logo/logo512.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelopeOpen, faLock, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div className="SigninMainDiv" id="bgsetting">
          <img src={Logo} alt="logo"/>
          <form>
            <label><FontAwesomeIcon icon={faEnvelopeOpen}/>&nbsp;&nbsp;</label>
            <input type="text"  placeholder="Email"/>

            <br/><br/>

            <label><FontAwesomeIcon icon={faLock}/>&nbsp;&nbsp;</label>
            <input type="password"  placeholder="Password"/>

            <br/>

            <Link to="/home/forgot-password1">
              <p>Forgot Password?</p>
            </Link>

            <br/>
            
            <button type="submit" style={{backgroundColor:"#f9e6ac"}}><FontAwesomeIcon icon={faUserCircle}/>&nbsp;&nbsp; Sign in</button>
          </form>
    </div>
  );
};

export default Signin;
