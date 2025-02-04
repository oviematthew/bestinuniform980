import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get current URL path

  return (
    <nav className="bg-[#0046be] max-w-full">
      <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-900 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                // Close Icon (When menu is open)
                <svg
                  className="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Menu Icon (When menu is closed)
                <svg
                  className="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-10">
                {/* Home */}
                <Link
                  to="/"
                  className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-900 hover:text-white ${
                    location.pathname === "/" ? "text-white" : "text-gray-300"
                  }`}
                >
                  Home
                </Link>

                {/* Login */}
                <Link
                  to="/login"
                  className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-900 hover:text-white ${
                    location.pathname === "/login"
                      ? "text-white"
                      : "text-gray-300"
                  }`}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Logo */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <img
              className="h-12 w-auto"
              src="../src/assets/logo.png"
              alt="Logo"
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden ${isOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pt-2 pb-3">
          {/* Home Link */}
          <Link
            to="/"
            className={`block px-3 py-2 text-base font-medium hover:bg-blue-900 hover:text-white ${
              location.pathname === "/" ? "text-white" : "text-gray-300"
            }`}
          >
            Home
          </Link>

          {/* Login Link */}
          <Link
            to="/login"
            className={`block px-3 py-2 text-base font-medium hover:bg-blue-900 hover:text-white ${
              location.pathname === "/login" ? "text-white" : "text-gray-300"
            }`}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
