import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD7h7GAnA0fVmSm9uOG7cPI-M094DYiRZ4",
    authDomain: "newvideos-37721.firebaseapp.com",
    databaseURL: "https://newvideos-37721.firebaseio.com",
    projectId: "newvideos-37721",
    storageBucket: "newvideos-37721.appspot.com",
    messagingSenderId: "115823345180",
    appId: "1:115823345180:web:0525f7ba1c244267"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
 