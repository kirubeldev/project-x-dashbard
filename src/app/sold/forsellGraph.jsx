"use client";

import React from "react";
import { FaHouse } from "react-icons/fa6";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
  Bar,
  BarChart,
} from "recharts";

// Example data array (truncated for brevity)
const data = [
    { name: "Luxury Apartment in Bole", quantity: 5, price: "$150,000", sku: "H12345", category: "Residential", region: "Bole", area: "1200 sqft", bedrooms: 3, bathrooms: 2, description: "A modern apartment with high-end finishes." },
    { name: "Modern House in Lideta", quantity: 3, price: "$250,000", sku: "H12346", category: "Residential", region: "Lideta", area: "1800 sqft", bedrooms: 4, bathrooms: 3, description: "Spacious home with a beautiful garden." },
    { name: "Cozy Condo in Arada", quantity: 4, price: "$120,000", sku: "H12347", category: "Residential", region: "Arada", area: "800 sqft", bedrooms: 2, bathrooms: 1, description: "Perfect for singles or couples." },
    { name: "Spacious Villa in Gulele", quantity: 2, price: "$300,000", sku: "H12348", category: "Residential", region: "Gulele", area: "2500 sqft", bedrooms: 5, bathrooms: 4, description: "Luxury villa with a pool." },
    { name: "Charming Bungalow in Kolfe keraniyo", quantity: 6, price: "$200,000", sku: "H12349", category: "Residential", region: "Kolfe keraniyo", area: "1500 sqft", bedrooms: 3, bathrooms: 2, description: "A cozy home in a quiet neighborhood." },
    { name: "Contemporary Townhouse in Yeka", quantity: 1, price: "$220,000", sku: "H12350", category: "Residential", region: "Yeka", area: "1400 sqft", bedrooms: 3, bathrooms: 2, description: "Modern design with great city views." },
    { name: "Penthouse Suite in nefas selk lafto", quantity: 1, price: "$350,000", sku: "H12351", category: "Residential", region: "nefas selk lafto", area: "2000 sqft", bedrooms: 4, bathrooms: 3, description: "Stunning penthouse with rooftop access." },
    { name: "Rural House in Addis Ketema", quantity: 2, price: "$180,000", sku: "H12352", category: "Residential", region: "Addis Ketema", area: "1200 sqft", bedrooms: 3, bathrooms: 2, description: "Affordable house with a large yard." },
    { name: "Historic Property in Arada", quantity: 1, price: "$400,000", sku: "H12353", category: "Residential", region: "Arada", area: "3000 sqft", bedrooms: 6, bathrooms: 5, description: "A charming historic home close to the city center." },
    { name: "Eco-Friendly Home in Bole", quantity: 4, price: "$270,000", sku: "H12354", category: "Residential", region: "Bole", area: "1300 sqft", bedrooms: 3, bathrooms: 2, description: "Sustainable living with solar panels." },
    { name: "Luxury Condo in Akaki kality", quantity: 1, price: "$500,000", sku: "H12355", category: "Residential", region: "Akaki kality", area: "1600 sqft", bedrooms: 3, bathrooms: 3, description: "High-rise condo with stunning views." },
    { name: "Affordable Housing in Kirkos", quantity: 10, price: "$80,000", sku: "H12356", category: "Residential", region: "Kirkos", area: "900 sqft", bedrooms: 2, bathrooms: 1, description: "Affordable housing solution in a great location." },
    
    // Additional entries to reach 100 properties
    { name: "Elegant Apartment in Bole", quantity: 3, price: "$160,000", sku: "H12357", category: "Residential", region: "Bole", area: "1100 sqft", bedrooms: 3, bathrooms: 2, description: "Elegant apartment close to amenities." },
    { name: "Family Home in Lideta", quantity: 2, price: "$270,000", sku: "H12358", category: "Residential", region: "Lideta", area: "1900 sqft", bedrooms: 4, bathrooms: 2, description: "Ideal for family living." },
    { name: "Stylish Condo in Arada", quantity: 5, price: "$130,000", sku: "H12359", category: "Residential", region: "Arada", area: "850 sqft", bedrooms: 2, bathrooms: 1, description: "Stylish condo in a prime location." },
    { name: "Modern Villa in Gulele", quantity: 1, price: "$320,000", sku: "H12360", category: "Residential", region: "Gulele", area: "2600 sqft", bedrooms: 5, bathrooms: 4, description: "Modern villa with luxurious features." },
    { name: "Comfortable Bungalow in Kolfe keraniyo", quantity: 4, price: "$210,000", sku: "H12361", category: "Residential", region: "Kolfe keraniyo", area: "1400 sqft", bedrooms: 3, bathrooms: 2, description: "Comfortable living in a friendly neighborhood." },
    { name: "Chic Townhouse in Yeka", quantity: 2, price: "$230,000", sku: "H12362", category: "Residential", region: "Yeka", area: "1450 sqft", bedrooms: 3, bathrooms: 2, description: "Chic townhouse with modern amenities." },
    { name: "Stunning Penthouse in nefas selk lafto", quantity: 1, price: "$360,000", sku: "H12363", category: "Residential", region: "nefas selk lafto", area: "2100 sqft", bedrooms: 4, bathrooms: 3, description: "Stunning penthouse with panoramic views." },
    { name: "Cozy House in Addis Ketema", quantity: 3, price: "$190,000", sku: "H12364", category: "Residential", region: "Addis Ketema", area: "1300 sqft", bedrooms: 3, bathrooms: 2, description: "A cozy home perfect for families." },
    { name: "Grand Historic Home in Arada", quantity: 1, price: "$420,000", sku: "H12365", category: "Residential", region: "Arada", area: "3100 sqft", bedrooms: 6, bathrooms: 5, description: "A grand historic home with unique architecture." },
    { name: "Sustainable Home in Bole", quantity: 2, price: "$280,000", sku: "H12366", category: "Residential", region: "Bole", area: "1350 sqft", bedrooms: 3, bathrooms: 2, description: "Eco-friendly home with modern design." },
    { name: "Luxury Flat in Akaki kality", quantity: 1, price: "$520,000", sku: "H12367", category: "Residential", region: "Akaki kality", area: "1700 sqft", bedrooms: 3, bathrooms: 3, description: "Luxury flat with upscale amenities." },
    { name: "Budget Home in Kirkos", quantity: 8, price: "$90,000", sku: "H12368", category: "Residential", region: "Kirkos", area: "950 sqft", bedrooms: 2, bathrooms: 1, description: "Budget-friendly home in a good location." },
    
    { name: "Stylish Apartment in Bole", quantity: 3, price: "$165,000", sku: "H12369", category: "Residential", region: "Bole", area: "1150 sqft", bedrooms: 3, bathrooms: 2, description: "Stylish apartment close to parks." },
    { name: "Charming Home in Lideta", quantity: 2, price: "$275,000", sku: "H12370", category: "Residential", region: "Lideta", area: "1950 sqft", bedrooms: 4, bathrooms: 2, description: "Charming home with a large yard." },
    { name: "Compact Condo in Arada", quantity: 5, price: "$125,000", sku: "H12371", category: "Residential", region: "Arada", area: "900 sqft", bedrooms: 2, bathrooms: 1, description: "Perfect for urban living." },
    { name: "Elegant Villa in Gulele", quantity: 1, price: "$310,000", sku: "H12372", category: "Residential", region: "Gulele", area: "2550 sqft", bedrooms: 5, bathrooms: 4, description: "Elegant villa with spacious rooms." },
    { name: "Relaxing Bungalow in Kolfe keraniyo", quantity: 4, price: "$215,000", sku: "H12373", category: "Residential", region: "Kolfe keraniyo", area: "1550 sqft", bedrooms: 3, bathrooms: 2, description: "Relaxing bungalow in a peaceful area." },
    { name: "Modern Townhouse in Yeka", quantity: 2, price: "$240,000", sku: "H12374", category: "Residential", region: "Yeka", area: "1500 sqft", bedrooms: 3, bathrooms: 2, description: "Modern townhouse with excellent views." },
    { name: "Luxury Penthouse in nefas selk lafto", quantity: 1, price: "$380,000", sku: "H12375", category: "Residential", region: "nefas selk lafto", area: "2200 sqft", bedrooms: 4, bathrooms: 3, description: "Luxurious penthouse with top amenities." },
    { name: "Affordable House in Addis Ketema", quantity: 3, price: "$200,000", sku: "H12376", category: "Residential", region: "Addis Ketema", area: "1250 sqft", bedrooms: 3, bathrooms: 2, description: "Affordable house with a big backyard." },
    { name: "Charming Historic Home in Arada", quantity: 1, price: "$440,000", sku: "H12377", category: "Residential", region: "Arada", area: "3200 sqft", bedrooms: 6, bathrooms: 5, description: "Charming home with historical significance." },
    { name: "Eco-Friendly Apartment in Bole", quantity: 2, price: "$290,000", sku: "H12378", category: "Residential", region: "Bole", area: "1400 sqft", bedrooms: 3, bathrooms: 2, description: "Eco-friendly apartment with modern features." },
    { name: "High-End Condo in Akaki kality", quantity: 1, price: "$540,000", sku: "H12379", category: "Residential", region: "Akaki kality", area: "1800 sqft", bedrooms: 3, bathrooms: 3, description: "High-end condo with luxury finishes." },
    { name: "Value Home in Kirkos", quantity: 8, price: "$95,000", sku: "H12380", category: "Residential", region: "Kirkos", area: "1000 sqft", bedrooms: 2, bathrooms: 1, description: "Value home in a great community." },
    
    { name: "Chic Apartment in Bole", quantity: 3, price: "$170,000", sku: "H12381", category: "Residential", region: "Bole", area: "1250 sqft", bedrooms: 3, bathrooms: 2, description: "Chic apartment with modern design." },
    { name: "Family Villa in Lideta", quantity: 2, price: "$290,000", sku: "H12382", category: "Residential", region: "Lideta", area: "2000 sqft", bedrooms: 4, bathrooms: 3, description: "Family villa with a spacious garden." },
    { name: "Compact Condo in Arada", quantity: 5, price: "$135,000", sku: "H12383", category: "Residential", region: "Arada", area: "950 sqft", bedrooms: 2, bathrooms: 1, description: "Compact condo with easy access to transport." },
    { name: "Modern Villa in Gulele", quantity: 1, price: "$330,000", sku: "H12384", category: "Residential", region: "Gulele", area: "2700 sqft", bedrooms: 5, bathrooms: 4, description: "Modern villa with luxury features." },
    { name: "Cozy Bungalow in Kolfe keraniyo", quantity: 4, price: "$220,000", sku: "H12385", category: "Residential", region: "Kolfe keraniyo", area: "1600 sqft", bedrooms: 3, bathrooms: 2, description: "Cozy bungalow in a quiet neighborhood." },
    { name: "Stylish Townhouse in Yeka", quantity: 2, price: "$250,000", sku: "H12386", category: "Residential", region: "Yeka", area: "1550 sqft", bedrooms: 3, bathrooms: 2, description: "Stylish townhouse with modern amenities." },
    { name: "Luxury Penthouse in nefas selk lafto", quantity: 1, price: "$400,000", sku: "H12387", category: "Residential", region: "nefas selk lafto", area: "2300 sqft", bedrooms: 4, bathrooms: 3, description: "Luxury penthouse with stunning views." },
    { name: "Affordable Home in Addis Ketema", quantity: 3, price: "$210,000", sku: "H12388", category: "Residential", region: "Addis Ketema", area: "1300 sqft", bedrooms: 3, bathrooms: 2, description: "Affordable home with a spacious yard." },
    { name: "Historic Home in Arada", quantity: 1, price: "$450,000", sku: "H12389", category: "Residential", region: "Arada", area: "3300 sqft", bedrooms: 6, bathrooms: 5, description: "Historic home in a prime location." },
    { name: "Eco-Friendly House in Bole", quantity: 2, price: "$300,000", sku: "H12390", category: "Residential", region: "Bole", area: "1450 sqft", bedrooms: 3, bathrooms: 2, description: "Eco-friendly house with sustainable features." },
    { name: "Luxury Apartment in Akaki kality", quantity: 1, price: "$550,000", sku: "H12391", category: "Residential", region: "Akaki kality", area: "1900 sqft", bedrooms: 3, bathrooms: 3, description: "Luxury apartment with modern amenities." },
    
    { name: "Budget House in Kirkos", quantity: 8, price: "$100,000", sku: "H12392", category: "Residential", region: "Kirkos", area: "1050 sqft", bedrooms: 2, bathrooms: 1, description: "Budget house in a friendly neighborhood." },
    { name: "Elegant Apartment in Bole", quantity: 3, price: "$175,000", sku: "H12393", category: "Residential", region: "Bole", area: "1300 sqft", bedrooms: 3, bathrooms: 2, description: "Elegant apartment in a desirable area." },
    { name: "Modern House in Lideta", quantity: 2, price: "$295,000", sku: "H12394", category: "Residential", region: "Lideta", area: "2100 sqft", bedrooms: 4, bathrooms: 3, description: "Modern house with high-end features." },
    { name: "Charming Condo in Arada", quantity: 5, price: "$140,000", sku: "H12395", category: "Residential", region: "Arada", area: "950 sqft", bedrooms: 2, bathrooms: 1, description: "Charming condo in a vibrant neighborhood." },
    { name: "Luxury Villa in Gulele", quantity: 1, price: "$340,000", sku: "H12396", category: "Residential", region: "Gulele", area: "2800 sqft", bedrooms: 5, bathrooms: 4, description: "Luxury villa with exquisite design." },
    { name: "Cozy Bungalow in Kolfe keraniyo", quantity: 4, price: "$225,000", sku: "H12397", category: "Residential", region: "Kolfe keraniyo", area: "1650 sqft", bedrooms: 3, bathrooms: 2, description: "Cozy bungalow in a peaceful area." },
    { name: "Modern Townhouse in Yeka", quantity: 2, price: "$260,000", sku: "H12398", category: "Residential", region: "Yeka", area: "1600 sqft", bedrooms: 3, bathrooms: 2, description: "Modern townhouse with great city views." },
    { name: "Penthouse in nefas selk lafto", quantity: 1, price: "$420,000", sku: "H12399", category: "Residential", region: "nefas selk lafto", area: "2400 sqft", bedrooms: 4, bathrooms: 3, description: "Luxurious penthouse with upscale amenities." },
    { name: "Affordable House in Addis Ketema", quantity: 3, price: "$220,000", sku: "H12400", category: "Residential", region: "Addis Ketema", area: "1350 sqft", bedrooms: 3, bathrooms: 2, description: "Affordable house with a spacious garden." },
    
    { name: "Stylish Apartment in Bole", quantity: 3, price: "$165,000", sku: "H12369", category: "Residential", region: "lemi kura", area: "1150 sqft", bedrooms: 3, bathrooms: 2, description: "Stylish apartment close to parks." },
    { name: "Charming Home in Lideta", quantity: 2, price: "$275,000", sku: "H12370", category: "Residential", region: "lemi kura", area: "1950 sqft", bedrooms: 4, bathrooms: 2, description: "Charming home with a large yard." },
    { name: "Compact Condo in Arada", quantity: 5, price: "$125,000", sku: "H12371", category: "Residential", region: "lemi kura", area: "900 sqft", bedrooms: 2, bathrooms: 1, description: "Perfect for urban living." },
    { name: "Elegant Villa in Gulele", quantity: 1, price: "$310,000", sku: "H12372", category: "Residential", region: "lemi kura", area: "2550 sqft", bedrooms: 5, bathrooms: 4, description: "Elegant villa with spacious rooms." },
    { name: "Relaxing Bungalow in Kolfe keraniyo", quantity: 4, price: "$215,000", sku: "H12373", category: "Residential", region: "lemi kura", area: "1550 sqft", bedrooms: 3, bathrooms: 2, description: "Relaxing bungalow in a peaceful area." },
    { name: "Modern Townhouse in Yeka", quantity: 2, price: "$240,000", sku: "H12374", category: "Residential", region: "lemi kura", area: "1500 sqft", bedrooms: 3, bathrooms: 2, description: "Modern townhouse with excellent views." },
    { name: "Luxury Penthouse in nefas selk lafto", quantity: 1, price: "$380,000", sku: "H12375", category: "lemi kura", region: "nefas selk lafto", area: "2200 sqft", bedrooms: 4, bathrooms: 3, description: "Luxurious penthouse with top amenities." },
    { name: "Affordable House in Addis Ketema", quantity: 3, price: "$200,000", sku: "H12376", category: "lemi kura", region: "Addis Ketema", area: "1250 sqft", bedrooms: 3, bathrooms: 2, description: "Affordable house with a big backyard." },
    { name: "Charming Historic Home in Arada", quantity: 1, price: "$440,000", sku: "H12377", category: "lemi kura", region: "Arada", area: "3200 sqft", bedrooms: 6, bathrooms: 5, description: "Charming home with historical significance." },
    { name: "Eco-Friendly Apartment in lemi kura", quantity: 2, price: "$290,000", sku: "H12378", category: "lemi kura", region: "lemi kura", area: "1400 sqft", bedrooms: 3, bathrooms: 2, description: "Eco-friendly apartment with modern features." },
   
    // More properties can be added here following the same structure
  ]; 

const processData = (data) => {
  const regionPriceMap = {};

  data.forEach((property) => {
    const region = property.region;
    const price = parseFloat(property.price.replace(/[$,]/g, ""));
    
    if (regionPriceMap[region]) {
      regionPriceMap[region].totalPrice += price;
      regionPriceMap[region].quantity += property.quantity; // Sum quantity for bar chart
      regionPriceMap[region].averagePrice = regionPriceMap[region].totalPrice / regionPriceMap[region].quantity; // Calculate average price
    } else {
      regionPriceMap[region] = {
        totalPrice: price,
        quantity: property.quantity,
        averagePrice: price,
      };
    }
  });

  return Object.keys(regionPriceMap).map((region) => ({
    region,
    totalPrice: regionPriceMap[region].totalPrice,
    quantity: regionPriceMap[region].quantity,
    averagePrice: regionPriceMap[region].averagePrice,
  }));
};

export const SoldGraph = () => {
  const processedData = processData(data);

  return (
    <div className="col-span-8 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FaHouse />Sold Houses
        </h3>
      </div>

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={processedData}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis
              dataKey="region"
              axisLine={true}
              tickLine={true}
              className="text-xs font-bold"
              padding={{ right: 70 }}
            />
           <YAxis
  className="text-xs font-bold"
  axisLine={false}
  tickLine={true}
  domain={[0, 'dataMax + 50000']}
  ticks={[0, 100000, 200000, 300000, 400000, 500000]} // Adjust this array for six distinct ticks
/>
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Line
              type="monotone"
              dataKey="totalPrice"
              stroke="#5b21b6"
              fill="#5b21b6"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="averagePrice" // Second line using average price
              stroke="#f97316" // Different color for the second line
              fill="#f97316"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="quantity" // Third line using quantity
              stroke="#34d399" // Another color for the third line
              fill="#34d399"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="h-64 mt-12 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            margin={{
              top: 0,
              right: 0,
              left: -24,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis
              dataKey="region"
              axisLine={false}
              tickLine={false}
              className="text-xs font-bold"
              padding={{ right: 4 }}
            />
            <YAxis
              className="text-xs font-bold"
              axisLine={false}
              tickLine={false}
              domain={[0, 'dataMax + 10']} // Adjust domain as needed
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Bar dataKey="quantity" fill="#34d399" barSize={20} /> {/* Adjust barSize for width */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};