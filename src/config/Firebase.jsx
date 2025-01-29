// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "bestinuniform-25b8f.firebaseapp.com",
  projectId: "bestinuniform-25b8f",
  storageBucket: "bestinuniform-25b8f.firebasestorage.app",
  messagingSenderId: "691883010958",
  appId: "1:691883010958:web:a2ecdd51032a07753dd2df",
  measurementId: "G-9VRPDSLKZ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
