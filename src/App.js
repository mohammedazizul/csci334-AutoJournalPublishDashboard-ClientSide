import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
