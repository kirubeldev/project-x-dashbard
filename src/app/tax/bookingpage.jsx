"use client";

import React, { useState } from "react";
import { FiArrowUpRight, FiMoreHorizontal, FiX, FiFilter } from "react-icons/fi";
import { ForsellGraph, Tax } from './forsellGraph'; // Import the ActivityGraph component
import { FaBed, FaBath, FaMapMarkerAlt, FaTag, FaClipboardList } from "react-icons/fa";

const predefinedPropertyData = [
  { name: "Luxury Apartment in Bole", level:2 , quantity: 5, price: "$150,000", sku: "H12345", category: "Residential", region: "Bole", area: "1200 sqft", bedrooms: 3, bathrooms: 2, description: "A modern apartment with high-end finishes." },
  { name: "Modern House in Lideta", level:1 , quantity: 3, price: "$250,000", sku: "H12346", category: "Residential", region: "Lideta", area: "1800 sqft", bedrooms: 4, bathrooms: 3, description: "Spacious home with a beautiful garden." },
  { name: "Cozy Condo in Arada", level:1 , quantity: 4, price: "$120,000", sku: "H12347", category: "Residential", region: "Arada", area: "800 sqft", bedrooms: 2, bathrooms: 1, description: "Perfect for singles or couples." },
  { name: "Comfortable Bungalow in Kolfe keraniyo", level:3 , quantity: 4, price: "$210,000", sku: "H12361", category: "Residential", region: "Kolfe keraniyo", area: "1400 sqft", bedrooms: 3, bathrooms: 2, description: "Comfortable living in a friendly neighborhood." },
  { name: "Chic Townhouse in Yeka", level:3 , quantity: 2, price: "$230,000", sku: "H12362", category: "Residential", region: "Yeka", area: "1450 sqft", bedrooms: 3, bathrooms: 2, description: "Chic townhouse with modern amenities." },
  { name: "Charming Bungalow in Kolfe keraniyo", level:1 , quantity: 6, price: "$200,000", sku: "H12349", category: "Residential", region: "Kolfe keraniyo", area: "1500 sqft", bedrooms: 3, bathrooms: 2, description: "A cozy home in a quiet neighborhood." },
  { name: "Contemporary Townhouse in Yeka", level:1 , quantity: 1, price: "$220,000", sku: "H12350", category: "Residential", region: "Yeka", area: "1400 sqft", bedrooms: 3, bathrooms: 2, description: "Modern design with great city views." },
  { name: "Rural House in Addis Ketema", level:1 , quantity: 2, price: "$180,000", sku: "H12352", category: "Residential", region: "Addis Ketema", area: "1200 sqft", bedrooms: 3, bathrooms: 2, description: "Affordable house with a large yard." },
  { name: "Historic Property in Arada", level:1 , quantity: 1, price: "$400,000", sku: "H12353", category: "Residential", region: "Arada", area: "3000 sqft", bedrooms: 6, bathrooms: 5, description: "A charming historic home close to the city center." },
  { name: "Eco-Friendly Home in Bole", level:1 , quantity: 4, price: "$270,000", sku: "H12354", category: "Residential", region: "Bole", area: "1300 sqft", bedrooms: 3, bathrooms: 2, description: "Sustainable living with solar panels." },
  { name: "Luxury Condo in Akaki kality", level:1 , quantity: 1, price: "$500,000", sku: "H12355", category: "Residential", region: "Akaki kality", area: "1600 sqft", bedrooms: 3, bathrooms: 3, description: "High-rise condo with stunning views." },
  { name: "Affordable Housing in Kirkos", level:1 , quantity: 10, price: "$80,000", sku: "H12356", category: "Residential", region: "Kirkos", area: "900 sqft", bedrooms: 2, bathrooms: 1, description: "Affordable housing solution in a great location." },
  
  // Additional entries to reach 100 properties
  { name: "Elegant Apartment in Bole", level:3 , quantity: 3, price: "$160,000", sku: "H12357", category: "Residential", region: "Bole", area: "1100 sqft", bedrooms: 3, bathrooms: 2, description: "Elegant apartment close to amenities." },
  { name: "Family Home in Lideta", level:3 , quantity: 2, price: "$270,000", sku: "H12358", category: "Residential", region: "Lideta", area: "1900 sqft", bedrooms: 4, bathrooms: 2, description: "Ideal for family living." },
  { name: "Stylish Condo in Arada", level:3 , quantity: 5, price: "$130,000", sku: "H12359", category: "Residential", region: "Arada", area: "850 sqft", bedrooms: 2, bathrooms: 1, description: "Stylish condo in a prime location." },
  { name: "Modern Villa in Gulele", level:3 , quantity: 1, price: "$320,000", sku: "H12360", category: "Residential", region: "Gulele", area: "2600 sqft", bedrooms: 5, bathrooms: 4, description: "Modern villa with luxurious features." },
  { name: "Stunning Penthouse in nefas selk lafto", level:3 , quantity: 1, price: "$360,000", sku: "H12363", category: "Residential", region: "nefas selk lafto", area: "2100 sqft", bedrooms: 4, bathrooms: 3, description: "Stunning penthouse with panoramic views." },
  { name: "Cozy House in Addis Ketema", level:3 , quantity: 3, price: "$190,000", sku: "H12364", category: "Residential", region: "Addis Ketema", area: "1300 sqft", bedrooms: 3, bathrooms: 2, description: "A cozy home perfect for families." },
  { name: "Grand Historic Home in Arada", level:3 , quantity: 1, price: "$420,000", sku: "H12365", category: "Residential", region: "Arada", area: "3100 sqft", bedrooms: 6, bathrooms: 5, description: "A grand historic home with unique architecture." },
  { name: "Spacious Villa in Gulele", level:1 , quantity: 2, price: "$300,000", sku: "H12348", category: "Residential", region: "Gulele", area: "2500 sqft", bedrooms: 5, bathrooms: 4, description: "Luxury villa with a pool." },
  { name: "Sustainable Home in Bole", level:3 , quantity: 2, price: "$280,000", sku: "H12366", category: "Residential", region: "Bole", area: "1350 sqft", bedrooms: 3, bathrooms: 2, description: "Eco-friendly home with modern design." },
  { name: "Penthouse Suite in nefas selk lafto", level:1 , quantity: 1, price: "$350,000", sku: "H12351", category: "Residential", region: "nefas selk lafto", area: "2000 sqft", bedrooms: 4, bathrooms: 3, description: "Stunning penthouse with rooftop access." },
  { name: "Luxury Flat in Akaki kality", level:3 , quantity: 1, price: "$520,000", sku: "H12367", category: "Residential", region: "Akaki kality", area: "1700 sqft", bedrooms: 3, bathrooms: 3, description: "Luxury flat with upscale amenities." },
  { name: "Budget Home in Kirkos", level:3 , quantity: 8, price: "$90,000", sku: "H12368", category: "Residential", region: "Kirkos", area: "950 sqft", bedrooms: 2, bathrooms: 1, description: "Budget-friendly home in a good location." },
  
  { name: "Stylish Apartment in Bole", level:3 , quantity: 3, price: "$165,000", sku: "H12369", category: "Residential", region: "Bole", area: "1150 sqft", bedrooms: 3, bathrooms: 2, description: "Stylish apartment close to parks." },
  { name: "Charming Home in Lideta", level:3 , quantity: 2, price: "$275,000", sku: "H12370", category: "Residential", region: "Lideta", area: "1950 sqft", bedrooms: 4, bathrooms: 2, description: "Charming home with a large yard." },
  { name: "Compact Condo in Arada", level:3 , quantity: 5, price: "$125,000", sku: "H12371", category: "Residential", region: "Arada", area: "900 sqft", bedrooms: 2, bathrooms: 1, description: "Perfect for urban living." },
  { name: "Elegant Villa in Gulele", level:3 , quantity: 1, price: "$310,000", sku: "H12372", category: "Residential", region: "Gulele", area: "2550 sqft", bedrooms: 5, bathrooms: 4, description: "Elegant villa with spacious rooms." },
  { name: "Relaxing Bungalow in Kolfe keraniyo", level:3 , quantity: 4, price: "$215,000", sku: "H12373", category: "Residential", region: "Kolfe keraniyo", area: "1550 sqft", bedrooms: 3, bathrooms: 2, description: "Relaxing bungalow in a peaceful area." },
  { name: "Modern Townhouse in Yeka", level:2 , quantity: 2, price: "$240,000", sku: "H12374", category: "Residential", region: "Yeka", area: "1500 sqft", bedrooms: 3, bathrooms: 2, description: "Modern townhouse with excellent views." },
  { name: "Luxury Penthouse in nefas selk lafto", level:2 , quantity: 1, price: "$380,000", sku: "H12375", category: "Residential", region: "nefas selk lafto", area: "2200 sqft", bedrooms: 4, bathrooms: 3, description: "Luxurious penthouse with top amenities." },
  { name: "Affordable House in Addis Ketema", level:2 , quantity: 3, price: "$200,000", sku: "H12376", category: "Residential", region: "Addis Ketema", area: "1250 sqft", bedrooms: 3, bathrooms: 2, description: "Affordable house with a big backyard." },
  { name: "Charming Historic Home in Arada", level:2 , quantity: 1, price: "$440,000", sku: "H12377", category: "Residential", region: "Arada", area: "3200 sqft", bedrooms: 6, bathrooms: 5, description: "Charming home with historical significance." },
  { name: "Eco-Friendly Apartment in Bole", level:2 , quantity: 2, price: "$290,000", sku: "H12378", category: "Residential", region: "Bole", area: "1400 sqft", bedrooms: 3, bathrooms: 2, description: "Eco-friendly apartment with modern features." },
  { name: "High-End Condo in Akaki kality", level:2 , quantity: 1, price: "$540,000", sku: "H12379", category: "Residential", region: "Akaki kality", area: "1800 sqft", bedrooms: 3, bathrooms: 3, description: "High-end condo with luxury finishes." },
  { name: "Value Home in Kirkos", level:2 , quantity: 8, price: "$95,000", sku: "H12380", category: "Residential", region: "Kirkos", area: "1000 sqft", bedrooms: 2, bathrooms: 1, description: "Value home in a great community." },
  
  { name: "Chic Apartment in Bole", level:2 , quantity: 3, price: "$170,000", sku: "H12381", category: "Residential", region: "Bole", area: "1250 sqft", bedrooms: 3, bathrooms: 2, description: "Chic apartment with modern design." },
  { name: "Family Villa in Lideta", level:2 , quantity: 2, price: "$290,000", sku: "H12382", category: "Residential", region: "Lideta", area: "2000 sqft", bedrooms: 4, bathrooms: 3, description: "Family villa with a spacious garden." },
  { name: "Compact Condo in Arada", level:2 , quantity: 5, price: "$135,000", sku: "H12383", category: "Residential", region: "Arada", area: "950 sqft", bedrooms: 2, bathrooms: 1, description: "Compact condo with easy access to transport." },
  { name: "Modern House in Lideta", level:1 , quantity: 2, price: "$295,000", sku: "H12394", category: "Residential", region: "Lideta", area: "2100 sqft", bedrooms: 4, bathrooms: 3, description: "Modern house with high-end features." },
  { name: "Modern Villa in Gulele", level:2 , quantity: 1, price: "$330,000", sku: "H12384", category: "Residential", region: "Gulele", area: "2700 sqft", bedrooms: 5, bathrooms: 4, description: "Modern villa with luxury features." },
  { name: "Stylish Townhouse in Yeka", level:2 , quantity: 2, price: "$250,000", sku: "H12386", category: "Residential", region: "Yeka", area: "1550 sqft", bedrooms: 3, bathrooms: 2, description: "Stylish townhouse with modern amenities." },
  { name: "Luxury Penthouse in nefas selk lafto", level:2 , quantity: 1, price: "$400,000", sku: "H12387", category: "Residential", region: "nefas selk lafto", area: "2300 sqft", bedrooms: 4, bathrooms: 3, description: "Luxury penthouse with stunning views." },
  { name: "Historic Home in Arada", level:2 , quantity: 1, price: "$450,000", sku: "H12389", category: "Residential", region: "Arada", area: "3300 sqft", bedrooms: 6, bathrooms: 5, description: "Historic home in a prime location." },
  { name: "Affordable House in Addis Ketema", level:2 , quantity: 3, price: "$200,000", sku: "H12376", category: "lemi kura", region: "Addis Ketema", area: "1250 sqft", bedrooms: 3, bathrooms: 2, description: "Affordable house with a big backyard." },
  { name: "Eco-Friendly House in Bole", level:2 , quantity: 2, price: "$300,000", sku: "H12390", category: "Residential", region: "Bole", area: "1450 sqft", bedrooms: 3, bathrooms: 2, description: "Eco-friendly house with sustainable features." },
  { name: "Luxury Apartment in Akaki kality", level:2 , quantity: 1, price: "$550,000", sku: "H12391", category: "Residential", region: "Akaki kality", area: "1900 sqft", bedrooms: 3, bathrooms: 3, description: "Luxury apartment with modern amenities." },
  
  { name: "Budget House in Kirkos", level:1 , quantity: 8, price: "$100,000", sku: "H12392", category: "Residential", region: "Kirkos", area: "1050 sqft", bedrooms: 2, bathrooms: 1, description: "Budget house in a friendly neighborhood." },
  { name: "Elegant Apartment in Bole", level:1 , quantity: 3, price: "$175,000", sku: "H12393", category: "Residential", region: "Bole", area: "1300 sqft", bedrooms: 3, bathrooms: 2, description: "Elegant apartment in a desirable area." },
  { name: "Elegant Villa in Gulele", level:2 , quantity: 1, price: "$310,000", sku: "H12372", category: "Residential", region: "lemi kura", area: "2550 sqft", bedrooms: 5, bathrooms: 4, description: "Elegant villa with spacious rooms." },
  { name: "Charming Condo in Arada", level:1 , quantity: 5, price: "$140,000", sku: "H12395", category: "Residential", region: "Arada", area: "950 sqft", bedrooms: 2, bathrooms: 1, description: "Charming condo in a vibrant neighborhood." },
  { name: "Luxury Villa in Gulele", level:1 , quantity: 1, price: "$340,000", sku: "H12396", category: "Residential", region: "Gulele", area: "2800 sqft", bedrooms: 5, bathrooms: 4, description: "Luxury villa with exquisite design." },
  { name: "Cozy Bungalow in Kolfe keraniyo", level:2 , quantity: 4, price: "$220,000", sku: "H12385", category: "Residential", region: "Kolfe keraniyo", area: "1600 sqft", bedrooms: 3, bathrooms: 2, description: "Cozy bungalow in a quiet neighborhood." },
  { name: "Cozy Bungalow in Kolfe keraniyo", level:1 , quantity: 4, price: "$225,000", sku: "H12397", category: "Residential", region: "Kolfe keraniyo", area: "1650 sqft", bedrooms: 3, bathrooms: 2, description: "Cozy bungalow in a peaceful area." },
  { name: "Modern Townhouse in Yeka", level:1 , quantity: 2, price: "$260,000", sku: "H12398", category: "Residential", region: "Yeka", area: "1600 sqft", bedrooms: 3, bathrooms: 2, description: "Modern townhouse with great city views." },
  { name: "Penthouse in nefas selk lafto", level:1 , quantity: 1, price: "$420,000", sku: "H12399", category: "Residential", region: "nefas selk lafto", area: "2400 sqft", bedrooms: 4, bathrooms: 3, description: "Luxurious penthouse with upscale amenities." },
  { name: "Affordable House in Addis Ketema", level:1 , quantity: 3, price: "$220,000", sku: "H12400", category: "Residential", region: "Addis Ketema", area: "1350 sqft", bedrooms: 3, bathrooms: 2, description: "Affordable house with a spacious garden." },
  
  { name: "Stylish Apartment in Bole", level:1 , quantity: 3, price: "$165,000", sku: "H12369", category: "Residential", region: "lemi kura", area: "1150 sqft", bedrooms: 3, bathrooms: 2, description: "Stylish apartment close to parks." },
  { name: "Affordable Home in Addis Ketema", level:2 , quantity: 3, price: "$210,000", sku: "H12388", category: "Residential", region: "Addis Ketema", area: "1300 sqft", bedrooms: 3, bathrooms: 2, description: "Affordable home with a spacious yard." },
  { name: "Charming Home in Lideta", level:1 , quantity: 2, price: "$275,000", sku: "H12370", category: "Residential", region: "lemi kura", area: "1950 sqft", bedrooms: 4, bathrooms: 2, description: "Charming home with a large yard." },
  { name: "Compact Condo in Arada", level:1 , quantity: 5, price: "$125,000", sku: "H12371", category: "Residential", region: "lemi kura", area: "900 sqft", bedrooms: 2, bathrooms: 1, description: "Perfect for urban living." },
  { name: "Relaxing Bungalow in Kolfe keraniyo", level:2 , quantity: 4, price: "$215,000", sku: "H12373", category: "Residential", region: "lemi kura", area: "1550 sqft", bedrooms: 3, bathrooms: 2, description: "Relaxing bungalow in a peaceful area." },
  { name: "Modern Townhouse in Yeka", level:2 , quantity: 2, price: "$240,000", sku: "H12374", category: "Residential", region: "lemi kura", area: "1500 sqft", bedrooms: 3, bathrooms: 2, description: "Modern townhouse with excellent views." },
  { name: "Luxury Penthouse in nefas selk lafto", level:2 , quantity: 1, price: "$380,000", sku: "H12375", category: "lemi kura", region: "nefas selk lafto", area: "2200 sqft", bedrooms: 4, bathrooms: 3, description: "Luxurious penthouse with top amenities." },
  { name: "Charming Historic Home in Arada", level:2 , quantity: 1, price: "$440,000", sku: "H12377", category: "lemi kura", region: "Arada", area: "3200 sqft", bedrooms: 6, bathrooms: 5, description: "Charming home with historical significance." },
  { name: "Eco-Friendly Apartment in lemi kura", level:2 , quantity: 2, price: "$290,000", sku: "H12378", category: "lemi kura", region: "lemi kura", area: "1400 sqft", bedrooms: 3, bathrooms: 2, description: "Eco-friendly apartment with modern features." },
 
  // More properties can be added here following the same structure
];  
 

const regions = ["Bole", "Lideta", "Arada", "Gulele", "Kolfe keraniyo", "Yeka", "nefas selk lafto", "Addis Ketema", "Akaki kality", "Kirkos", "lemi kura"];
const levels = [1, 2, 3]; // Assuming levels are numbers

const TaxTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filteredRegion, setFilteredRegion] = useState("");
  const [filteredLevel, setFilteredLevel] = useState(""); // Use filteredLevel for filtering
  const [showGraph, setShowGraph] = useState(false); // State to toggle between table and graph
  const rowsPerPage = 10;

  const totalPages = Math.ceil(predefinedPropertyData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;

  const currentData = predefinedPropertyData
    .filter(property => 
      (!filteredRegion || property.region === filteredRegion) && 
      (!filteredLevel || property.level === parseInt(filteredLevel)) // Add filter for level
    )
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

  const handleRegionFilterChange = (region) => {
    setFilteredRegion(region);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleLevelFilterChange = (level) => {
    setFilteredLevel(level);
    setCurrentPage(1); // Reset to first page when filtering
  };

  return (
    <div className="relative">
      <div className="p-4 rounded border border-stone-300">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Properties Tax in Addis Ababa</h3>
          <div className="flex items-center gap-2">
            <button 
              className="flex items-center text-sm text-violet-500 hover:underline"
              onClick={() => handleRegionFilterChange("")}
            >
              <FiFilter className="mr-1" /> Filter
            </button>
            <select 
              className="border rounded p-1 text-sm outline-none"
              value={filteredRegion}
              onChange={(e) => handleRegionFilterChange(e.target.value)}
            >
              <option value="">All Regions</option>
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>

            <select 
              className="border rounded p-1 text-sm outline-none"
              value={filteredLevel}
              onChange={(e) => handleLevelFilterChange(e.target.value)}
            >
              <option value="">All Levels</option>
              {levels.map((level) => (
                <option key={level} value={level}>{level}</option>
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
          <Tax data={currentData} /> // Use ForsellGraph component
        ) : (
          <>
            <table className="w-full table-auto border-collapse">
              <TableHead />
              <tbody>
                {currentData.map((item, index) => (
                  <TableRow
                    key={index}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    sku={item.sku}
                    category={item.category}
                    region={item.region}
                    level={item.level} // Include the level
                    onClick={() => openDetail(item)}
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
        <th className="text-start p-2">Quantity</th>
        <th className="text-start p-2">Price</th>
        <th className="text-start p-2">Level</th>
        <th className="text-start p-2">Region</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({ name, quantity, price, level, sku, category, region, onClick, order }) => {
  return (
    <tr onClick={onClick} className={`${order % 2 === 0 ? "bg-white" : "bg-zinc-200"} hover:bg-gray-100 cursor-pointer`}>
      <td className="p-2">
        <a className="underline flex items-center gap-1">
          {name} <FiArrowUpRight />
        </a>
      </td>
      <td className="p-2">{quantity}</td>
      <td className="p-2">{price}</td>
      <td className="p-2">{level}</td>
      <td className="p-2">{region}</td>
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
      className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50"
      onClick={onOutsideClick}
    >
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <button
          className="absolute top-3 right-3 text-xl"
          onClick={onClose}
        >
          <FiX />
        </button>
        <h4 className="text-lg font-semibold">{property.name}</h4>
        <p>Level: {property.level}</p>
        <p>Price: {property.price}</p>
        <p>Category: {property.category}</p>
        <p>Region: {property.region}</p>
        <p>Area: {property.area}</p>
        <p>Bedrooms: {property.bedrooms}</p>
        <p>Bathrooms: {property.bathrooms}</p>
        <p>{property.description}</p>
      </div>
    </div>
  );
};

export default TaxTable;
