// AdminSignUp.js
import React, { useState } from "react";

function AdminSignUp() {
  // State variables for form fields
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminConfirmPassword, setAdminConfirmPassword] = useState("");
  const [adminRegistrationMessage, setAdminRegistrationMessage] = useState(""); // To display a registration message

  // Handle form submission for admin registration
  const handleAdminSubmit = (e) => {
    e.preventDefault();

    // Dummy validation
    if (!adminName || !adminEmail || !adminPassword || adminPassword !== adminConfirmPassword) {
      setAdminRegistrationMessage("Please fill in all fields and ensure passwords match.");
      return;
    }

    // Dummy admin registration logic (you can replace this with API calls)
    const adminData = {
      adminName,
      adminEmail,
      adminPassword,
    };

    // Display a success message
    setAdminRegistrationMessage("Admin registration successful.");
  };

  return (
    <div className="bg-no-repeat bg-cover bg-center relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80)' }}>
      <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex justify-center self-center  z-10">
          <div className="p-8 bg-white mx-auto rounded-2xl w-full max-w-md">
            <div className="mb-4 ml-6">
              <h3 className="font-semibold text-xl text-gray-800">Admin Sign Up</h3>
              <p className="text-gray-500">Please fill in the following details:</p>
            </div>
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">Admin Name</label>
                <input
                  type="text"
                  className="w-full text-base px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  placeholder="Enter admin name"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">Admin Email</label>
                <input
                  type="email"
                  className="w-full text-base px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  placeholder="Enter admin email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">Password</label>
                <input
                  type="password"
                  className="w-full text-base px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  placeholder="Enter password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">Confirm Password</label>
                <input
                  type="password"
                  className="w-full text-base px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  placeholder="Confirm password"
                  value={adminConfirmPassword}
                  onChange={(e) => setAdminConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-green-400 hover:bg-green-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  Register
                </button>
              </div>
              <p className="text-center text-sm text-gray-500">{adminRegistrationMessage}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSignUp;
