import React from "react";
import "./Dashboard.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Review from "./Pages/Review/Review";
import Assign from "./Pages/Assign/Assign";
import FinalCheck from "./Pages/FinalCheck/FinalCheck";
import Publish from "./Pages/Publish/Publish";
import Update from "./Pages/Update/Update";
import Report from "./Pages/Report/Report";
import Upload from "./Pages/Upload/Upload";
import Modify from "./Pages/Modify/Modify";
import Payment from "./Pages/Payment/Payment";
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
          <Route path="/dashboard/publish">
            <Publish />
          </Route>
          <Route path="/dashboard/update">
            <Update />
          </Route>
          <Route path="/dashboard/report">
            <Report />
          </Route>
          <Route path="/dashboard/upload">
            <Upload />
          </Route>
          <Route path="/dashboard/modify">
            <Modify />
          </Route>
          <Route path="/dashboard/payment">
            <Payment />
          </Route>
          {/* for a new route path name can be found in TopNav.js */}
        </Switch>
      </Router>
    </div>
  );
};

export default Dashboard;
