import { auth } from "../config/Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
