import React from "react";
import "../App.css";

class Registration extends React.Component {
  render() {
    return (
      <div className="container">
        <form>
          <label for="email">
            <b>Email</b>
          </label>
          <input type="text" placeholder="Enter Email" name="email" required />

          <label for="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
          />

          <label for="psw-repeat">
            <b>Repeat Password</b>
          </label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="psw-repeat"
            required
          />
          <hr />

          <p>
            By creating an account you agree to our <a>Terms & Privacy</a>.
          </p>
          <button type="submit" class="registerbtn">
            Register
          </button>

          <div className="container signin">
            <p>
              Already have an account? <a>Sign in</a>.
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default Registration;
