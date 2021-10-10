import React from "react";
import "./Home.css";
import Logo from "../Logo/logo192.png";

const Home = () => {
  return (
    <div className="homeMainDiv" id="bgsetting">
        <div className="innerDiv">
          <img src={Logo} alt="logo"/>
        </div>
    </div>
  );
};

export default Home;
