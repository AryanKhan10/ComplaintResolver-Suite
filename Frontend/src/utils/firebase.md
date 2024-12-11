// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics  } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQyyk-DDZv-xXs_3SnslMGZPVinQIdLJY",
  authDomain: "complaints-managment-system.firebaseapp.com",
  projectId: "complaints-managment-system",
  storageBucket: "complaints-managment-system.firebasestorage.app",
  messagingSenderId: "331573512527",
  appId: "1:331573512527:web:0e5bdcea8f8fe052879d3a",
  measurementId: "G-06VMTQ6GB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth(); // Initialize Firebase Authentication

export { app, auth }; // Export the initialized app and auth instance
