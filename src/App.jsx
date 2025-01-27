import { useState } from "react";
import "./App.css";
import Dropdown from "./components/dropdown";

const people = [
  { id: 1, name: "Tom Cook" },
  { id: 2, name: "Wade Cooper" },
  { id: 3, name: "Tanya Fox" },
  { id: 4, name: "Arlene Mccoy" },
  { id: 5, name: "Devon Webb" },
];

function App() {
  return (
    <>
      <h1>Hello</h1>
      <Dropdown />;
    </>
  );
}

export default App;
