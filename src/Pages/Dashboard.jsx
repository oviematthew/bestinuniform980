import { auth } from "../config/Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { database } from "../config/Firebase";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Dropdown from "../components/Dropdown";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [employee, setEmployee] = useState(null);
  const [resetMessage, setResetMessage] = useState("");
  let [isOpen, setIsOpen] = useState(false);

  const date = new Date();
  let hour = date.getHours();
  const navigate = useNavigate();

  useEffect(() => {
    checkTime();
  }, []);

  useEffect(() => {
    // If resetMessage is not empty, start the interval to clear it after 3 seconds
    if (resetMessage) {
      const interval = setInterval(() => {
        setResetMessage(""); // Clear the message after 3 seconds
      }, 3000);

      // Clean up the interval when component is unmounted or when resetMessage changes
      return () => clearInterval(interval);
    }
  }, [resetMessage]); // Run the effect only when resetMessage changes

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
      setResetMessage("All votes have been reset to 0");
    } catch (error) {
      console.error("Error resetting votes:", error);
      setResetMessage("Failed to reset votes. Please try again.");
    }
  }

  async function removeEmployee() {
    try {
      // Get all employee documents
      const employeesRef = collection(database, "Employees");
      const snapshot = await getDocs(employeesRef);
    } catch (error) {
      console.error("Error removing employee:", error);
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function affirmReset() {
    resetVotes();
    setIsOpen(false);
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
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-[#0046be] font-bold mt-5 text-2xl">
          Hi, Good {message}
        </h1>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-[#0046be] text-white px-4 py-2 mt-4 rounded"
        >
          Logout
        </button>
      </div>

      {/* Quick Actions */}
      <p className="mt-3  font-bold text-lg">Quick Actions</p>
      <p className="mt-3  font-bold text-lg">Add Employee</p>

      {/* Remove */}
      <div className="my-5">
        <Dropdown
          labelText="Remove Employee"
          placeHolder="Start typing"
          setSelected={setEmployee}
        />

        <button
          onClick={removeEmployee}
          className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
        >
          Remove Employee
        </button>
      </div>

      {/* Reset Votes Button */}

      <div>
        <button
          onClick={openModal}
          className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
        >
          Reset Votes
        </button>

        {resetMessage && (
          <p className="text-red-500 mt-2 text-sm">{resetMessage}</p>
        )}
      </div>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-[#0046be] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-bold text-white">
                Reset Votes
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white">
                Are you sure you want to reset Votes?
              </p>
              <div className=" flex gap-3 mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-white py-1.5 px-5 text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-slate-500 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-white-700"
                  onClick={closeModal}
                >
                  Nope
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-500 py-1.5 px-5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-700  data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={affirmReset}
                >
                  Yep
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
