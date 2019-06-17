import React from "react";
import fire from "./config";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: null
    };
  }

  regist(e) {
    this.props.history.push("/registration");
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  sign = e => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        this.props.history.push("/home");
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="form_group">
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
                  onClick={this.sign.bind(this)}
                  type="button"
                  className="registerbtn"
                >
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
