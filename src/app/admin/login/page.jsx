"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Handle input changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle login
  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "admin") {
      toast.success("Login successful!");
      setTimeout(() => router.push("/dashboard"), 1500); // Redirect to dashboard
    } else {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bgg.avif')" }}
    >
      <div className="w-full max-w-md p-6 bg-black/60 bg-opacity-90 rounded-lg shadow-2xl">
        <div className="text-center flex justify-center flex-col  item-center mx-auto w-full">
          <div className="mx-auto flex items-center justify-center">

          <img src="logoo.svg" alt="" className="text-black size-[70px]" />
          </div>
          <h4 className="mt-4 mb-5 text-2xl font-bold text-white">Welcome Back!</h4>
          <p className="text-center mb-4 text-white">Please login to your account</p>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
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
