import React, { useState } from "react";
export default function CarbonTracker() {
  const [distance, setDistance] = useState("");
  const [mode, setMode] = useState("driving");
  const [carbonEmitted, setCarbonEmitted] = useState(null);
  const [suggestion, setSuggestion] = useState("");

  
  const emissionFactors = {
    driving: 0.27,  
    carpool: 0.09,  
    transit: 0.05,  
    cycling: 0,     
    walking: 0,     
  };

  
  const calculateEmissions = () => {
    if (!distance || isNaN(distance) || distance <= 0) {
      alert("Please enter a valid distance");
      return;
    }

    const emission = (distance * emissionFactors[mode]).toFixed(2);
    setCarbonEmitted(emission);

    
    if (mode === "driving") {
      setSuggestion("Consider carpooling or public transport to reduce emissions.");
    } else if (mode === "carpool") {
      setSuggestion("Great choice! Carpooling reduces emissions significantly.");
    } else if (mode === "transit") {
      setSuggestion("Using public transport helps reduce overall carbon footprint.");
    } else {
      setSuggestion("Excellent! Walking & cycling have zero emissions.");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Carbon Footprint Tracker</h1>
      <input
        type="number"
        placeholder="Enter distance (km)"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        className="border p-2 mb-2 w-64 text-center"
      />
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="border p-2 mb-2 w-64"
      >
        <option value="driving">Car (Solo)</option>
        <option value="carpool">Carpool (Shared)</option>
        <option value="transit">Public Transport</option>
        <option value="cycling">Bicycle</option>
        <option value="walking">Walking</option>
      </select>
      <button
        onClick={calculateEmissions}
        className="px-4 py-2 bg-green-600 text-white rounded mb-4"
      >
        Calculate Emissions
      </button>

      {carbonEmitted !== null && (
        <div className="p-4 bg-white shadow-md rounded-lg text-center">
          <h2 className="text-lg font-bold">Carbon Emission</h2>
          <p className="text-xl font-semibold text-red-500">{carbonEmitted} kg CO₂</p>
          <p className="text-sm text-gray-600 mt-2">{suggestion}</p>
        </div>
      )}
    </div>
  );
}
