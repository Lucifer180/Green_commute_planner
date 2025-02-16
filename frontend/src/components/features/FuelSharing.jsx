import axios from "axios";
import React, { useState } from "react";
export default function FuelSharing() {
  const [distance, setDistance] = useState("");
  const [vehicleType, setVehicleType] = useState("car");
  const [fuelType, setFuelType] = useState("petrol");
  const [passengers, setPassengers] = useState("");
  const [result, setResult] = useState(null);

  
  const vehicleOptions = {
    car: { defaultPassengers: 4, fuelTypes: ["petrol", "diesel", "cng"] },
    "4+2": { defaultPassengers: 6, fuelTypes: ["diesel", "cng"] },
    bike: { defaultPassengers: 2, fuelTypes: ["petrol"] },
  };

  
  const handleVehicleChange = (e) => {
    setVehicleType(e.target.value);
    setFuelType(vehicleOptions[e.target.value].fuelTypes[0]);
  };

  const calculateCost = async () => {
    if (!distance || !passengers) {
      alert("Enter valid distance and passengers");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/calculate-fuel-cost", {
        distance: parseFloat(distance),
        vehicleType,
        fuelType,
        passengers: parseInt(passengers),
      });

      setResult(res.data);
    } catch (error) {
      console.error("Error calculating fuel cost:", error);
      alert("Failed to calculate cost. Check inputs.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Fuel Cost Sharing</h1>

      <input
        type="number"
        placeholder="Enter distance (km)"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        className="border p-2 mb-2 w-64 text-center"
      />

      <select value={vehicleType} onChange={handleVehicleChange} className="border p-2 mb-2 w-64">
        <option value="car">Car</option>
        <option value="4+2">4+2 Vehicle</option>
        <option value="bike">Bike</option>
      </select>

      <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} className="border p-2 mb-2 w-64">
        {vehicleOptions[vehicleType].fuelTypes.map((type) => (
          <option key={type} value={type}>
            {type.toUpperCase()}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder={`Enter number of passengers (Default: ${vehicleOptions[vehicleType].defaultPassengers})`}
        value={passengers}
        onChange={(e) => setPassengers(e.target.value)}
        className="border p-2 mb-2 w-64 text-center"
      />

      <button onClick={calculateCost} className="px-4 py-2 bg-blue-600 text-white rounded mb-4 hover:cursor-pointer">
        Calculate Cost
      </button>

      {result && (
        <div className="p-4 bg-white shadow-md rounded-lg text-center">
          <h2 className="text-lg font-bold">Fuel Cost Breakdown</h2>
          <p><strong>Total Cost:</strong> ₹{result.totalCost}</p>
          <p><strong>Per Passenger:</strong> ₹{result.costPerPassenger}</p>
          <br />
          <button  className="px-4 py-2 bg-blue-600 text-white rounded mb-4 hover:cursor-pointer" onClick={()=>alert('Pay ₹'+result.costPerPassenger)}>
        Pay ₹{result.costPerPassenger} 
      </button>
        </div>
        
      )}

    </div>
  );
}
