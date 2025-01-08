"use client";

import React from "react";
import { FiEye } from "react-icons/fi";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

const data = [
  { feature: "targeted", Collected: 15, targeted: 110, max: 150 },
  { feature: "selling", Collected: 130, targeted: 90, max: 150 },
  { feature: "Collected", Collected: 86, targeted: 130, max: 150 },
  { feature: "next year", Collected: 125, targeted: 40, max: 150 },
  { feature: "last year", Collected: 148, targeted: 90, max: 150 },
];

export const Barchart = () => {
  return (
    <div className="col-span-4 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiEye /> Usage
        </h3>
      </div>

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} className="text-sm">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="feature" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="targeted" fill="#8884d8" />
            <Bar dataKey="Collected" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
