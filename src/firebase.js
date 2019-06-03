import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

firebase.initializeApp({
  apiKey: "AIzaSyBSnHfLEo_hfG5xtYYmT_tNZU4kRFYqF1I",
  authDomain: "scriptist-pack-man.firebaseapp.com",
  databaseURL: "https://scriptist-pack-man.firebaseio.com",
  projectId: "scriptist-pack-man",
  storageBucket: "scriptist-pack-man.appspot.com",
  messagingSenderId: "116624479997",
  appId: "1:116624479997:web:c2311f4237e06371"
});

export default firebase;
