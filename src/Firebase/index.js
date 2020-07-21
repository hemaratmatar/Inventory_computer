import firebaseA  from 'firebase';
// Required for side-effects
const config = {
    apiKey: "AIzaSyDilhreq1DDM7nZqEkQP4RvsUFpfrsinTs",
    authDomain: "inven-com.firebaseapp.com",
    databaseURL: "https://inven-com.firebaseio.com",
    projectId: "inven-com",
    storageBucket: "inven-com.appspot.com",
    messagingSenderId: "377953388712",
    appId: "1:377953388712:web:8b7e3ad941872072"};

firebaseA.initializeApp(config);

export const db = firebaseA.firestore() ;
export const firebaseAuth = firebaseA.auth;
export const fireauth = firebaseA.auth();
export const storage = firebaseA.storage();