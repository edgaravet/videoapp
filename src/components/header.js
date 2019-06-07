import React from "react";
import "../App.css";
import fire from "./config";
import Registration from "./registration";
import Home from "./home";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Follows from "./follows";
import Login from "./login";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.authListener();
  }
  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: " " });
      }
    });
  }

  logout = e => {
    e.preventDefault();
    fire
      .auth()
      .signOut()
      .then(u => {})
      .catch(function(err) {});
    this.logButton();
  };

  regButton = e => {
    if (this.state.user.email == null) {
      return (
        <li>
          <Link className="registerbtn" to="/registration">
            Registration
          </Link>
        </li>
      );
    }
  };

  logButton = e => {
    if (this.state.user.email != null) {
      return (
        <button onClick={this.logout.bind(this)} className="registerbtn">
          Logout
        </button>
      );
    } else {
      return (
        <Link className="registerbtn" to="/login">
          Log In
        </Link>
      );
    }
  };

  render() {
    return (
      <Router>
        <div className="header">
          <ul>
            <li>
              <Link className="registerbtn" to="/home">
                Home
              </Link>
            </li>
            <li>
              <Link className="registerbtn" to="/follows">
                Follows
              </Link>
            </li>
            {this.regButton()}
            <li>{this.logButton()}</li>
            <li>{this.state.user.email}</li>
          </ul>
          <div align="right" className="search">
            <input />
            <button type="submit">search</button>
          </div>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/follows" component={Follows} />
          <Route path="/registration" component={Registration} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default Header;
