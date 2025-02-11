import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get current URL path
  const [user, loading] = useAuthState(auth); // Get sign in state

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
                {!user && (
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
                )}

                {/* Dashboard */}
                {user && (
                  <Link
                    to="/admin/dashboard"
                    className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-900 hover:text-white ${
                      location.pathname === "/admin/dashboard"
                        ? "text-white"
                        : "text-gray-300"
                    }`}
                  >
                    Dashboard
                  </Link>
                )}

                {/* Results*/}
                {user && (
                  <Link
                    to="/admin/results"
                    className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-900 hover:text-white ${
                      location.pathname === "/admin/results"
                        ? "text-white"
                        : "text-gray-300"
                    }`}
                  >
                    Results
                  </Link>
                )}

                {/* Settings*/}
                {user && (
                  <Link
                    to="/admin/settings"
                    className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-900 hover:text-white ${
                      location.pathname === "/admin/settings"
                        ? "text-white"
                        : "text-gray-300"
                    }`}
                  >
                    Settings
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Below */}

          {/* Mobile Logo */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <img className="h-12 w-auto" src="../assets/logo.png" alt="Logo" />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden ${isOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="flex flex-col gap-2 space-y-1 px-2 pt-2 pb-3">
          {/* Home Link */}
          <Link
            onClick={() => setIsOpen(!isOpen)}
            to="/"
            className={`block px-3 py-2 text-base font-medium hover:bg-blue-900 hover:text-white ${
              location.pathname === "/" ? "text-white" : "text-gray-300"
            }`}
          >
            Home
          </Link>

          {/* Login */}
          {!user && (
            <Link
              to="/login"
              onClick={() => setIsOpen(!isOpen)}
              className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-900 hover:text-white ${
                location.pathname === "/login" ? "text-white" : "text-gray-300"
              }`}
            >
              Login
            </Link>
          )}

          {/* Dashboard */}
          {user && (
            <Link
              to="/admin/dashboard"
              onClick={() => setIsOpen(!isOpen)}
              className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-900 hover:text-white ${
                location.pathname === "/admin/dashboard"
                  ? "text-white"
                  : "text-gray-300"
              }`}
            >
              Dashboard
            </Link>
          )}

          {/* Results*/}
          {user && (
            <Link
              to="/admin/results"
              onClick={() => setIsOpen(!isOpen)}
              className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-900 hover:text-white ${
                location.pathname === "/admin/results"
                  ? "text-white"
                  : "text-gray-300"
              }`}
            >
              Results
            </Link>
          )}

          {/* Settings*/}
          {user && (
            <Link
              to="/admin/settings"
              onClick={() => setIsOpen(!isOpen)}
              className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-900 hover:text-white ${
                location.pathname === "/admin/settings"
                  ? "text-white"
                  : "text-gray-300"
              }`}
            >
              Settings
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
