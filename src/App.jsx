import { useState, useRef, useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Dropdown from "./components/dropdown";

// Check if voting is live from database
// useEffect(() => {
//   function checkVoting() {}
// }, []);

function App() {
  const [votingLive, setVotingLive] = useState(true);

  return (
    <div className="rootDiv">
      <Navbar />
      {votingLive && (
        <div>
          <h1 class="header-text">Best In Uniform</h1>
          <Dropdown labelText={"Voter's Name?"} />
          <Dropdown labelText={"Who are you Voting For?"} />
        </div>
      )}
    </div>
  );
}

export default App;
