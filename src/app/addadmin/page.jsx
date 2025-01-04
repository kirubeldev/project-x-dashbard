"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddAdmin() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    role: "Admin",
    password: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
   
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format.");
      return;
    }

    if (formData.phonenumber.length !== 10) {
      toast.error("phonenumber number must be 10 digits.");
      return;
    }

    try {
      // Exclude the `role` field
      const { role, ...dataToSend } = formData;

      const response = await fetch("https://projectx-backend-escf.onrender.com/api/v1/adminRegister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Admin added successfully!");
        console.log("Success:", result);
        // Clear form fields after successful submission
        setFormData({
          fullname: "",
          email: "",
          phonenumber: "",
          role: "Admin",
          password: "",
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to add admin.");
        console.error("Error:", errorData);
      }
    } catch (error) {
      toast.error("An error occurred while adding the admin.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Add New Admin
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter email address"
              required
            />
          </div>

          {/* phonenumber */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              phonenumber
            </label>
            <input
              type="tel"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter phonenumber number"
              required
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              disabled
            >
              <option value="Admin">Admin</option>
              <option value="Moderator">Moderator</option>
            </select>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter a secure password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-md"
            >
              Add Admin
            </button>
          </div>
        </form>

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
}

export default AddAdmin;
