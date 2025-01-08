"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddAdmin() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    role: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showAdmins, setShowAdmins] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [roles, setRoles] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch data based on toggle state
  useEffect(() => {
    if (showAdmins) {
      fetchAdmins();
    } else {
      fetchRoles();
    }
  }, [showAdmins]);

  // Fetch roles
  const fetchRoles = async () => {
    try {
      const response = await fetch(
        "https://projectx-backend-escf.onrender.com/api/v1/getallrole"
      );
      if (response.ok) {
        const data = await response.json();
        setRoles(data);
      } else {
        toast.error("Failed to fetch roles.");
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error("An error occurred while fetching roles.");
    }
  };

  // Fetch admins
  const fetchAdmins = async () => {
    try {
      const response = await fetch(
        "https://projectx-backend-escf.onrender.com/api/v1/alladmins"
      );
      if (response.ok) {
        const data = await response.json();
        setAdmins(data.reverse());
        console.log(data);

        
      } else {
        toast.error("Failed to fetch admins.");
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
      toast.error("An error occurred while fetching admins.");
    }
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
      toast.error("Phone number must be 10 digits.");
      return;
    }

    if (!formData.role) {
      toast.error("Please select a role.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://projectx-backend-escf.onrender.com/api/v1/adminRegister",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        toast.success("Admin added successfully!");
        console.log("Success:", result);

        setFormData({
          fullname: "",
          email: "",
          phonenumber: "",
          role: "",
          password: "",
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to add admin.");
      }
    } catch (error) {
      toast.error("An error occurred while adding the admin.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-[50px] flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">
            {showAdmins ? "Admins List" : "Add New Admin"}
          </h2>
          <div
            className={`relative gap-1 px-1 flex items-center h-9 rounded-full w-[75px] cursor-pointer transition-all ${
              showAdmins ? "bg-blue-500 flex-row-reverse" : "bg-gray-700"
            }`}
            onClick={() => setShowAdmins(!showAdmins)}
          >
            <span className="h-7 w-7 bg-white rounded-full shadow transition-transform" />
            <span className="text-xs font-medium text-white transition-colors">
              {showAdmins ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        {showAdmins ? (
          <div>
            {admins.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {admins.map((admin) => (
                  <div
                    key={admin._id}
                    className="p-4 border border-gray-300 rounded-md flex flex-col items-center"
                  >
                    <img
                      src="https://avatar.iran.liara.run/public/boy"
                      alt="Admin Avatar"
                      className="w-16 h-16 rounded-full object-cover mb-4"
                    />
                    <div className="flex items-start flex-col gap-1">
                      <p className="text-sm font-bold whitespace-nowrap">
                        Name:{" "}
                        <span className="text-sm font-normal">
                          {admin.fullname}
                        </span>
                      </p>
                      <p className="text-sm font-bold whitespace-nowrap">
                        Email:{" "}
                        <span className="text-sm font-normal">
                          {admin.email}
                        </span>
                      </p>
                      <p className="text-sm font-bold whitespace-nowrap">
                        Phone:{" "}
                        <span className="text-sm font-normal">
                          {admin.phonenumber}
                        </span>
                      </p>
                      <p className="text-sm font-bold whitespace-nowrap">
                        Role:{" "}
                        <span className="text-sm font-normal">{admin?.role?.name}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No admins found.</p>
            )}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
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

            <div>
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

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter phone number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
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

            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 text-white font-medium rounded-md ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {loading ? "Adding Admin..." : "Add Admin"}
              </button>
            </div>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddAdmin;
