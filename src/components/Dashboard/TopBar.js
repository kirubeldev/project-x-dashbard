import React from "react";
import { FiCalendar } from "react-icons/fi";

export const TopBar = () => {
  // Get the current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="border-bpx-5 bg-white pt-4 px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">🚀 Good morning, Kibrom!</span>
          <span className="text-xs ml-2 block text-stone-500">{formattedDate}</span>
        </div>

        <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
          <FiCalendar />
          <select className="outline-none ">
            <option>{currentDate.getFullYear()}</option>
            <option>{currentDate.getFullYear() - 1}</option>
            <option>{currentDate.getFullYear() - 2}</option>
            <option>{currentDate.getFullYear() - 3}</option>
          </select>
        </button>
      </div>
    </div>
  );
};
