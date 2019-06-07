import React from "react";
import "../App.css";
import Youtube from "./youtube";
import Header from "./header";

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <center>
          <h1>Hello  </h1>
        </center>
        <Youtube />
      </div>
    );
  }
}

export default Home;
