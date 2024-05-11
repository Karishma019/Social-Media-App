import React, { useEffect, useState } from "react";
import { signIn, signUp } from "../auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner9 } from "react-icons/im";

const initialState = {
  firstName: "",
  username: "",
  lastName: "",
  email: "",
  password: "",
};

const AuthModal = ({ isOpen, onClose, setIsModalOpen }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { loggedInUser, loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  const togglePasswordVisibility = () => {
    setFormData(initialState);
    setShowPassword(!showPassword);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignIn) {
      dispatch(signIn(formData));
    } else {
      dispatch(signUp(formData));
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      return setIsModalOpen(false);
    }
  }, [loggedInUser]);

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <div className="relative bg-white rounded shadow-lg w-full max-w-md p-8">
          {error && (
            <p className="text-red-500 bg-red-50 p-2 rounded-lg mb-2">
              {error.message}
            </p>
          )}
          <h2 className="text-2xl mb-4 text-black">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit}>
            {!isSignIn && (
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your username"
                />
              </div>
            )}
            {!isSignIn && (
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your first name"
                />
              </div>
            )}
            {!isSignIn && (
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your last name"
                />
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-4 py-2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.071 12.428c.428.428.428 1.072 0 1.5L5.757 22.071a1.056 1.056 0 0 1-1.5-1.5l7.643-7.643a1.056 1.056 0 0 1 1.5 0l3.214 3.214z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 9a4 4 0 1 1-8 0 4 4 0 016 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isSignIn ? "Sign In" : "Sign Up"}
              </button>
              <button
                type="button"
                onClick={toggleSignIn}
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                {loading ? (
                  <ImSpinner9 className="animate-spin" />
                ) : isSignIn ? (
                  "Create an Account"
                ) : (
                  "Already have an account? Sign in"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
