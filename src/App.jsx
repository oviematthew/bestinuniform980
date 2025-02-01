import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Dropdown from "./components/Dropdown";
import ButtonItem from "./components/ButtonItem";
import Checkboxes from "./components/Checkboxes";
import DatePickerItem from "./components/DatePickerItem";

function App() {
  const [nominator, setNominator] = useState(null);
  const [nominated, setNominated] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [currentDate, setCurrentDate] = useState(null);

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

    if (!currentDate) {
      setErrorMessage("Please select a date.");
      return;
    }

    // Clear the error if everything is filled
    setErrorMessage("");
    alert(
      `Vote submitted!\nNominator: ${nominator.fullName}\nNominated: ${nominated.fullName}`
    );

    logData();
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
      `${nominator.fullName} voted for ${nominated.fullName} on ${formattedDate}`
    );
  }

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="flex justify-between lg:ml-10 mt-6">
        <div className="w-[100%] lg:w-[50%] place-content-center">
          <div className="flex flex-col">
            <h1 className="text-[#0046be] font-bold mt-10 text-4xl">
              Best In Uniform (980)
            </h1>
            <p className="mt-1 mb-5">
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

            {/* Values */}
            <p className="mt-5 mb-2 font-bold ">Best Buy Values</p>
            <Checkboxes labelText={"Having fun while being the best \n "} />
            <Checkboxes labelText={"Unleash the power of our people"} />
            <Checkboxes labelText={"Learning from challenge and change"} />
            <Checkboxes labelText={"Showing respect humility and integrity"} />

            {/* Date */}
            <p className="mt-5 mb-2 font-bold ">Date</p>
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
        <div className="lg:w-[50%] hidden lg:block">
          <img
            className="flex justify-center align-middle"
            src="src/assets/bgImage.JPG"
            alt="Background"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
