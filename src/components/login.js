import React from "react";
import fire from "./config";
import Spinner from "./loader";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user: {},
      message: null,
      loading: false
    };
  }

  regist = () => {
    window.location.href = "/registration";
  };
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  signIn = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });

    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        localStorage.setItem("user_login", u.email);
        window.location.href = "/home";
      })
      .catch(error => {
        this.setState({
          message: error.message,
          loading: false
        });
        console.log(error);
      });
  };

  render() {
    if (localStorage.getItem("user_login")) {
      window.location.href = "/home";
    }
    return (
      <div className="container">
        <div className="form_group">
          <h1>Log In</h1>
          <form>
            <label className="errorLable">{this.state.message}</label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              onChange={this.handleChange.bind(this)}
              value={this.state.email}
            />

            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={this.handleChange.bind(this)}
              value={this.state.password}
            />
            <div className="row">
              <div className="btn-group col-12">
                <button
                  onClick={this.signIn.bind(this)}
                  type="button"
                  className="registerbtn"
                >
                  {this.state.loading && <Spinner />}
                  Log In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
