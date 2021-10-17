import React from "react";
import "./Home.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Front from "./Front/Front";
import Signin from "./Sign-in/Signin";
import Signup from "./Sign-up/Signup";
import Forgot1 from "./ForgotPasswd/Forgot1";
import Forgot2 from "./ForgotPasswd/Forgot2";
import Forgot3 from "./ForgotPasswd/Forgot3";

const Home = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Front />
          </Route>
          <Route exact path="/home">
            <Front />
          </Route>
          <Route path="/home/sign-in">
            <Signin />
          </Route>
          <Route path="/home/sign-up">
            <Signup />
          </Route>
          <Route path="/home/forgot-password1">
            <Forgot1 />
          </Route>
          <Route path="/home/forgot-password2">
            <Forgot2 />
          </Route>
          <Route path="/home/forgot-password3">
            <Forgot3 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Home;
