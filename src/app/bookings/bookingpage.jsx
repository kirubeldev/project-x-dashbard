"use client";

import React, { useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 7;

  // Fetch bookings data from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('https://projectx-backend-escf.onrender.com/api/v1/getAllBookings'); // Replace with your actual API endpoint
        const data = await response.json();
        console.log(data); // Log the response data to ensure it's in the correct format
        setBookings(data);
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
    return words.length > 5 ? words.slice(0, 5).join(" ") + "..." : message;
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
          <h3 className="text-lg font-medium">Recent Bookings</h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center text-sm text-violet-500 hover:underline">
              <FiFilter className="mr-1" /> Filter
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full table-auto border-collapse bg-white shadow-md rounded">
            <thead>
              <tr className="text-sm font-normal text-gray-600">
                <th className="text-start p-2">Name</th>
                <th className="text-start p-2">Property ID</th>
                <th className="text-start p-2">Email</th>
                <th className="text-start p-2">Phone</th>
                <th className="text-start p-2">Message</th>
                <th className="text-start p-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((item, index) => (
                <tr
                  key={item._id}
                  onClick={() => handleRowClick(item)}
                  className={`${(index + indexOfFirstBooking) % 2 === 0 ? "bg-white" : "bg-gray-200"}  text-sm hover:bg-gray-300 cursor-pointer`}
                >
                  <td className="p-2">{item?.name || "No Name"}</td>
                  <td className="p-2">{item?._id}</td>
                  <td className="p-2">{item?.email || "N/A"}</td>
                  <td className="p-2">{item?.phone || "N/A"}</td>
                  <td className="p-2">{truncateMessage(item?.message || "No message")}</td>
                  <td className="p-2">{formatDate(item?.createdAt) || "No Date"}</td>
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

      {/* Modal for displaying booking details */}
      {selectedBooking && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={closeDetailPanel}
            >
              <FaXmark size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedBooking.name || "No Name"}</h2>
            <div className="mb-2">
              <p>Property ID: {selectedBooking?.propertyId || "N/A"}</p>
              <p>Email: {selectedBooking?.email || "N/A"}</p>
              <p>Phone: {selectedBooking?.phone || "N/A"}</p>
              <p>Message: {selectedBooking?.message || "No message available"}</p>
              <p>Created At: {formatDate(selectedBooking?.createdAt) || "No Date"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
