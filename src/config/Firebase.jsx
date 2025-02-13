// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import {
  getFirestore,
  getDocs,
  doc,
  getDoc,
  collection,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_storageBucket,
  appId: import.meta.env.VITE_storageBucket,
  measurementId: import.meta.env.VITE_storageBucket,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database
const database = getFirestore();
const employeesData = collection(database, "Employees");
const logsCollection = collection(database, "Logs");
const auth = getAuth(app);

// Set Persistence
setPersistence(auth, browserLocalPersistence).catch((error) =>
  console.error("Persistence error:", error)
);

export { auth, database, employeesData, logsCollection };

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

// Load Logs
export function loadLogs() {
  const data = [];

  return new Promise((resolve, reject) => {
    getDocs(logsCollection)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const logs = {
            ...doc.data(),
            id: doc.id,
          };

          data.push(logs);
        });

        resolve(data);
      })
      .catch((error) => {
        console.log("Error:", error);
        reject(error);
      });
  });
}
