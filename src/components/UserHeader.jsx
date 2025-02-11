import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ButtonItem from "./ButtonItem";

export default function Navbar() {
  const [message, setMessage] = useState("");
  const date = new Date();
  let hour = date.getHours();
  const navigate = useNavigate();

  useEffect(() => {
    checkTime();
  }, []);

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
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-[#0046be] font-bold mt-5 text-2xl">
          Good {message}!
        </h1>

        {/* Logout */}
        <ButtonItem onClick={handleLogout} buttonText="Sign Out" />
      </div>
      <hr />
    </div>
  );
}
