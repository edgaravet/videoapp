import React from "react";
import "../App.css";
import fire from "./config";
import Registration from "./registration";
import Home from "./home";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Follows from "./follows";
import Login from "./login";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      firstname: "",
      lastname: ""
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

  folowBtn = e => {
    if (this.state.user.email != null) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/follows">
            Follows
          </Link>
        </li>
      );
    }
  };

  regButton = e => {
    if (this.state.user.email == null) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/registration">
            Registration
          </Link>
        </li>
      );
    }
  };

  logButton = e => {
    if (this.state.user.email != null) {
      return (
        <button
          onClick={this.logout.bind(this)}
          className="btn btn-outline-success my-2 my-sm-0"
        >
          Logout
        </button>
      );
    } else {
      return (
        <li className="nav-item">
          <Link className="btn btn-outline-success my-2 my-sm-0" to="/login">
            Log In
          </Link>
        </li>
      );
    }
  };

  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/home">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {this.folowBtn()}
              {this.regButton()}
              {this.logButton()}
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <li className="nav-link">{this.state.user.email}</li>
            </form>
          </div>
        </nav>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/follows" component={Follows} />
        <Route path="/registration" component={Registration} />
        <Route path="/login" component={Login} />
      </Router>
    );
  }
}

export default Header;
