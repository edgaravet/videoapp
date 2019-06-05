import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAwTnPvjpnUiWEqJRcYLF7gih_O9RXX7PY",
  authDomain: "movieapp-cd6cb.firebaseapp.com",
  databaseURL: "https://movieapp-cd6cb.firebaseio.com",
  projectId: "movieapp-cd6cb",
  storageBucket: "movieapp-cd6cb.appspot.com",
  messagingSenderId: "254173745131",
  appId: "1:254173745131:web:fb7fbe720a04e0b3"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
