import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { FaUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const Header = ({ user, setUser, toggleModal }) => {
  const logout = () => {
    // Clear authentication data from local storage

    localStorage.removeItem("profile");

    // Dispatch action to clear auth state
  };

  const handleLogout = () => {
    localStorage.removeItem("profile");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  }, []);

  return (
    <header className="bg-gray-800 text-white p-4 mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">ShareZone</h1>
        <div>
          {user?.result ? (
            <>
              <div className="flex gap-2 items-center">
                <FaUserCircle className="text-3xl" />
                <span className="text-md"> {user?.result.name}</span>
                <FaEdit className="text-3xl" onClick={toggleModal} />
                <button
                  className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded focus:outline-none"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <button
              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded focus:outline-none"
              onClick={toggleModal}
            >
              Sign In / Sign Up
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
