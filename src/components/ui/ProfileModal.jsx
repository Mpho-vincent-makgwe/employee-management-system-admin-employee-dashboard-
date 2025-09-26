"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function ProfileModal({
  isAuthenticated,
  userInitials = "Log In",
  userEmail = "",
  userName = "",
  onLogin,
  onLogout,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar button */}
      {isAuthenticated ? (
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-[#5C4DFF] text-white font-bold flex items-center justify-center hover:opacity-90 focus:outline-none"
          aria-label="Profile menu"
        >
          {userInitials}
        </button>
      ) : (
        <button
          onClick={() => {
            setOpen(true);
            onLogin?.();
          }}
          className="bg-indigo-600 hover:bg-indigo-900 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Login
        </button>
      )}

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
          {isAuthenticated ? (
            <>
              {/* Profile Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#5C4DFF] text-white flex items-center justify-center font-semibold text-lg">
                    {userInitials}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{userName}</p>
                    <p className="text-sm text-gray-500">{userEmail}</p>
                  </div>
                </div>
                <Link href="/profile">
                  <button className="mt-3 w-full text-blue-600 text-sm font-medium hover:bg-blue-50 px-3 py-2 rounded-lg transition">
                    Manage your account
                  </button>
                </Link>
              </div>

              {/* Menu Links */}
              <div className="px-4 py-2">
                <Link href="/">
                  <button
                    className="w-full text-left text-sm py-2 px-2 rounded-md hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </button>
                </Link>
              </div>

              {/* Sign out */}
              <div className="px-4 py-2 border-t border-gray-200">
                <button
                  onClick={() => {
                    onLogout?.();
                    setOpen(false);
                  }}
                  className="w-full text-left text-sm py-2 px-2 rounded-md hover:bg-gray-100 text-red-600"
                >
                  Log out
                </button>
              </div>
            </>
          ) : (
            <div className="p-4">
              <Link href="/auth/log-in">
                <button
                  onClick={() => {
                    onLogin?.();
                    setOpen(false);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition"
                >
                  Log in
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
