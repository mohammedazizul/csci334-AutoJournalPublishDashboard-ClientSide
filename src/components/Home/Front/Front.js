import React from "react";
import "./Front.css";
import Logo from "../../Logo/logo512.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserCircle, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Front = () => {
  console.log("Front page");
  return (
    <div className="homeMainDiv" id="bgsetting">

          <img src={Logo} alt="logo"/>

          <div>
            <Link to="/home/sign-in">
              <button className="button" style={{backgroundColor:"#f9e6ac"}}>
                <FontAwesomeIcon icon={faUserCircle}/>&nbsp;&nbsp; Sign in
              </button>
            </Link>
            <Link to="/home/sign-up">
              <button className="button" style={{backgroundColor:"#bae9f4"}}>
                <FontAwesomeIcon icon={faUserPlus}/>&nbsp;&nbsp; Sign up
              </button>
            </Link>
          </div>
    </div>
  );
};

export default Front;
