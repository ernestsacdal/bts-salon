import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ClientSignup() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [otp, setOTP] = useState("");
  const [otpConfirmation, setOTPConfirmation] = useState(""); // OTP confirmation message
  const [isOTPButtonDisabled, setIsOTPButtonDisabled] = useState(false); // OTP button disabled state
  const [countdown, setCountdown] = useState(60); // Initial countdown time in seconds
  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility

  useEffect(() => {
    let countdownInterval;
    
    // Retrieve the countdown value from localStorage
    const savedCountdown = localStorage.getItem("otpCountdown");

    if (savedCountdown) {
      const parsedCountdown = parseInt(savedCountdown);
      if (!isNaN(parsedCountdown)) {
        setCountdown(parsedCountdown);
      }
    }

    if (countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
        // Store the countdown value in localStorage
        localStorage.setItem("otpCountdown", countdown - 1);
      }, 1000);
    }

    if (countdown === 0) {
      clearInterval(countdownInterval);
      setIsOTPButtonDisabled(false); // Enable the OTP button after countdown reaches 0
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown]);

  const handleSendOTP = () => {
    setIsOTPButtonDisabled(true); // Disable the OTP button during countdown
    setCountdown(60); // Reset timer
    setOTPConfirmation(""); // Clear the OTP confirmation message
    // Store the countdown value in localStorage
    localStorage.setItem("otpCountdown", 60);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy validation
    if (!phoneNumber || !password || (isSignUp && !confirmPassword)) {
      setRegistrationMessage("Please fill in all fields.");
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setRegistrationMessage("Passwords do not match.");
      return;
    }

    // Dummy registration logic (replace with actual API call)
    const userData = {
      phoneNumber,
      password,
    };

    // Display a success message
    setRegistrationMessage(`${isSignUp ? "Registration" : "Login"} successful for phone number: ${phoneNumber} as Admin`);
  };

  // Determine if the "Sign Up" button should be disabled
  const isSignUpButtonDisabled = () => {
    if (!phoneNumber || !password || (isSignUp && !confirmPassword)) {
      return true; // Disable the button if any required field is empty
    }
    return false; // Enable the button if all required fields are filled
  };

  return (
    <div className="bg-no-repeat bg-cover bg-center relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80)' }}>
      <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex self-center p-5 sm:max-w-5xl xl:max-w-2xl z-10">
          <div className="self-start hidden lg:flex flex-col text-white">
            <h1 className="mb-3 font-bold text-4xl">{isSignUp ? "Admin Sign Up" : "Admin Login"}</h1>
            <p className="pr-3">{isSignUp ? "Create your admin account and get started." : "Please sign in to your admin account."}</p>
          </div>
        </div>
        <div className="flex justify-center self-center z-10">
          <div className="p-8 bg-white mx-auto rounded-2xl w-full max-w-md">
            <div className="mb-4 ml-6">
              <h3 className="font-semibold text-xl text-gray-800">{isSignUp ? "Create an Account" : "Sign In"}</h3>
              <p className="text-gray-500">{isSignUp ? "Please fill in the following details:" : "Please sign in to your account."}</p>
            </div>
            <form>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">Phone Number</label>
                  <input className="w-full text-base px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type="tel" placeholder="Enter your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">Password</label>
                  <div className="relative">
                    <input className="w-full content-center text-base px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button
                      type="button"
                      className="absolute top-2 right-2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                {isSignUp && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 tracking-wide">Confirm Password</label>
                    <input className="w-full content-center text-base px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type={showPassword ? "text" : "password"} placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">OTP</label>
                  <div className="flex">
                    <input
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400"
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOTP(e.target.value)}
                    />
                    <button
                      type="button"
                      className={`ml-2 w-24 flex justify-center bg-green-400 hover:bg-green-500 text-gray-100 p-2 rounded-lg tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500 ${isOTPButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={handleSendOTP}
                      disabled={isOTPButtonDisabled}
                    >
                      {isOTPButtonDisabled ? `Resend OTP (${countdown}s)` : 'Send OTP'}
                    </button>
                  </div>
                  {otpConfirmation && <p className={otpConfirmation.startsWith("OTP verification") ? "text-green-500 mt-2" : "text-red-500 mt-2"}>{otpConfirmation}</p>}
                </div>
                <button
                  type="button"
                  className={`w-full flex justify-center bg-green-400 hover:bg-green-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500 ${isSignUpButtonDisabled() ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleSubmit}
                  disabled={isSignUpButtonDisabled()}
                >
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
                <div className="text-center mt-4 text-sm text-gray-500">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                  <Link to={isSignUp ? "/clientSignin" : "/ClientSignin"} className="text-green-500 hover:underline">
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientSignup;
