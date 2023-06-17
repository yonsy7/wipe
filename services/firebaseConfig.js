// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth } from "firebase/auth";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnECb_WqmKMoZaZMNKUV92mCI55e2LgUA",
  authDomain: "fctbrief.firebaseapp.com",
  projectId: "fctbrief",
  storageBucket: "fctbrief.appspot.com",
  messagingSenderId: "316004327210",
  appId: "1:316004327210:web:edab488afe61881f9ac853"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const firestore = getFirestore(app)

export { firebase, auth, firestore };