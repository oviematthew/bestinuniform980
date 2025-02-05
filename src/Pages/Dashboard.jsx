import { auth } from "../config/Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const date = new Date();
  let hour = date.getHours();
  const navigate = useNavigate();

  function checkTime() {
    if (hour <= 0 && hour >= 11) {
      setMessage("Morning");
    } else if (hour <= 12 && hour >= 16) {
      setMessage("Afternoon");
    } else setMessage("Evening");
  }

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
