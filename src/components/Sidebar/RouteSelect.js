"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation"; 
import {
  FiDollarSign,
  FiLink,
  FiUsers,
} from "react-icons/fi";

import { MdDashboard } from "react-icons/md";
import { BsFileBarGraph, BsHouse, BsHouseAdd, BsPaperclip } from "react-icons/bs";
import { GrContact } from "react-icons/gr";
import { FaHandPaper, FaPaperPlane, FaParagraph } from "react-icons/fa";
import { userAgent } from "next/server";
import { FaUser } from "react-icons/fa6";

export const RouteSelect = () => {
  const pathname = usePathname(); // Get the current path

  return (
    <div className="space-y-1">
      <Link href={"/dashboard"}>
        <Route
          Icon={MdDashboard}
          selected={pathname === "/dashboard"}
          title="Dashboard"
        />
      </Link>

      <Link href={"/forsell"}>
        <Route
          Icon={BsHouseAdd}
          selected={pathname === "/forsell"}
          title="For Sell"
        />
      </Link>

      <Link href={"/sold"}>
        <Route
          Icon={BsHouse}
          selected={pathname === "/sold"}
          title="Sold"
        />
      </Link>

      <Link href={"/tax"}>
        <Route
          Icon={BsPaperclip}
          selected={pathname === "/tax"}
          title="Tax"
        />
      </Link>

      <Link href={"/report"}>
        <Route
          Icon={BsFileBarGraph}
          selected={pathname === "/report"}
          title="Reports"
        />
      </Link>

    
      <Link href={"/bookings"}>
        <Route
          Icon={BsHouse}
          selected={pathname === "/bookings"}
          title="Bookings"
        />
      </Link>
      <Link href={"/addadmin"}>
        <Route
          Icon={FiLink}
          selected={pathname === "/addadmin"} // Fixed the path for "Add Admin"
          title="Add Admin"
        />
      </Link>
      <Link href={"/role"}>
        <Route
          Icon={FaUser}
          selected={pathname === "/role"} // Fixed the path for "Add Admin"
          title="Role"
        />
      </Link>
    </div>
  );
};

const Route = ({ selected, Icon, title }) => {
  return (
    <button
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-md transition-[box-shadow,_background-color,_color] ${
        selected
        ? "bg-white text-stone-950 shadow"
        : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}
    >
      <Icon className={selected ? "text-violet-500" : ""} />
      <span className="text-[14px]">{title}</span>
    </button>
  );
};