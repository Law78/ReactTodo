import firebase from 'firebase';

try {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDhee-7D2NzSwkHe2W-APssSyr_CufO6hY",
    authDomain: "mead-todo-app-f33bb.firebaseapp.com",
    databaseURL: "https://mead-todo-app-f33bb.firebaseio.com",
    storageBucket: "mead-todo-app-f33bb.appspot.com",
    messagingSenderId: "740474476112"
  };
  firebase.initializeApp(config);
} catch(e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;