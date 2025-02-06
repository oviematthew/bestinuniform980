import { auth } from "../config/Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { database } from "../config/Firebase";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const date = new Date();
  let hour = date.getHours();
  const navigate = useNavigate();

  useEffect(() => {
    checkTime();
  }, []);

  async function resetVotes() {
    try {
      // Get all employee documents
      const employeesRef = collection(database, "Employees");
      const snapshot = await getDocs(employeesRef);

      // Loop through all employees and reset their voteCount to 0
      snapshot.forEach(async (docSnapshot) => {
        const nomineeRef = doc(database, "Employees", docSnapshot.id);

        // Update voteCount to 0
        await updateDoc(nomineeRef, {
          voteCount: 0,
        });
      });

      console.log("All votes have been reset to 0");
      alert("All votes have been reset to 0");
    } catch (error) {
      console.error("Error resetting votes:", error);
      alert("Failed to reset votes. Please try again.");
    }
  }

  function checkTime() {
    if (hour >= 0 && hour < 12) {
      setMessage("Morning");
    } else if (hour >= 12 && hour < 17) {
      setMessage("Afternoon");
    } else {
      setMessage("Evening");
    }
  }

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Hi Good {message}</h1>

      {/* Reset Votes Button */}
      <button
        onClick={resetVotes}
        className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded"
      >
        Reset Votes
      </button>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
