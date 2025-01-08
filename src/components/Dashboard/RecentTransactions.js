"use client"
import React, { useState, useEffect } from "react";
import { FiArrowUpRight, FiDollarSign, FiMoreHorizontal, FiUser } from "react-icons/fi";

export const RecentTransactions = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    // Simulate data fetching delay
    setTimeout(() => {
      const generatedData = Array.from({ length: 20 }, (_, index) => ({
        cusId: `#${Math.floor(Math.random() * 100000)}`,
        sku: `Pro ${["1 Month", "3 Month", "1 Year"][Math.floor(Math.random() * 3)]}`,
        date: `Aug ${Math.floor(Math.random() * 31) + 1}`,
        price: `$${(Math.random() * 100).toFixed(2)}`,
      }));
      setData(generatedData);
      setIsLoading(false);
    }, 2000); // Simulating a 2-second delay
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiUser /> Recent Property listed
        </h3>
        <button className="text-sm text-violet-500 hover:underline">See all</button>
      </div>
      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {isLoading
            ? Array.from({ length: rowsPerPage }).map((_, index) => (
                <SkeletonRow key={index} />
              ))
            : currentData.map((item, index) => (
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
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
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

const SkeletonRow = () => {
  return (
    <tr className="text-sm animate-pulse">
      <td className="p-1.5">
        <div className="h-4 bg-stone-200 rounded w-3/4"></div>
      </td>
      <td className="p-1.5">
        <div className="h-4 bg-stone-200 rounded w-1/2"></div>
      </td>
      <td className="p-1.5">
        <div className="h-4 bg-stone-200 rounded w-1/4"></div>
      </td>
      <td className="p-1.5">
        <div className="h-4 bg-stone-200 rounded w-1/3"></div>
      </td>
      <td className="w-8">
        <div className="h-4 bg-stone-200 rounded w-4"></div>
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
