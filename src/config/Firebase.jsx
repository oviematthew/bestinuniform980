// Import Firebase SDKs
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

// Log environment variables (debugging)
console.log("Firebase Config:", {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
});

// Firebase Config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (FIXED)
const database = getFirestore(app);

// Initialize Firebase Auth
const auth = getAuth(app);

// Set Persistence
setPersistence(auth, browserLocalPersistence).catch((error) =>
  console.error("Persistence error:", error)
);

// Firestore Collections
const employeesData = collection(database, "Employees");
const logsCollection = collection(database, "Logs");

// Load Employees
export function loadEmployees() {
  return new Promise((resolve, reject) => {
    getDocs(employeesData)
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
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
  return new Promise((resolve, reject) => {
    getDocs(logsCollection)
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        resolve(data);
      })
      .catch((error) => {
        console.log("Error:", error);
        reject(error);
      });
  });
}

// Export variables
export { auth, database, employeesData, logsCollection };
