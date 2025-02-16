import React, { useState } from "react";

export default function CarpoolLeaderboard() {
  const [view, setView] = useState("carpoolers");

  const carpoolers = [
    { id: 1, name: "John Doe", rides: 45, moneySaved: 3500, coins: 150 },
    { id: 2, name: "Alice Smith", rides: 38, moneySaved: 2900, coins: 120 },
    { id: 3, name: "Michael Brown", rides: 35, moneySaved: 2700, coins: 110 },
    { id: 4, name: "Emma Wilson", rides: 33, moneySaved: 2600, coins: 100 },
    { id: 5, name: "Daniel Lee", rides: 30, moneySaved: 2400, coins: 90 },
    { id: 6, name: "Sophia Martin", rides: 28, moneySaved: 2200, coins: 80 },
    { id: 7, name: "James Anderson", rides: 26, moneySaved: 2100, coins: 75 },
    { id: 8, name: "Olivia Garcia", rides: 24, moneySaved: 2000, coins: 70 },
    { id: 9, name: "David White", rides: 22, moneySaved: 1800, coins: 60 },
    { id: 10, name: "Emily Thompson", rides: 20, moneySaved: 1700, coins: 50 },
  ];

  const greenCommuters = [
    { id: 1, name: "Emily Davis", carbonSaved: 120, moneySaved: 4200 },
    { id: 2, name: "Robert Wilson", carbonSaved: 115, moneySaved: 4000 },
    { id: 3, name: "Sophia Miller", carbonSaved: 110, moneySaved: 3800 },
    { id: 4, name: "Daniel Brown", carbonSaved: 105, moneySaved: 3600 },
    { id: 5, name: "Jessica Lewis", carbonSaved: 100, moneySaved: 3400 },
    { id: 6, name: "Matthew Clark", carbonSaved: 95, moneySaved: 3200 },
    { id: 7, name: "Ava Harris", carbonSaved: 90, moneySaved: 3000 },
    { id: 8, name: "Benjamin Walker", carbonSaved: 85, moneySaved: 2800 },
    { id: 9, name: "Chloe Young", carbonSaved: 80, moneySaved: 2600 },
    { id: 10, name: "William Scott", carbonSaved: 75, moneySaved: 2500 },
  ];

  const giftCards = [
    { id: 1, brand: "Amazon", value: "₹500", code: "AMZ-500-OFF" },
    { id: 2, brand: "Flipkart", value: "₹300", code: "FLPKT-300-REWARD" },
    { id: 3, brand: "Uber", value: "₹200", code: "UBR-200-RIDE" },
  ];

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg w-full max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">🚀 Carpooling & Green Commute Leaderboard</h1>

      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 ${view === "carpoolers" ? "bg-blue-600 text-white" : "bg-gray-300"} rounded`}
          onClick={() => setView("carpoolers")}
        >
          Carpool Leaderboard
        </button>
        <button
          className={`px-4 py-2 ${view === "green" ? "bg-green-600 text-white" : "bg-gray-300"} rounded`}
          onClick={() => setView("green")}
        >
          Green Commute Leaderboard
        </button>
      </div>

      {view === "carpoolers" && (
        <div className="w-full bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-2">🏆 Top Carpoolers</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-200">
                <th className="p-2">Rank</th>
                <th className="p-2">Name</th>
                <th className="p-2">Rides</th>
                <th className="p-2">💰 Money Saved (₹)</th>
                <th className="p-2">🏅 Coins</th>
                <th className="p-2">💸 Withdraw</th>
              </tr>
            </thead>
            <tbody>
              {carpoolers.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="p-2 font-semibold">#{index + 1}</td>
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.rides}</td>
                  <td className="p-2 text-green-600 font-bold">₹{user.moneySaved.toLocaleString()}</td>
                  <td className="p-2">{user.coins} 🪙</td>
                  <td className="p-2">
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                      Withdraw ₹{user.coins * 5}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === "green" && (
        <div className="w-full bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-2">🌿 Top Green Commuters</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-200">
                <th className="p-2">Rank</th>
                <th className="p-2">Name</th>
                <th className="p-2">CO₂ Saved (kg)</th>
                <th className="p-2">💰 Money Saved (₹)</th>
              </tr>
            </thead>
            <tbody>
              {greenCommuters.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="p-2 font-semibold">#{index + 1}</td>
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.carbonSaved} kg</td>
                  <td className="p-2 text-green-600 font-bold">₹{user.moneySaved.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">🎁 Redeem Gift Cards</h3>
            <ul>
              {giftCards.map((gift) => (
                <li key={gift.id} className="p-2 bg-gray-200 rounded mb-2">
                  <span className="font-bold">{gift.brand}:</span> {gift.value} - Code: <span className="text-red-500">{gift.code}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
