import { auth } from "../config/Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { database, employeesData, loadEmployees } from "../config/Firebase";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Dropdown from "../components/Dropdown";
import TextInput from "../components/TextInput";
import ButtonItem from "../components/ButtonItem";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [employee, setEmployee] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

      // Message on screen
      setResetMessage("All votes have been reset to 0");
    } catch (error) {
      // Message on screen;
      setResetMessage("Failed to reset votes. Please try again.");
    }
  }

  async function removeEmployee() {
    if (!employee) {
      setErrorMessage("Please select an employee to remove.");
      return;
    }

    // Show confirmation alert
    const confirmDelete = window.confirm(
      `Are you sure you want to remove ${employee.fullName}?`
    );

    if (!confirmDelete) {
      return; // Exit if user cancels
    }

    try {
      // Reference the employee document by ID
      const employeeRef = doc(database, "Employees", employee.id);

      // Delete from Firestore
      await deleteDoc(employeeRef);

      // Show success message
      alert("Employee removed successfully.");

      // Refresh after 1 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error removing employee:", error);
      alert("Failed to remove employee.");
    }
  }

  // Add Employee
  async function handleAddEmployee() {
    if (!firstName.trim()) {
      setErrorMessage("Please fill in First Name");
      return;
    }

    if (!lastName.trim()) {
      setErrorMessage("Please fill in Last Name");
      return;
    }

    try {
      const newEmployeeRef = await addDoc(employeesData, {
        fullName: `${firstName} ${lastName}`,
        voteCount: 0, // No need to manually set an ID before it's created
      });

      // Update Firestore to store the generated ID
      await updateDoc(newEmployeeRef, { id: newEmployeeRef.id });

      // Show success
      alert(`Employee: ${firstName} ${lastName} added Successfully`);

      // Refresh after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setErrorMessage("Error adding employee: " + error.message);
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
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-[#0046be] font-bold mt-5 text-2xl">
          Good {message}!
        </h1>

        {/* Logout */}
        <ButtonItem onClick={handleLogout} buttonText="Sign Out" />
      </div>
      <hr />

      {/* Add Employee */}
      <div>
        <h2 className="text-xl text-black font-bold mt-5  mb-3 ">
          Add Employee
        </h2>
        <TextInput
          ariaLabel="Employee First Name"
          value={firstName}
          onChange={setFirstName}
          placeholder={"First Name"}
        />

        <TextInput
          ariaLabel="Employee First Name"
          value={lastName}
          onChange={setLastName}
          placeholder={"Last Name"}
        />

        <ButtonItem onClick={handleAddEmployee} buttonText="Add Employee" />

        {errorMessage && (
          <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
        )}
      </div>

      {/* Remove */}
      <div className="my-7">
        <h2 className="text-xl text-black font-bold mt-3 ">Remove Employee</h2>
        <Dropdown placeHolder="Start typing" setSelected={setEmployee} />

        <ButtonItem onClick={removeEmployee} buttonText="Remove Employee" />
      </div>

      {/* Reset Votes Button */}

      <div>
        <h2 className="text-xl text-black font-bold mt-3 ">Reset Votes</h2>
        <ButtonItem onClick={openModal} buttonText="Reset Votes" />

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
              className="w-full max-w-md rounded-xl bg-blue-600 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-bold text-white">
                Reset Votes
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white">
                Are you sure you want to reset Votes?
              </p>
              <div className=" flex gap-3 mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-white py-1.5 px-5 text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-black data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-white-700"
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
