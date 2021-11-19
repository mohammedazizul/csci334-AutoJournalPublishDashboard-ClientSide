import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import SignIn from "./components/Home/SignIn/SignIn";
import SignUp from "./components/Home/SignUp/SignUp";
import Forgot1 from "./components/Home/ForgotPasswd/Forgot1";
import Forgot2 from "./components/Home/ForgotPasswd/Forgot2";
import NoMatchFound from "./components/NoMatchFound/NoMatchFound";
import { createContext, useState } from "react";
import PrivateRoute from "./components/AppRouter/PrivateRoute/PrivateRoute";

export const UserContext = createContext(null);

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "",
    personID: "",
    email: "",
    password: "",
    type: -1,
    dob: "",
    status:"",
    isLoggedIn: false,
  });

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/forgot-password1">
            <Forgot1 />
          </Route>
          <Route path="/forgot-password2">
            <Forgot2 />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="*">
            <NoMatchFound />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
