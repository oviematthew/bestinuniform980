import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Dropdown from "./components/Dropdown";
import ButtonItem from "./components/ButtonItem";
import Checkboxes from "./components/Checkboxes";
import DatePickerItem from "./components/DatePickerItem";
import TextInput from "./components/TextInput";
import Success from "./components/Success";

function App() {
  const [nominator, setNominator] = useState(null);
  const [nominated, setNominated] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentDate, setCurrentDate] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [votingLive, setVotingLive] = useState(true);

  const isSelfVoting = nominator && nominated && nominator.id === nominated.id;

  // Form Validation
  function handleVoting() {
    if (!nominator && !nominated) {
      setErrorMessage("Please select both a Nominator and a Nominee.");
      return;
    }
    if (!nominator) {
      setErrorMessage("Please select a Nominator.");
      return;
    }
    if (!nominated) {
      setErrorMessage("Please select a Nominee.");
      return;
    }
    if (textValue === "") {
      setErrorMessage("Please fill a reason for Nomination.");
      return;
    }

    if (!currentDate) {
      setErrorMessage("Please select a date.");
      return;
    }

    // Hide Voting Screen
    setVotingLive(false);

    // Log data to backend
    logData();

    // Clear the error if everything is filled
    setErrorMessage("");
    alert(
      `Vote submitted!\nNominator: ${nominator.fullName}\nNominated: ${nominated.fullName} taking you home in 3 seconds`
    );

    setVotingLive(false);

    // Refresh after 5 seconds
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }

  function logData() {
    const formattedDate = currentDate
      ? currentDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "No date selected";

    alert(
      `${nominator.fullName} voted for ${nominated.fullName} on ${formattedDate} Reason: ${textValue}`
    );
  }

  return (
    <div className="h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="flex justify-between lg:ml-10 ">
        {/* Voting Screen */}
        {votingLive && (
          <div className="w-[100%]  place-content-center">
            <div className="flex flex-col">
              <h1 className="text-[#0046be] font-bold mt-8 text-4xl">
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
              <p className="mt-5 font-bold text-sm ">Reason For Nomination</p>
              <TextInput
                value={textValue}
                onChange={setTextValue}
                placeholder={
                  nominated
                    ? `Why did you nominate ${nominated.fullName}?`
                    : "Reason for Nomination?"
                }
              />

              {/* Values */}
              <p className="mt-3 mb-2 font-bold text-sm">Best Buy Values</p>
              <Checkboxes labelText={"Learning from challenge and change"} />
              <Checkboxes labelText={"Unleash the power of our people"} />
              <Checkboxes
                labelText={"Showing respect humility and integrity"}
              />
              <Checkboxes labelText={"Having fun while being the best"} />

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

        {/* <div className="hidden lg:w-[50%]  lg:flex lg:items-center lg:justify-center">
          <img
            className="w-[80%]"
            src="src/assets/bgImage.JPG"
            alt="Background"
          />
        </div> */}
      </div>
    </div>
  );
}

export default App;
