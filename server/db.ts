// Firebase Firestore migration
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebase";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);