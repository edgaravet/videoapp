import React from "react";
import "./App.css";
import Header from "./components/header";
import fire from "./components/firebase";
import firebase from "@firebase/app";
import "@firebase/storage";

// import Registration from "./components/registration";
import Home from "./components/home";
import Registration from "./components/registration";
const storage = firebase.storage();
console.log("storage", storage);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.authListener();
  }
  authListener() {
    fire.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({ user });
        //localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        //localStorage.removeItem("user");
      }
    });
  }

  render() {
    return (
      <div className="App">
        
        <Header />
      </div>
    );
  }
}

export default App;
