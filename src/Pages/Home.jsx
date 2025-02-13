import { useState } from "react";
import "../App.css";
import Dropdown from "../components/Dropdown";
import ButtonItem from "../components/ButtonItem";
import Checkboxes from "../components/Checkboxes";
import DatePickerItem from "../components/DatePickerItem";
import TextInput from "../components/TextInput";
import Success from "../components/Success";
import { doc, addDoc, updateDoc, increment } from "firebase/firestore";
import { database, logsCollection } from "../config/Firebase";

export default function Home() {
  const [nominator, setNominator] = useState(null);
  const [nominated, setNominated] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentDate, setCurrentDate] = useState(null);
  const [reason, setReason] = useState("");
  const [votingLive, setVotingLive] = useState(true);

  const isSelfVoting = nominator && nominated && nominator.id === nominated.id;

  // Form Validation
  async function handleVoting() {
    if (!nominator || !nominated) {
      setErrorMessage("Please select both a Nominator and a Nominee.");
      return;
    }
    if (!reason.trim()) {
      setErrorMessage("Please fill a reason for Nomination.");
      return;
    }
    if (!currentDate) {
      setErrorMessage("Please select a date.");
      return;
    }

    try {
      // Reference to the nominee's document
      const nomineeRef = doc(database, "Employees", nominated.id);

      // Increment vote count by 1
      await updateDoc(nomineeRef, {
        voteCount: increment(1),
      });

      // Hide Voting Screen
      setVotingLive(false);

      // clear fields
      setReason("");
      setCurrentDate(null);

      // Log data to backend
      await logData();

      // Clear the error if everything is filled
      setErrorMessage("");

      // Refresh after 5 seconds
      setTimeout(() => {
        setVotingLive(true);
      }, 5000);
    } catch (error) {
      console.error("Error updating vote count:", error);
      setErrorMessage("Failed to submit vote. Please try again.");
    }
  }

  //Log Data
  async function logData() {
    const formattedDate = currentDate
      ? currentDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "No date selected";

    try {
      await addDoc(logsCollection, {
        nominatorName: nominator.fullName,
        nomineeName: nominated.fullName,
        date: formattedDate,
        nominatorReason: reason,
      });
    } catch (error) {
      setErrorMessage("Error adding vote log:", error);
    }
  }

  return (
    <div className="h-[100%]">
      {/* Hero Section */}
      <div className="flex justify-between lg:ml-10">
        {/* Voting Screen */}
        {votingLive && (
          <div className="w-[100%] place-content-center">
            <div className="flex flex-col">
              <h1 className="text-[#0046be] font-bold mt-5 text-3xl">
                Best In Uniform
              </h1>
              <p className="mt-1 mb-3">
                Nominate who you think is living our values!
              </p>
            </div>

            {/* Dropdown */}
            <div className="flex flex-col">
              <Dropdown
                labelText="Nominator *"
                placeHolder="Who are you?"
                setSelected={setNominator}
              />
              <Dropdown
                labelText="Nominated *"
                placeHolder="Who are you voting for?"
                setSelected={setNominated}
              />

              {/* Reason For Nomination */}
              <p className="mt-5 text-sm">Reason For Nomination</p>
              <TextInput
                ariaLabel="Reason for Nomination"
                value={reason}
                onChange={setReason}
                placeholder={
                  nominated
                    ? `Why did you nominate ${nominated.fullName}?`
                    : "Reason for Nomination?"
                }
              />

              {/* Values */}
              <p className="mt-3 mb-2 font-bold text-sm">Best Buy Values</p>
              <Checkboxes labelText="Learning from challenge and change" />
              <Checkboxes labelText="Unleash the power of our people" />
              <Checkboxes labelText="Showing respect, humility, and integrity" />
              <Checkboxes labelText="Having fun while being the best" />

              {/* Date */}
              <p className="mt-5 mb-2 font-bold text-sm">Date</p>
              <DatePickerItem
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
              />

              {/* Button */}
              {!isSelfVoting && (
                <ButtonItem onClick={handleVoting} buttonText="Vote Now" />
              )}

              {/* Error Messages */}
              {isSelfVoting && (
                <p className="text-red-500 mt-2 text-sm">
                  You cannot vote for yourself!
                </p>
              )}
              {errorMessage && (
                <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
              )}
            </div>
          </div>
        )}

        {/* Success Screen*/}
        {!votingLive && <Success />}
      </div>
    </div>
  );
}
