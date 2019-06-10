import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Header from "./components/header";
import "@firebase/storage";

class App extends React.Component {
  render() {
    return (
 
      <div id="root">
        <Header />
      </div>
    );
  }
}

export default App;
