import { useState } from "react";
import { updatePassword } from "firebase/auth";
import { auth } from "../config/Firebase";
import UserHeader from "../components/UserHeader";

export default function Settings() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const user = auth.currentUser;

  const changePassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. try again!");
      return;
    }

    if (password === confirmPassword) {
      setError("");

      try {
        await updatePassword(user, password);
        setError("");
        setMessage("Password changed successfully!");
        setPassword("");
        setConfirmPassword("");

        // Refresh after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (err) {
        setError("Error changing password, please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col  px-6  lg:px-8">
      <UserHeader />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-[#0046be] font-bold mt-10 text-3xl">
          Change Password
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={changePassword} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              New Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="New password"
                className="block w-full rounded-md my-2 p-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <label
              htmlFor="confirmpassword"
              className="block text-sm mt-5 font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirmpassword"
                name="confirmpassword"
                type="password"
                required
                placeholder="Confirm password"
                className="block w-full rounded-md my-2 p-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#0046BE] px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Change Password
            </button>

            {message && (
              <p className="text-green-500 mt-2 text-sm">{message}</p>
            )}
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
