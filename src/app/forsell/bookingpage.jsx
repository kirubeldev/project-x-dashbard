"use client";

import React, { useState, useEffect } from "react";
import { FiArrowUpRight, FiMoreHorizontal, FiX, FiFilter } from "react-icons/fi";
import { ForsellGraph } from './forsellGraph'; // Import the ActivityGraph component
import { FaBed, FaBath, FaMapMarkerAlt, FaTag, FaClipboardList } from "react-icons/fa";

const regions = ["Bole", "Lideta", "Arada", "Gulele", "Kolfe Keraniyo", "Yeka", "Nefas Selk Lafto", "Addis Ketema", "Akaki Kality", "Kirkos", "Lemi Kura"];

const InventoryPage = () => {
  const [properties, setProperties] = useState([]); // State for storing property data
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filteredRegion, setFilteredRegion] = useState("");
  const [showGraph, setShowGraph] = useState(false); // State to toggle between table and graph
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const rowsPerPage = 10;

  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('https://projectx-backend-escf.onrender.com/api/v1/getallproperty'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        console.log(data);
        
        setProperties(data.reverse()); // Reverse the data array correctly by creating a new array
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const totalPages = Math.ceil(properties.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = properties
    .filter(property => !filteredRegion || property.region === filteredRegion)
    .slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openDetail = (property) => {
    setSelectedProperty(property);
  };

  const closeDetail = () => {
    setSelectedProperty(null);
  };

  const handleOutsideClick = (event) => {
    if (event.target.id === "detail-overlay") {
      closeDetail();
    }
  };

  const handleFilterChange = (region) => {
    setFilteredRegion(region);
    setCurrentPage(1); // Reset to first page when filtering
  };

  if (isLoading) {
    return <div>Loading...</div>; // Loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Error message
  }

  return (
    <div className="relative">
      <div className="p-4 rounded border border-stone-300">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Properties for Sale in Addis Ababa</h3>
          <div className="flex items-center gap-2">
            <button 
              className="flex items-center text-sm text-violet-500 hover:underline"
              onClick={() => handleFilterChange("")}
            >
              <FiFilter className="mr-1" /> Filter
            </button>
            <select 
              className="border rounded p-1 text-sm outline-none"
              value={filteredRegion}
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="">All Regions</option>
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <button 
              className="ml-2 px-3 py-1 border rounded text-sm hover:bg-gray-200"
              onClick={() => setShowGraph(!showGraph)} // Toggle between table and graph
            >
              {showGraph ? "Show Table" : "Show Graph"}
            </button>
          </div>
        </div>
        
        {showGraph ? (
          <ForsellGraph data={currentData} /> // Use ActivityGraph component
        ) : (
          <>
            <table className="w-full table-auto border-collapse">
              <TableHead />
              <tbody>
                {currentData.map((item, index) => (
                  <TableRow
                    key={index}
                    name={item.name}
                    level={item.level}
                   
                    estimatedPrice={item.estimatedPrice}
                    sku={item.sku}
                    category={item.category}
                    region={item.region}
                    currentOwnerName={item.currentOwnerName}
                    onClick={() => openDetail(item)}
                    order={startIndex + index + 1}
                  />
                ))}
              </tbody>
            </table>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>

      {selectedProperty && (
        <DetailPanel property={selectedProperty} onClose={closeDetail} onOutsideClick={handleOutsideClick} />
      )}
    </div>
  );
};

const TableHead = () => {
   return (
    <thead>
      <tr className="text-sm font-normal text-gray-600">
        <th className="text-start p-2">Property</th>
        <th className="text-start p-2">level</th>
        <th className="text-start p-2">estimatedPrice</th>
        <th className="text-start p-2">categorie</th>
        <th className="text-start p-2">Region</th>
        <th className="text-start p-2">Current owner</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({ name, quantity, estimatedPrice, level, currentOwnerName, category, region, onClick, order }) => {
  // console.log({ name, quantity, estimatedPrice, level, currentOwnerName, category, region }); // Add this line to debug
  return (
    <tr onClick={onClick} className={`${order % 2 === 0 ? "bg-white" : "bg-zinc-200"} hover:bg-gray-100 cursor-pointer`}>
      <td className="p-2">
        <a className="underline flex items-center gap-1">
          {name} <FiArrowUpRight />
        </a>
      </td>
      <td className="p-2">{level}</td>
      <td className="p-2">{estimatedPrice}</td>
      <td className="p-2">{category}</td>
      <td className="p-2">{region}</td>
      <td className="p-2">{currentOwnerName}</td>
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

const DetailPanel = ({ property, onClose, onOutsideClick }) => {
  return (
    <div
      id="detail-overlay"
      className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-70 z-50"
      onClick={onOutsideClick}
    >
      <div className="bg-white w-1/3 h-full p-6 rounded-l-lg shadow-lg relative overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <FiX size={20} />
        </button>
        <h3 className="text-xl font-semibold mb-4">Property Details</h3>
        <div className="space-y-3">
          <div><strong>Name:</strong> {property.name}</div>
          <div><strong>Level:</strong> {property.level}</div>
          <div><strong>Address:</strong> {property.address}</div>
          <div><strong>estimatedPrice:</strong> {property.estimatedestimatedPrice}</div>
          <div><strong>Bedrooms:</strong> {property.num_bedrooms}</div>
          <div><strong>Bathrooms:</strong> {property.num_bathrooms}</div>
          <div><strong>category:</strong> {property.category}</div>
          <div><strong>Region:</strong> {property.region}</div>
          <div><strong>Description:</strong> {property.description}</div>
          <div><strong>Owner:</strong> {property.currentOwnerName}</div>
          <div><strong>Email:</strong> {property.email}</div>
          <div><strong>Phone Number:</strong> {property.phoneNumber}</div>
          <div><strong>Available From:</strong> {new Date(property.available_from).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};


export default InventoryPage;
