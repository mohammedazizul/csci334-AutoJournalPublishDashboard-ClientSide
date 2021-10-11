import React from "react";
import "./Home.css";
import Logo from "../Logo/logo512.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserCircle, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import Signin from "./Sign-in/Signin";

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
          <Signin />
    </div>
  );
};

export default Home;
