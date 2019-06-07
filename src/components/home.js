import React from "react";
import "../App.css";
import Youtube from "./youtube";

class Home extends React.Component {
 
  render() {
    return (
      <div className="container">
        <div className="row">
          <Youtube />
        </div>
      </div>
    );
  }
}

export default Home;
