import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Dropdown from "./components/Dropdown";
import ButtonItem from "./components/ButtonItem";

function App() {
  const [nominator, setNominator] = useState(null);
  const [nominated, setNominated] = useState(null);

  const isSelfVoting = nominator && nominated && nominator.id === nominated.id;

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="flex justify-between lg:ml-10 mt-6">
        <div className="w-[100%] lg:w-[50%] place-content-center">
          <div className="flex flex-col">
            <h1 className="text-[#0046be] font-bold mt-10 text-4xl">
              Best In Uniform
            </h1>
            <p className="mt-1 mb-5">
              Nominate who you think is living our values!
            </p>
          </div>

          {/* If Voting Is Live */}

          <div className="flex flex-col">
            <Dropdown
              labelText="Nominator"
              placeHolder="Who are you?"
              setSelected={setNominator} // Pass setter function
            />
            <Dropdown
              labelText="Nominated"
              placeHolder="Who are you voting for?"
              setSelected={setNominated} // Pass setter function
            />
            {!isSelfVoting && (
              <ButtonItem buttonText="Vote Now" disabled={isSelfVoting} />
            )}

            {isSelfVoting && (
              <p className="text-red-500 mt-2 text-sm">
                You cannot vote for yourself!
              </p>
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
