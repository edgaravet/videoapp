import React from "react";
import "../App.css";
import fire from "./config";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirm_password: ""
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  registr(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="form_group">
          <form>
            <label>
              <b>Email</b>
            </label>
            <input
              onChange={this.handleChange.bind(this)}
              value={this.state.email}
              type="text"
              placeholder="Enter Email"
              name="email"
              required
            />

            <label>
              <b>Password</b>
            </label>
            <input
              onChange={this.handleChange.bind(this)}
              value={this.state.password}
              type="password"
              placeholder="Enter Password"
              name="password"
              required
            />

            <label>
              <b>Repeat Password</b>
            </label>
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
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Registration;
