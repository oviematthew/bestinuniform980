// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  getDocs,
  doc,
  getDoc,
  collection,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

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

// Initialize database
const database = getFirestore();
const employeesData = collection(database, "Employees");
const auth = getAuth(app);

export { auth, database, employeesData };

// Load Employees
export function loadEmployees() {
  const data = [];

  return new Promise((resolve, reject) => {
    getDocs(employeesData)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const employees = {
            ...doc.data(),
            id: doc.id,
          };

          data.push(employees);
        });

        resolve(data);
      })
      .catch((error) => {
        console.log("Error:", error);
        reject(error);
      });
  });
}
