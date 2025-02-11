import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { collection, onSnapshot } from "firebase/firestore";
import { database, loadLogs } from "../config/Firebase";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@heroui/react";
import UserHeader from "../components/UserHeader";

// Register required Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Results() {
  const [employees, setEmployees] = useState([]);
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const employeesRef = collection(database, "Employees");
    const unsubscribe = onSnapshot(employeesRef, (snapshot) => {
      const employeesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmployees(employeesData);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    loadLogs()
      .then((logs) => {
        // Convert date strings to Date objects and sort logs by date in descending order
        const sortedLogs = logs.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setLogs(sortedLogs);
      })
      .catch((error) => console.error("Error loading logs:", error));
  }, []);

  // Chart logic
  const filteredEmployees = employees.filter((emp) => emp.voteCount > 0);
  const chartData = {
    labels: filteredEmployees.map((emp) => emp.fullName),
    datasets: [
      {
        label: "Votes",
        data: filteredEmployees.map((emp) => emp.voteCount || 0),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  // Pagination logic
  const pages = Math.ceil(logs.length / rowsPerPage);
  const displayedLogs = logs.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="flex flex-col px-6">
      <UserHeader />
      <h2 className="text-2xl text-center text-black font-bold mt-10  mb-3 ">
        Voting Results
      </h2>
      <div className="w-full max-w-2xl mx-auto my-0">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="mt-20 w-full">
        <h2 className="text-2xl text-center text-black font-bold mt-10  mb-5 ">
          Voting Logs
        </h2>
        <hr />
        <Table
          aria-label="Log Table"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showShadow
                classNames={{
                  wrapper: "flex gap-2",
                  item: "px-4 py-2 mx-1 rounded-md transition-all bg-gray-200 hover:bg-gray-300",
                  active: "bg-[#0046BE] text-white rounded-[20%] font-bold",
                }}
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
                style={{ margin: "10px 0" }}
              />
            </div>
          }
          classNames={{ wrapper: "min-h-[222px]" }}
        >
          <TableHeader className="bg-gray-200">
            <TableColumn className="p-3 text-left font-bold">
              Nominator
            </TableColumn>
            <TableColumn className="p-3 text-left font-bold">
              Nominee
            </TableColumn>
            <TableColumn className="p-3 text-left font-bold">
              Reason
            </TableColumn>
            <TableColumn className="p-3 text-left font-bold">Date</TableColumn>
          </TableHeader>
          <TableBody>
            {displayedLogs.map((log, index) => (
              <TableRow key={index} className="border-b">
                <TableCell className="p-3 ">{log.nominatorName}</TableCell>
                <TableCell className="p-3">{log.nomineeName}</TableCell>
                <TableCell className="p-3 ">{log.nominatorReason}</TableCell>
                <TableCell className="p-3">{log.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
