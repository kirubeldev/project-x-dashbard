"use client";

import React, { useState } from "react";
import { FaHouse } from "react-icons/fa6";
import { FiArrowUpRight, FiDollarSign, FiMoreHorizontal } from "react-icons/fi";

const predefinedData = [
  { cusId: "#12345", sku: "Pro 1 Month", date: "Aug 10", price: "$29.99" },
  { cusId: "#23456", sku: "Pro 3 Month", date: "Aug 15", price: "$59.99" },
  { cusId: "#34567", sku: "Pro 1 Year", date: "Aug 20", price: "$99.99" },
  { cusId: "#45678", sku: "Pro 1 Month", date: "Aug 25", price: "$29.99" },
  { cusId: "#56789", sku: "Pro 3 Month", date: "Aug 30", price: "$59.99" },
  { cusId: "#67890", sku: "Pro 1 Year", date: "Sep 1", price: "$99.99" },
  { cusId: "#78901", sku: "Pro 1 Month", date: "Sep 5", price: "$29.99" },
  { cusId: "#89012", sku: "Pro 3 Month", date: "Sep 10", price: "$59.99" },
  { cusId: "#90123", sku: "Pro 1 Year", date: "Sep 15", price: "$99.99" },
  { cusId: "#01234", sku: "Pro 1 Month", date: "Sep 20", price: "$29.99" },
];

export const PatternTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const totalPages = Math.ceil(predefinedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = predefinedData.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FaHouse /> Partners List
        </h3>
        <button className="text-sm text-violet-500 hover:underline">See all</button>
      </div>
      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {currentData.map((item, index) => (
            <TableRow
              key={index}
              cusId={item.cusId}
              sku={item.sku}
              date={item.date}
              price={item.price}
              order={startIndex + index + 1}
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
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Customer ID</th>
        <th className="text-start p-1.5">Type</th>
        <th className="text-start p-1.5">Date</th>
        <th className="text-start p-1.5">Price</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({ cusId, sku, date, price, order }) => {
  return (
    <tr className={order % 2 ? "bg-zinc-200 text-sm" : "text-sm"}>
      <td className="p-1.5">
        <a
          href="#"
          className="text-violet-600 underline flex items-center gap-1"
        >
          {cusId} <FiArrowUpRight />
        </a>
      </td>
      <td className="p-1.5">{sku}</td>
      <td className="p-1.5">{date}</td>
      <td className="p-1.5">{price}</td>
      <td className="w-8">
        <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
          <FiMoreHorizontal />
        </button>
      </td>
    </tr>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-7 flex justify-end gap-2">
      <button
        className="px-3 py-1 border rounded text-sm hover:bg-stone-200"
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
              : "hover:bg-stone-200"
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="px-3 py-1 border rounded text-sm hover:bg-stone-200"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
