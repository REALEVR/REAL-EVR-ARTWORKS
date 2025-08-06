// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRIl0ATDL3eN1-fteya4nbv8RLEAdgm1o",
  authDomain: "artworks-422fa.firebaseapp.com",
  databaseURL: "https://artworks-422fa-default-rtdb.firebaseio.com",
  projectId: "artworks-422fa",
  storageBucket: "artworks-422fa.firebasestorage.app",
  messagingSenderId: "401262057267",
  appId: "1:401262057267:web:5f26a73d81fe9b53531046",
  measurementId: "G-5W9XRXM80N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);