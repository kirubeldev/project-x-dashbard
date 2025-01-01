"use client";

import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiArrowUpRight, FiMoreHorizontal, FiX } from "react-icons/fi";

const predefinedData = [
  { name: "Naod Mergiya", subject: "You have an invitation", message: "Discover Your Path to the U.S. - Top University Options. This message contains more than fifty words to demonstrate how the truncation works.", time: "4:05 PM", phone: "123-456-7890", email: "naod@example.com" },
  { name: "Team Unstop", subject: "L'Oréal, Asian Paints, Muthoot, Samsung hiring challenges!", message: "Naod just messaged you", time: "3:45 PM", phone: "123-456-7891", email: "team@example.com" },
  { name: "Habteselassie Fisha", subject: "You have an invitation", message: "Designer Development from Miran is waiting for you", time: "2:30 PM", phone: "123-456-7892", email: "habteselassie@example.com" },
  { name: "Yonatan T.", subject: "Just messaged you", message: "Kirubel, opportunities from your dream companies just for you!", time: "1:15 PM", phone: "123-456-7893", email: "yonatan@example.com" },
  { name: "LinkedIn", subject: "Job Alert", message: "Velan Consulting Pty Ltd is hiring a Frontend Developer", time: "9:06 AM", phone: "123-456-7894", email: "linkedin@example.com" },
  { name: "Intern at Next Wave!", subject: "Internship Opportunity", message: "Explore Top US University Options", time: "8:30 AM", phone: "123-456-7895", email: "intern@example.com" },
  { name: "Daniel Temesgen", subject: "You have a new message", message: "New message awaits your response", time: "7:45 AM", phone: "123-456-7896", email: "daniel@example.com" },
  { name: "Sara Smith", subject: "Meeting Reminder", message: "Don't forget our meeting tomorrow at 10 AM.", time: "6:30 AM", phone: "123-456-7897", email: "sara@example.com" },
  { name: "John Doe", subject: "Follow-up Required", message: "Please follow up with the client regarding their feedback.", time: "5:00 PM", phone: "123-456-7898", email: "john@example.com" },
  { name: "Emily Zhang", subject: "Project Update", message: "The project is progressing well, and we are on schedule.", time: "3:00 PM", phone: "123-456-7899", email: "emily@example.com" },
  { name: "Michael Johnson", subject: "New Opportunities", message: "Check out these new job opportunities.", time: "2:00 PM", phone: "123-456-7800", email: "michael@example.com" },
  { name: "Lisa Wong", subject: "Workshop Invitation", message: "Join us for a workshop on React.js.", time: "1:30 PM", phone: "123-456-7801", email: "lisa@example.com" },
  { name: "Robert Brown", subject: "Feedback Request", message: "Please provide feedback on the recent changes.", time: "12:00 PM", phone: "123-456-7802", email: "robert@example.com" },
  { name: "Anna Taylor", subject: "Networking Event", message: "Don't miss our networking event this Friday.", time: "11:00 AM", phone: "123-456-7803", email: "anna@example.com" },
  { name: "Chris Evans", subject: "Sales Report", message: "The sales report is ready for review.", time: "10:30 AM", phone: "123-456-7804", email: "chris@example.com" },
  { name: "Jessica Davis", subject: "Training Session", message: "Reminder for the training session next week.", time: "9:15 AM", phone: "123-456-7805", email: "jessica@example.com" },
  { name: "David Wilson", subject: "Company Update", message: "Important company updates to share.", time: "8:45 AM", phone: "123-456-7806", email: "david@example.com" },
  { name: "Sophia Lee", subject: "Task Assignment", message: "You have a new task assigned to you.", time: "8:15 AM", phone: "123-456-7807", email: "sophia@example.com" },
  { name: "Kevin Hall", subject: "Client Meeting", message: "Prepare for the client meeting this afternoon.", time: "7:30 AM", phone: "123-456-7808", email: "kevin@example.com" },
  { name: "Paul Martin", subject: "Invoice Update", message: "The invoice has been updated and sent.", time: "7:00 AM", phone: "123-456-7809", email: "paul@example.com" },
];

const truncateMessage = (message) => {
  const words = message.split(" ");
  if (words.length > 6) {
    return words.slice(0, 6).join(" ") + "...";
  }
  return message;
};

export const Contactpage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState(null);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(predefinedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = predefinedData.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openDetail = (contact) => {
    setSelectedContact(contact);
  };

  const closeDetail = () => {
    setSelectedContact(null);
  };

  const handleOutsideClick = (event) => {
    if (event.target.id === "detail-overlay") {
      closeDetail();
    }
  };

  return (
    <div className="relative">
      <div className="p-4 rounded border border-stone-300">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 font-medium">
            <FaUser /> Messages
          </h3>
          <button className="text-sm text-violet-500 hover:underline">See all</button>
        </div>
        <table className="w-full table-auto border-collapse">
          <TableHead />
          <tbody>
            {currentData.map((item, index) => (
              <TableRow
                key={index}
                name={item.name}
                subject={item.subject}
                message={truncateMessage(item.message)}
                time={item.time}
                order={startIndex + index + 1}
                onClick={() => openDetail(item)}
              />
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {selectedContact && (
        <DetailPanel contact={selectedContact} onClose={closeDetail} onOutsideClick={handleOutsideClick} />
      )}
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-gray-600">
        <th className="text-start p-2">Name</th>
        <th className="text-start p-2">Subject</th>
        <th className="text-start p-2">Message</th>
        <th className="text-start p-2">Time</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({ name, subject, message, time, order, onClick }) => {
  return (
    <tr onClick={onClick} className={`${order % 2 === 0 ? "bg-white" : "bg-zinc-200"} hover:bg-gray-100 cursor-pointer`}>
      <td className="p-2">
        <a className="underline flex items-center gap-1">
          {name} <FiArrowUpRight />
        </a>
      </td>
      <td className="p-2">{subject}</td>
      <td className="p-2">{message}</td>
      <td className="p-2">{time}</td>
      <td className="w-8">
        <button className="hover:bg-gray-200 transition-colors grid place-content-center rounded text-sm">
          <FiMoreHorizontal />
        </button>
      </td>
    </tr>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-4 flex justify-end gap-2">
      <button
        className="px-3 py-1 border rounded text-sm hover:bg-gray-200"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`px-3 py-1 border rounded text-sm ${
            currentPage === index + 1
              ? "bg-violet-500 text-white"
              : "hover:bg-gray-200"
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="px-3 py-1 border rounded text-sm hover:bg-gray-200"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

const DetailPanel = ({ contact, onClose, onOutsideClick }) => {
  return (
    <div
      id="detail-overlay"
      className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-70 z-50"
      onClick={onOutsideClick}
    >
      <div className="bg-white w-1/3 h-full p-4 rounded-l-lg shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <FiX size={20} />
        </button>
        <h2 className="text-xl font-bold mb-2">{contact.name}</h2>
        <p><strong>Subject:</strong> {contact.subject}</p>
        <p><strong>Message:</strong> {contact.message}</p>
        <p><strong>Time:</strong> {contact.time}</p>
        <p><strong>Phone:</strong> {contact.phone}</p>
        <p><strong>Email:</strong> {contact.email}</p>
      </div>
    </div>
  );
};