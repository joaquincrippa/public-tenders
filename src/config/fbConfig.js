import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Replace this with your own config details
var config = {
    apiKey: "AIzaSyBmXDqBtobuUf-p0fDqvUNTZe4Nm6wkUZk",
    authDomain: "monte-vera-public-tenders-dev.firebaseapp.com",
    databaseURL: "https://monte-vera-public-tenders-dev.firebaseio.com",
    projectId: "monte-vera-public-tenders-dev",
    storageBucket: "monte-vera-public-tenders-dev.appspot.com",
    messagingSenderId: "201471514925"
};
firebase.initializeApp(config);
firebase.firestore().settings({});

const storage = firebase.storage();

export {
    storage,
    firebase as default
}