// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfxhNs5O2YaQRL88r-4SVbDet--dsrZBI",
  authDomain: "express-mongodb-94087.firebaseapp.com",
  projectId: "express-mongodb-94087",
  storageBucket: "express-mongodb-94087.firebasestorage.app",
  messagingSenderId: "962679373887",
  appId: "1:962679373887:web:6a13af5c0c065dc350f88a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
