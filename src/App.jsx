import { useState, useRef, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Dropdown from "./components/Dropdown";
import ButtonItem from "./components/ButtonItem";

// Check if voting is live from database
// useEffect(() => {
//   function checkVoting() {}
// }, []);

function App() {
  const [votingLive, setVotingLive] = useState(true);

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div class="flex justify-between lg:ml-10 mt-6">
        <div class=" w-[100%] lg:w-[50%] place-content-center">
          <div className="flex flex-col">
            <h1 className="text-[#0046be] font-bold mt-10 text-4xl">
              Best In Uniform
            </h1>
            <p className="mt-1 mb-5">
              Nominate who you think is living our values!
            </p>
          </div>

          {/* If Voting Is Live */}
          {votingLive && (
            <div className="flex flex-col">
              <Dropdown labelText={"Nominator"} placeHolder={"Who are you?"} />
              <Dropdown
                labelText={"Nominated"}
                placeHolder={"Who are you voting for?"}
              />
              <ButtonItem buttonText={"Vote Now"} />
            </div>
          )}
        </div>
        <div class="lg:w-[50%] hidden lg:block">
          <img
            class="flex justify-center align-middle"
            src="src/assets/bgImage.JPG"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
