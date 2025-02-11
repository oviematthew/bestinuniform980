import { useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { database, employeesData } from "../config/Firebase";
import Dropdown from "../components/Dropdown";
import TextInput from "../components/TextInput";
import ButtonItem from "../components/ButtonItem";
import UserHeader from "../components/UserHeader";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [employee, setEmployee] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorRemovalMessage, setErrorRemovalMessage] = useState("");
  const [successRemovalMessage, setSuccessRemovalMessage] = useState("");
  const [successAddMessage, setSuccessAddMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  async function resetVotes() {
    // Show confirmation alert
    const confirmDelete = window.confirm(
      `Are you sure you want to reset votes?`
    );

    if (!confirmDelete) {
      return; // Exit if user cancels
    }

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
      // Show success
      alert(`Votes successfully reset`);
    } catch (error) {
      // Message on screen;
      alert("Failed to reset votes. Please try again.");
    }
  }

  async function removeEmployee() {
    if (!employee) {
      setErrorRemovalMessage("Please select an employee to remove.");
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
      setSuccessRemovalMessage(`${employee.fullName} removed successfully`);

      // Refresh after 2 seconds
      setTimeout(() => {
        navigate(0);
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

    // Show confirmation alert
    const confirmAdd = window.confirm(
      `Are you sure you want to add ${firstName} ${lastName}?`
    );

    if (!confirmAdd) {
      return; // Exit if user cancels
    }

    try {
      const newEmployeeRef = await addDoc(employeesData, {
        fullName: `${firstName} ${lastName}`,
        voteCount: 0, // No need to manually set an ID before it's created
      });

      // Update Firestore to store the generated ID
      await updateDoc(newEmployeeRef, { id: newEmployeeRef.id });

      // Show success
      setSuccessAddMessage(
        `Employee: ${firstName} ${lastName} added Successfully`
      );

      // Refresh after 2 seconds
      setTimeout(() => {
        navigate(0);
      }, 2000);
    } catch (error) {
      setErrorMessage("Error adding employee: " + error.message);
    }
  }

  return (
    <div className="flex flex-col">
      <UserHeader />
      {/* Add Employee */}
      <div>
        <h2 className="text-m text-black font-bold mt-7  mb-3 ">
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

        {successAddMessage && (
          <p className="text-green-500 mt-2 text-sm">{successAddMessage}</p>
        )}
      </div>

      {/* Remove */}
      <div className="my-7">
        <h2 className="text-m text-black font-bold mt-3 ">Remove Employee</h2>
        <Dropdown placeHolder="Start typing" setSelected={setEmployee} />

        <ButtonItem onClick={removeEmployee} buttonText="Remove Employee" />

        {errorRemovalMessage && (
          <p className="text-red-500 mt-2 text-sm">{errorRemovalMessage}</p>
        )}

        {successRemovalMessage && (
          <p className="text-green-500 mt-2 text-sm">{successRemovalMessage}</p>
        )}
      </div>

      {/* Reset Votes Button */}

      <div>
        <h2 className="text-m text-black font-bold mt-3 ">Reset Votes</h2>
        <ButtonItem onClick={resetVotes} buttonText="Reset Votes" />
      </div>
    </div>
  );
}
