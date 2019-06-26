import React from "react";
import "../App.css";
import Youtube from "./youtube";
import FooterPage from "./footer";


class Home extends React.Component {
  render() {
    return (
      <>
        <div className="container">
          <Youtube />
        </div>

        <FooterPage />
       
          
      </>
    );
  }
}

export default Home;
