import React, { useState, useEffect } from "react";
import AuthModal from "./AuthModal";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const logout = () => {
    // Clear authentication data from local storage
    localStorage.removeItem("profile");
    console.log("profile is removed");
    // Dispatch action to clear auth state
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My App</h1>
        <div>
          {user?.result ? (
            <>
              <div className="flex gap-3 items-center">
                <span className="text-xl">User : {user?.result.name}</span>
                <button
                  className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded focus:outline-none"
                  onClick={logout}
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
      <AuthModal isOpen={isModalOpen} onClose={toggleModal} />
    </header>
  );
};

export default Header;
