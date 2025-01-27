import { useState } from "react";
import "./App.css";
import Dropdown from "./components/dropdown";

function App() {
  return (
    <>
      <h1>Hello</h1>
      <Dropdown labelText={"Voter's Name?"} />
      <Dropdown labelText={"Who are you Voting For?"} />
    </>
  );
}

export default App;
