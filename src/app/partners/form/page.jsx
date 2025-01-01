"use client";
import React, { useState } from "react";

const PartnerRegistrationForm = () => {
  const [formData, setFormData] = useState({
    partnerName: "",
    contactPerson: "",
    email: "",
    phone: "",
    registrationNumber: "",
    address: "",
    location: "",
    yearEstablished: "",
    propertiesManaged: "",
    website: "",
    status: "Active",
    communication: [],
    remarks: "",
    licenseFile: null,
    taxCertificateFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      communication: checked
        ? [...prev.communication, value]
        : prev.communication.filter((item) => item !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // For debugging
    alert("Form Submitted");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mt-[60px] mx-auto p-8 bg-white shadow-lg rounded-lg overflow-y-auto"
    >
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Register a New Partner</h2>

      <div className="space-y-6">
        {/* Partner Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Partner Name</label>
          <input
            type="text"
            name="partnerName"
            value={formData.partnerName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter partner name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter contact person's name"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter phone number"
              required
            />
          </div>
        </div>

        {/* Business Information */}
      

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Business License</label>
          <input
            type="file"
            name="licenseFile"
            onChange={handleFileChange}
            className="w-full text-gray-500"
            required
          />
        </div>

        {/* Remarks */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter any remarks"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
        >
          Register Partner
        </button>
      </div>
    </form>
  );
};

export default PartnerRegistrationForm;
