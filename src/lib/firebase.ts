import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "migrateq-6vmkr",
  "appId": "1:95431815220:web:2da9abd6d258c6acdd9a61",
  "storageBucket": "migrateq-6vmkr.firebasestorage.app",
  "apiKey": "AIzaSyCYCmFWF_JdxDA9-pwDcxSwcyhHv20xP88",
  "authDomain": "migrateq-6vmkr.firebaseapp.com",
  "messagingSenderId": "95431815220"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
