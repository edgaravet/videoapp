import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB82lsT-zn9_HoAxT_Gtp7ZGlj-XZuWEiw",
  authDomain: "vapp-5801f.firebaseapp.com",
  databaseURL: "https://vapp-5801f.firebaseio.com",
  projectId: "vapp-5801f",
  storageBucket: "vapp-5801f.appspot.com",
  messagingSenderId: "7035325070",
  appId: "1:7035325070:web:8762a415b1e92ca0"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
