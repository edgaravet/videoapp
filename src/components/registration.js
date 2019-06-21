import React from "react";
import "../App.css";
import fire from "./config";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm_password: "",
      message: ""
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  registr(e) {
   if(this.state.password !== this.state.confirm_password){
     this.setState({message: "Password not corect, Please confirm Password!"})
   }else{
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        this.props.history.push("/home");
      })
      .catch(error => {
        this.setState({message:error.message})
      });
    }
  }

  render() {
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
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Registration;
