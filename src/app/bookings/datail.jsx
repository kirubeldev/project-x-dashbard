// DialogPopUp.js
import React from "react";
import { FaXmark } from "react-icons/fa"; // Import the close icon

const DialogPopUp = ({ booking, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <FaXmark size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4">{booking.name}</h2>
        <div className="mb-2">
          <p>Property ID: {booking.propertyId}</p>
          <p>Email: {booking.email}</p>
          <p>Phone: {booking.phone}</p>
          <p>Message: {booking.message}</p>
          <p>Created At: {new Date(booking.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default DialogPopUp;
