//import Firebase from 'firebase';
import * as firebase from 'firebase';
require('firebase/auth');
require('firebase/database');

const firebaseConfig = {
    apiKey: "AIzaSyAl3janpaqyePEiWsPpuzHTGHrjbO4v9Jc",
    authDomain: "f1ml-c8d00.firebaseapp.com",
    projectId: "f1ml-c8d00",
    storageBucket: "f1ml-c8d00.appspot.com",
    messagingSenderId: "942619067176",
    databaseURL: 'f1ml-c8d00-default-rtdb.firebaseio.com/',
    appId: "1:942619067176:web:1668f29d88ed430c63461d",
    measurementId: "G-L6951NBWY0"
  };

Firebase = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
export default Firebase;