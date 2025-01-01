"use client";

import { Card } from "flowbite-react";
import { FaLocationPin } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";

export function PartnersList({ image, name, phone, location, status }) {
  // Define status colors
  const statusColor =
    status === "Active" ? "bg-green-500" : "bg-red-500";

  return (
    
    <Card className="max-w-xs shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <img
        className="h-[180px] w-full object-cover"
        src={image}
        alt={`Image of ${name}`}
      />
      <div className="p-3">
        <h5 className="text-lg font-semibold tracking-tight text-gray-800 mb-1">
          {name}
        </h5>
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
          <FiPhoneCall className="text-blue-500" size={16} />
          <span>{phone}</span>
        </div>
        <div className="flex items-center justify-between text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <FaLocationPin className="text-blue-500" size={16} />
            <span>{location}</span>
          </div>
          <div
            className={`flex items-center gap-2 px-2 py-0.5 rounded-md ${
              status === "Active" ? "bg-green-200" : "bg-red-200"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                status === "Active" ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            <span
              className={`text-xs font-medium ${
                status === "Active" ? "text-green-700" : "text-red-700"
              }`}
            >
              {status}
            </span>
          </div>
        </div>
      </div>
      <div className="px-3 pb-3">
        <button className="bg-blue-600 w-full py-1.5 rounded-md text-white font-medium text-sm transition hover:bg-blue-700">
          Details
        </button>
      </div>
    </Card>
  );
}
