import firebase  from 'firebase';
// Required for side-effects
const config = {
    apiKey: "AIzaSyDilhreq1DDM7nZqEkQP4RvsUFpfrsinTs",
    authDomain: "inven-com.firebaseapp.com",
    databaseURL: "https://inven-com.firebaseio.com",
    projectId: "inven-com",
    storageBucket: "",
    messagingSenderId: "377953388712",
    appId: "1:377953388712:web:8b7e3ad941872072"
};

firebase.initializeApp(config);

export const db = firebase.firestore() ;
export const firebaseAuth = firebase.auth;
export const fireauth = firebase.auth();