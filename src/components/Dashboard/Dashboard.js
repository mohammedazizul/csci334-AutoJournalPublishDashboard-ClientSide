import React from "react";
import "./Dashboard.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Review from "./Pages/Review/Review";
import Assign from "./Pages/Assign/Assign";
import FinalCheck from "./Pages/FinalCheck/FinalCheck";
import TopNav from "./TopNav/TopNav";

const Dashboard = () => {
  return (
    <div className="dashboardMainDiv">
      <Router>
        <TopNav />
        <Switch>
          <Route path="/dashboard/review">
            <Review />
          </Route>
          <Route path="/dashboard/assign">
            <Assign />
          </Route>
          <Route path="/dashboard/finalCheck">
            <FinalCheck />
          </Route>
          {/* for a new route path name can be found in TopNav.js */}
        </Switch>
      </Router>
    </div>
  );
};

export default Dashboard;
