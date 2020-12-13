import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC8TYKCxB9byj7KVH1FqZ1Hib0NV-YclZY",
  authDomain: "robinhood-clone-937dc.firebaseapp.com",
  projectId: "robinhood-clone-937dc",
  storageBucket: "robinhood-clone-937dc.appspot.com",
  messagingSenderId: "1883631867",
  appId: "1:1883631867:web:c39f38d16047a15a6b805e",
  measurementId: "G-NX51S2KJ0N",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };
