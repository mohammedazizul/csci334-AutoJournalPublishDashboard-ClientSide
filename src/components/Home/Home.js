import React from "react";
import "./Home.css";
import Logo from "../Logo/logo512.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserCircle, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import Signin from "./Sign-in/Signin";
import Signup from "./Sign-up/Signup";
import Forgot1 from "./ForgotPasswd/Forgot1";
import Forgot2 from "./ForgotPasswd/Forgot2";
import Forgot3 from "./ForgotPasswd/Forgot3";

const Home = () => {
  return (
    <div className="homeMainDiv" id="bgsetting">

          <img src={Logo} alt="logo"/>

          <div>
          <button className="button" style={{backgroundColor:"#f9e6ac"}}>
              <FontAwesomeIcon icon={faUserCircle}/>&nbsp;&nbsp; Sign in
          </button>
          <button className="button" style={{backgroundColor:"#bae9f4"}}>
              <FontAwesomeIcon icon={faUserPlus}/>&nbsp;&nbsp; Sign up
          </button>
          </div>
          
          <Forgot1 />
          <Forgot2 />
          <Forgot3 />
          <Signin />
          <Signup />
    </div>
  );
};

export default Home;
