import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../config/Firebase";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Results() {
  const [employees, setEmployees] = useState([]);

  // Fetch employee votes in real-time
  useEffect(() => {
    const employeesRef = collection(database, "Employees");

    const unsubscribe = onSnapshot(employeesRef, (snapshot) => {
      const employeesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmployees(employeesData);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  //Filter Employees to show those above 0
  const filteredEmployees = employees.filter((emp) => emp.voteCount > 0);

  //Prepare chart data
  const chartData = {
    labels: filteredEmployees.map((emp) => emp.fullName), // Employee names
    datasets: [
      {
        label: "Votes",
        data: filteredEmployees.map((emp) => emp.voteCount || 0), // Vote counts
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue color
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  //Chart options
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Ensure whole numbers
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Best In Uniform Results</h1>
      <div className="w-full max-w-2xl">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
