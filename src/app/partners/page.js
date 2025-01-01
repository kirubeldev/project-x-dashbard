"use client"
import React, { useState } from "react";
import { PartnersList } from "./listofPartners";
import { FaPlus, FaTable, FaThLarge } from "react-icons/fa";
import { PatternTable } from "./Partnertable";
import Link from "next/link";

const Partner = () => {
  const [view, setView] = useState("table"); // Default view is table

  return (
    <div className="mt-[30px]">
      {/* Header Section */}
      <div className="flex w-full items-center justify-end gap-4 mb-6 px-4">
        <select
        
        defaultValue={"View"}
          className="px-3 py-2 bg-white text-stone-700 border border-stone-300 rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-0"
          onChange={(e) => setView(e.target.value)}
          value={view}
        >
         
          <option value="table" className="flex items-center">
            <FaTable className="mr-2" /> Table
          </option>
          <option value="card" className="flex items-center">
            <FaThLarge className="mr-2" /> Card
          </option>
        </select>
        {/* Add Partner Button */}
        <Link href={"/partners/form"}>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
          <FaPlus />
          <span>New Partner</span>
        </button>
        </Link>

        {/* View Selector */}
      </div>

      {/* View Section */}
      <div className="gap-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {view === "card" ? (
          <>
            <PartnersList
              image={"/ovid.jpeg"}
              name={"ovid Realstate"}
              status={"Active"}
              location={"Megenagna"}
              phone={"0923114332"}
            />
            <PartnersList
              image={"/hayat.jpeg"}
              name={"Hayat Realstate"}
              status={"Active"}
              location={"Megenagna"}
              phone={"0923311332"}
            />
            <PartnersList
              image={"/ovid.jpeg"}
              name={"ovid Realstate"}
              status={"Active"}
              location={"Megenagna"}
              phone={"0922114332"}
            />
            <PartnersList
              image={"/flintstone.jpeg"}
              name={"Flintstone Realstate"}
              status={"Active"}
              location={"Megenagna"}
              phone={"0523114332"}
            />
            <PartnersList
              image={"/ovid.jpeg"}
              name={"ovid Realstate"}
              status={"Active"}
              location={"Megenagna"}
              phone={"090984332"}
            />
            <PartnersList
              image={"/legacy.png"}
              name={"Legacy Realstate"}
              status={"Active"}
              location={"Megenagna"}
              phone={"098014332"}
            />
            <PartnersList
              image={"/noah.jpeg"}
              name={"Noah Realstate"}
              status={"Active"}
              location={"Megenagna"}
              phone={"092314332"}
            />
            <PartnersList
              image={"/tshay.jpeg"}
              name={"Tshay Realstate"}
              status={"Active"}
              location={"Megenagna"}
              phone={"0953114332"}
            />
            <PartnersList
              image={"/gift.jpeg"}
              name={"Gift Realstate"}
              status={"Active"}
              location={"Megenagna"}
              phone={"0979114332"}
            />
          </>
        ) : (
          <PatternTable />
        )}
      </div>
    </div>
  );
};

export default Partner;
