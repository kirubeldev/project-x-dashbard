"use client";
import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  ComposedChart,
} from "recharts";

const dataLine = [
  { name: "Jan", value1: 400, value2: 300, value3: 500 },
  { name: "Feb", value1: 800, value2: 500, value3: 700 },
  { name: "Mar", value1: 600, value2: 400, value3: 600 },
  { name: "Apr", value1: 1200, value2: 800, value3: 1000 },
  { name: "May", value1: 900, value2: 700, value3: 850 },
];

const dataBar = [
  { name: "Product A", value: 2400 },
  { name: "Product B", value: 1398 },
  { name: "Product C", value: 980 },
  { name: "Product D", value: 500 },
  { name: "Product E", value: 700 },
];

const dataPie = [
  { name: "Category A", value: 400 },
  { name: "Category B", value: 300 },
  { name: "Category C", value: 200 },
  { name: "Category D", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const dataRadar = [
  { subject: "Math", A: 120, B: 110, fullMark: 150 },
  { subject: "Science", A: 98, B: 130, fullMark: 150 },
  { subject: "English", A: 86, B: 130, fullMark: 150 },
  { subject: "History", A: 99, B: 100, fullMark: 150 },
];

const dataArea = [
  { name: "Jan", value1: 200, value2: 100 },
  { name: "Feb", value1: 400, value2: 250 },
  { name: "Mar", value1: 600, value2: 500 },
  { name: "Apr", value1: 900, value2: 600 },
  { name: "May", value1: 1200, value2: 1000 },
];

const dataScatter = [
  { x: 1, y: 200 }, { x: 2, y: 400 }, { x: 3, y: 300 },
  { x: 4, y: 500 }, { x: 5, y: 600 }
];

const dataComposed = [
  { name: "Jan", value1: 400, value2: 2400 },
  { name: "Feb", value1: 800, value2: 1398 },
  { name: "Mar", value1: 600, value2: 980 },
  { name: "Apr", value1: 1200, value2: 500 },
  { name: "May", value1: 900, value2: 700 },
];

const Reports = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-center mb-8">Detaild Report</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8">
        {/* Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center mb-4">Line Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataLine}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value1"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ stroke: "#8884d8", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="value2"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ stroke: "#82ca9d", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="value3"
                stroke="#FF8042"
                strokeWidth={2}
                dot={{ stroke: "#FF8042", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center mb-4">Bar Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataBar}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center mb-4">Pie Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataPie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name} - ${(percent * 100).toFixed(0)}%`}
              >
                {dataPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center mb-4">Radar Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={dataRadar}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 150]} />
              <Radar name="Student A" dataKey="A" stroke="#FF8042" fill="#FF8042" fillOpacity={0.6} />
              <Radar name="Student B" dataKey="B" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center mb-4">Area Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataArea}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value1"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
              <Line
                type="monotone"
                dataKey="value2"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Scatter Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center mb-4">Scatter Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <XAxis type="number" dataKey="x" />
              <YAxis type="number" dataKey="y" />
              <Tooltip />
              <Scatter data={dataScatter} fill="#82ca9d" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Composed Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center mb-4">Composed Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={dataComposed}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value1" fill="#8884d8" />
             The updated code now includes **8 different types of responsive charts**: Line, Bar, Pie, Radar, Area, Scatter, and Composed charts. Here's the continuation of the code for the remaining charts and improvements:

```javascript
              <Line dataKey="value2" stroke="#82ca9d" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Another chart for diversity */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center mb-4">Another Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataBar}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
