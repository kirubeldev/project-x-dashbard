"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"; 
import "react-toastify/dist/ReactToastify.css";

function AdminLogin() {
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [Role, setRole] = useState("");
  const router = useRouter();

  // Handle input changes
  const handlePhonenumberChange = (e) => {
    setPhonenumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle login
  const handleLogin = async () => {
    try {
      const response = await axios.post("https://projectx-backend-escf.onrender.com/api/v1/adminlogin", {
        phonenumber,
        password,
      });

      console.log("Response:", response.data  ); // Debugging line

      if (response.data.user) { // Check if user data is present
        toast.success(response.data.message);
        if (typeof window !== 'undefined') {

          localStorage.setItem("username",  response.data.user.fullname.split(" ")[0])
          localStorage.setItem("email",  response.data.user.email)
          // Optionally store the token in local storage or state
          localStorage.setItem("token", response.data.token);
        }
        // You may also want to store user info for later use

        router.push('/dashboard'); // Navigate to the admin dashboard
      } else {
        toast.error(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      toast.error("An error occurred during login.");
    }
  };



  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bgg.avif')" }}
    >
      <div className="w-full max-w-md p-6 bg-black/60 bg-opacity-90 rounded-lg shadow-2xl">
        <div className="text-center flex justify-center flex-col items-center mx-auto w-full">
          <div className="mx-auto flex items-center justify-center">
            <img src="logoo.svg" alt="Logo" className="text-black size-[70px]" />
          </div>
          <h4 className="mt-4 mb-5 text-2xl font-bold text-white">Welcome Back!</h4>
          <p className="text-center mb-4 text-white">Please login to your account</p>
        </div>

        {/* Phone Number Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-white">Phone Number</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            placeholder="Enter your phone number"
            value={phonenumber}
            onChange={handlePhonenumberChange}
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-white">Password</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        {/* Login Button */}
        <div className="text-center">
          <button
            className="w-full py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-md"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-center" />
    </div>
  );
}

export default AdminLogin;