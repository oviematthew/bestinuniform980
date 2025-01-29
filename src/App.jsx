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
      <div className="flex flex-col items-center">
        <h1 className="text-[#0046be] font-bold mt-10 text-2xl">
          Best In Uniform
        </h1>
        <p className="mt-1 mb-5">
          Nominate who you think is living our values!
        </p>
      </div>

      {votingLive && (
        <div className="flex flex-col items-center">
          <Dropdown labelText={"Nominator"} placeHolder={"Who are you?"} />
          <Dropdown
            labelText={"Nominated"}
            placeHolder={"Who are you voting for?"}
          />
          <ButtonItem buttonText={"Vote Now"} />
        </div>
      )}
    </div>
  );
}

export default App;
