import React from "react";
import "../App.css";
import Youtube from "./youtube";
class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
          <Youtube  />
      </div>
    );
  }
}

export default Home;
