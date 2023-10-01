import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminSignIn() {
  // State variables
  const [isSignUp, setIsSignUp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(true); // To track OTP validity
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission for both sign-up and login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dummy validation
    if (!phoneNumber || !password) {
      setLoginMessage("Please fill in all fields.");
      return;
    }

    // Create a payload with user credentials
    const userData = {
      phoneNumber,
      password,
    };

    try {
      setIsLoading(true); // Show loading animation

      // Make a POST request to your authentication API endpoint
      const response = await axios.post("YOUR_API_ENDPOINT_HERE", userData);

      // Check if the login was successful (customize this based on your API's response)
      if (response.data && response.data.success) {
        // Display a success message
        setLoginMessage(
          `Login successful for phone number: ${phoneNumber} as Admin`
        );

        // Show the OTP modal
        setShowModal(true);
      } else {
        // Handle failed login (customize this based on your API's response)
        setLoginMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      // Handle API request errors
      console.error("Error:", error);
      setLoginMessage("An error occurred while processing your request.");
    } finally {
      setIsLoading(false); // Hide loading animation
    }
  };

  // Handle OTP validation
  const handleOtpValidation = () => {
    // Dummy OTP validation logic (customize this based on your API's response)
    if (otp === "123456") {
      setIsOtpValid(true); // OTP is valid
    } else {
      setIsOtpValid(false); // OTP is invalid
    }
  };

  return (
    <div
      className="bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80)",
      }}
    >
      <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex  self-center p-5 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div className="self-start hidden lg:flex flex-col  text-white">
            <h1 className="mb-3 font-bold text-4xl">
              {isSignUp ? "Admin Sign Up" : "Admin Sign In"}
            </h1>
            <p className="pr-3">
              {isSignUp
                ? "Create your admin account and get started."
                : "Please sign in to your admin account."}
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-8 bg-white mx-auto rounded-2xl w-full max-w-md">
            <div className="mb-4 ml-6">
              <h3 className="font-semibold text-xl text-gray-800">
                {isSignUp ? "Create an Account" : "Sign In"}
              </h3>
              <p className="text-gray-500">
                {isSignUp
                  ? "Please fill in the following details:"
                  : "Please sign in to your account."}
              </p>
            </div>
            <form>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Phone Number
                  </label>
                  <input
                    className="w-full text-base px-3 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Password
                  </label>
                  <input
                    className="w-full content-center text-base px-3 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                    onClick={handleSubmit}
                  >
                    {isSignUp ? "Sign Up" : "Sign In"}
                  </button>
                </div>
                <div className="text-center mt-4 text-sm text-gray-500">
                  {isSignUp
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <Link
                    to={isSignUp ? "/Adminsignup" : "/AdminSignup"}
                    className="text-green-500 hover:underline"
                  >
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-md mx-auto my-6">
            {/* Content */}
            <div className="modal">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
                <input
                  type="text"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400 mb-2"
                />
                <button
                  onClick={handleOtpValidation}
                  className="w-full flex justify-center bg-green-400 hover:bg-green-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  Validate OTP
                </button>
                {!isOtpValid && (
                  <p className="text-red-500 mt-2">
                    Invalid OTP. Please try again.
                  </p>
                )}
                {isOtpValid && (
                  <p className="text-green-500 mt-2">OTP is valid.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Animation */}
      {isLoading && (
        <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
        </div>
      )}
    </div>
  );
}

export default AdminSignIn;
