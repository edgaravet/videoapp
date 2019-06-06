import React from "react";
import "../App.css";
import Youtube from "./youtube";

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <center>
          <h1>Your Are Home</h1>
        </center>
         <Youtube />
      </div>
    );
  }
}

export default Home;
