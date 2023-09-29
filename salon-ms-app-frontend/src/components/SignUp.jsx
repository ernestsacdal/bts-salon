import React, { useState } from "react";
import { FaUser, FaUserShield } from "react-icons/fa"; // Import icons from react-icons

function SignUp() {
  // State variable to track whether the user is in sign-up or login mode
  const [isSignUp, setIsSignUp] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Track if user is an admin

  // variables for form fields
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState(""); // To display a registration message

  // handle form submission for both sign-up and login
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

    // Dummy registration logic/////you can replace this with API 
    const userData = {
      phoneNumber,
      password,
    };

    // Display a success message
    setRegistrationMessage(`${isSignUp ? "Registration" : "Login"} successful for phone number: ${phoneNumber} as ${isAdmin ? "Admin" : "Normal User"}`);
  };

  return (
    <div className="bg-no-repeat bg-cover bg-center relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80)' }}>
      <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex  self-center p-5 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div className="self-start hidden lg:flex flex-col  text-white">
            <h1 className="mb-3 font-bold text-4xl">{isSignUp ? "Sign Up" : "Login"}</h1>
            <p className="pr-3">{isSignUp ? "Create your account and get started." : "Please sign in to your account."}</p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-8 bg-white mx-auto rounded-2xl w-full max-w-md">
            <div className="mb-4 ml-6">
              <h3 className="font-semibold text-xl text-gray-800">{isSignUp ? "Create an Account" : "Sign In"}</h3>
              <p className="text-gray-500">{isSignUp ? "Please fill in the following details:" : "Please sign in to your account."}</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">Phone Number</label>
                <input className="w-full text-base px-3 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type="tel" placeholder="Enter your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">Password</label>
                <input className="w-full content-center text-base px-3 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {isSignUp && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">Confirm Password</label>
                  <input className="w-full content-center text-base px-3 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
              )}
              <div>
                <button type="submit" className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500" onClick={handleSubmit}>
                  {isSignUp ? "Sign Up" : "Sign In"}
                </button>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                  <button className="text-green-500 hover:underline" onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </button>
                </p>
              </div>
              {!isSignUp && (
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Login as:{" "}
                    <button className={`text-green-500 hover:underline ${isAdmin ? "font-bold" : ""}`} onClick={() => setIsAdmin(!isAdmin)}>
                      {isAdmin ? "Admin" : "Client"}
                      {isAdmin ? <FaUserShield className="ml-2 inline" /> : <FaUser className="ml-2 inline" />}
                    </button>
                  </p>
                </div>
              )}
            </div>
            <div className="pt-4 text-center text-gray-400 text-xs">
              <span>
                Copyright © 2021-2022
                <a href="https://github.com/yogesh2k21" rel="" target="_blank" title="Ajimon" className="text-green hover:text-green-500 ">Yogesh</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
