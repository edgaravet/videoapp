import React from "react";
import fire from "./config";
import Spinner from "./loader";
import "../styles/header.css";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      user: {},
      confirm_password: "",
      message: "",
      loading: false
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /* --------------- Registration function  ------------------   */

  registr(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });

    if (this.state.password !== this.state.confirm_password) {
      this.setState({
        message: "Password not corect, Please confirm Password!",
        loading: !true
      });
    } else {
      fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(u => {
          this.setState({ user: u, loading: !true });
          localStorage.setItem("user_login", u.email);
          window.location.href = "/home";
        })
        .catch(error => {
          this.setState({ message: error.message, loading: !true });
        });
    }
  }

  render() {
    if (localStorage.getItem("user_login")) {
      window.location.href = "/home";
    }
    return (
      <div className="container">
        <div className="form_group">
          <h1>Registration</h1>
          <form>
            <label className="errorLable">{this.state.message}</label>
            <input
              onChange={this.handleChange.bind(this)}
              value={this.state.email}
              type="text"
              placeholder="Enter Email"
              name="email"
              required
            />

            <input
              onChange={this.handleChange.bind(this)}
              value={this.state.password}
              type="password"
              placeholder="Enter Password"
              name="password"
              required
            />

            <input
              onChange={this.handleChange.bind(this)}
              value={this.state.confirm_password}
              type="password"
              placeholder="Repeat Password"
              name="confirm_password"
              required
            />

            <button
              onClick={this.registr.bind(this)}
              type="button"
              className="registerbtn"
            >
              Register
              {this.state.loading && <Spinner />}
            </button>
          </form>
          
        </div>
      </div>
    );
  }
}

export default Registration;
