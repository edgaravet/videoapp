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
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: " " });
        localStorage.removeItem("user");
      }
    });
  }

  logout = e => {
    e.preventDefault();
    fire
      .auth()
      .signOut()
      .catch(function(err) {
        // Handle errors
        this.logButton();
      });
  };

  logButton = e => {        
    if (this.state.user.email != null) {
      return (
        <a
          onClick={this.logout.bind(this)}
          type="button"
          className="registerbtn"
        >
          Logout
        </a>
      );
    } else {
      return (
        
        <Link className="registerbtn" to="/login">
          Log In
        </Link>
      
      )
    }
  }
  

  render() {
    return (
      <Router>
        <div className="header">
          <ul>
            <li>
              <Link className="registerbtn" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="registerbtn" to="/registration">
                Registration
              </Link>
            </li>
            <li>
              <Link className="registerbtn" to="/follows">
                Follows
              </Link>
            </li>
            <li>{this.logButton()}</li>

            <li>{this.state.user.email}</li>
          </ul>

          <div align="right" className="search">
            <input />
            <button type="submit">search</button>
          </div>

          <Route exact path="/" component={Home} />
          <Route path="/registration" component={Registration} />
          <Route path="/follows" component={Follows} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default Header;
