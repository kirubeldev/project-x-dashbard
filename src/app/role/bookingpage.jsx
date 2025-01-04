"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaPlus, FaXmark } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [newRole, setNewRole] = useState({ name: "", description: "" });
  const bookingsPerPage = 7;

  const router = useRouter();
  // Fetch bookings data from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("https://projectx-backend-escf.onrender.com/api/v1/getallrole");
        const data = await response.json();
        console.log(data); // Log the response data to ensure it's in the correct format
        setBookings(data.reverse());
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Pagination logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  // Format date function
  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Limit message to 5 words
  const truncateMessage = (message) => {
    const words = message.split(" ");
    return words;
  };

  // Handle row click to show details
  const handleRowClick = (booking) => {
    console.log(booking); // Log booking data to ensure it's correct
    setSelectedBooking(booking);
  };

  // Close detail panel
  const closeDetailPanel = () => {
    setSelectedBooking(null);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole((prevRole) => ({ ...prevRole, [name]: value }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://projectx-backend-escf.onrender.com/api/v1/addrole", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRole),
      });
      const result = await response.json();
      if (response.ok) {
        setBookings((prevBookings) => [result, ...prevBookings]);
        setNewRole({ name: "", description: "" }); // Reset form fields
        setShowForm(false); // Close form
        router.push("/role")
        console.log("Role added successfully:", result);
      } else {
        console.error("Error adding role:", result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  return (
    <div className="relative">
      <div className="p-4 rounded border border-stone-300">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Role Page</h3>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center text-sm p-2 border rounded-xl bg-white text-violet-500"
              onClick={() => setShowForm(!showForm)}
            >
              <FaPlus className="mr-1" /> {showForm ? "Cancel" : "Add New Role"}
            </button>
          </div>
        </div>

        {showForm && (
          <form className="mb-4 p-4 border rounded-lg bg-gray-100" onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={newRole.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter role name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={newRole.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter role description"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-violet-500 text-white rounded-md"
            >
              Submit
            </button>
          </form>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full table-auto border-collapse bg-white shadow-md rounded">
            <thead>
              <tr className="text-sm font-normal text-gray-600">
                <th className="text-start p-2">ID</th>
                <th className="text-start p-2">Name</th>
                <th className="text-start p-2">Description</th>
                <th className="text-start p-2">Created at</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((item, index) => (
                <tr
                  key={item._id}
                  onClick={() => handleRowClick(item)}
                  className={`${(index + indexOfFirstBooking) % 2 === 0 ? "bg-white" : "bg-gray-200"}  text-sm hover:bg-gray-300 cursor-pointer`}
                >
                  <td className="p-2">{item?._id || "No Name"}</td>
                  <td className="p-2">{item?.name}</td>
                  <td className="p-2">{item?.description ? item.description.slice(0, 20) + "..." : "N/A"}</td>
                  <td className="p-2">
                    {item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className="mt-4 flex justify-end gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? "bg-violet-500 text-white" : "bg-gray-300"}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
