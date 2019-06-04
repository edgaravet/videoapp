import React from "react";
import "../App.css";
import Registration from "./registration";
import Home from "./home";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Follows from "./follows";

class Header extends React.Component {
  render() {
    return (
      <Router>
        <div className="header">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/registration">Registration</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/follows">Follows</Link>
            </li>
          </ul>

          <div align="right" className="search">
            <input />
            <button type="submit">search</button>
          </div>

          <Route exact path="/" component={Home} />
          <Route path="/registration" component={Registration} />
          <Route path="/follows" component={Follows} />
        </div>
      </Router>
    );
  }
}

export default Header;
