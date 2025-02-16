import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Carpool() {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("user"); // "user" or "driver"
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [editingRequest, setEditingRequest] = useState(null); // State to manage request editing

  useEffect(() => {
    axios
      .get("/api/cars")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCars(response.data);
        } else {
          console.error("Data is not an array", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching carpool data", error);
      });
  }, []);

  const handleDeleteCar = (carId) => {
    setCars(cars.filter((car) => car.id !== carId));
  };

  const sendRequest = (carId, driverName) => {
    if (!userName) {
      alert("Enter your name to send a request!");
      return;
    }

    setCars((prevCars) =>
      prevCars.map((car) =>
        car.id === carId
          ? { ...car, requests: [...car.requests, { userName, status: "pending" }] }
          : car
      )
    );

    alert(`Ride request sent to ${driverName}!`);
    setPopupMessage("Ride request sent!");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const respondToRequest = (carId, requestUser, response) => {
    setCars((prevCars) =>
      prevCars.map((car) =>
        car.id === carId
          ? {
              ...car,
              requests: car.requests.map((req) =>
                req.userName === requestUser ? { ...req, status: response } : req
              ),
              seatsFilled: response === "accepted" ? car.seatsFilled + 1 : car.seatsFilled,
            }
          : car
      )
    );

    if (response === "accepted") {
      setPopupMessage(`Request from ${requestUser} has been accepted!`);
    } else {
      setPopupMessage(`Request from ${requestUser} has been rejected.`);
    }
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const addCar = (newCar) => {
    setCars((prevCars) => [...prevCars, newCar]);
  };

  const handleEditChange = (e, field) => {
    const value = e.target.value;
    setEditingCar((prevCar) => ({
      ...prevCar,
      [field]: value,
    }));
  };

  const saveChanges = () => {
    setCars((prevCars) =>
      prevCars.map((car) =>
        car.id === editingCar.id ? { ...car, ...editingCar } : car
      )
    );
    setEditingCar(null);
    setPopupMessage("Car details updated!");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const cancelEdit = () => {
    setEditingCar(null);
  };

  const handleRequestEditChange = (e, carId, requestUser, field) => {
    const value = e.target.value;
    setCars((prevCars) =>
      prevCars.map((car) =>
        car.id === carId
          ? {
              ...car,
              requests: car.requests.map((req) =>
                req.userName === requestUser ? { ...req, [field]: value } : req
              ),
            }
          : car
      )
    );
  };

  const handleDeleteRequest = (carId, requestUser) => {
    setCars((prevCars) =>
      prevCars.map((car) =>
        car.id === carId
          ? {
              ...car,
              requests: car.requests.filter((req) => req.userName !== requestUser),
            }
          : car
      )
    );
    setPopupMessage("Request deleted!");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg w-full max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">🚗 Carpooling System</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="border p-2 mb-4 w-64 text-center"
      />

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setUserRole("user")}
          className={`px-4 py-2 ${userRole === "user" ? "bg-blue-600 text-white" : "bg-gray-300"} rounded`}
        >
          User View
        </button>
        <button
          onClick={() => setUserRole("driver")}
          className={`px-4 py-2 ${userRole === "driver" ? "bg-green-600 text-white" : "bg-gray-300"} rounded`}
        >
          Driver View
        </button>
      </div>

      {userRole === "driver" && (
        <>
          <button
            onClick={() =>
              addCar({
                id: cars.length + 1,
                driverName: "New Driver",
                carModel: "New Model",
                location: "New Location",
                seatsAvailable: 4,
                seatsFilled: 0,
                requests: [],
              })
            }
            className="bg-green-600 text-white px-4 py-2 rounded mb-4"
          >
            + Add New Car
          </button>

          <div className="w-full bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">🚘 Your Cars</h2>
            {Array.isArray(cars) && cars.length === 0 ? <p>No cars added.</p> : null}
            {Array.isArray(cars) &&
              cars.map((car) => (
                <div key={car.id} className="p-2 border-b">
                  {editingCar?.id === car.id ? (
                    <div>
                      <input
                        type="text"
                        value={editingCar.driverName}
                        onChange={(e) => handleEditChange(e, "driverName")}
                        className="border p-2 mb-2 w-full"
                        placeholder="Driver Name"
                      />
                      <input
                        type="text"
                        value={editingCar.carModel}
                        onChange={(e) => handleEditChange(e, "carModel")}
                        className="border p-2 mb-2 w-full"
                        placeholder="Car Model"
                      />
                      <input
                        type="text"
                        value={editingCar.location}
                        onChange={(e) => handleEditChange(e, "location")}
                        className="border p-2 mb-2 w-full"
                        placeholder="Location"
                      />
                      <input
                        type="number"
                        value={editingCar.seatsAvailable}
                        onChange={(e) => handleEditChange(e, "seatsAvailable")}
                        className="border p-2 mb-2 w-full"
                        placeholder="Seats Available"
                      />
                      <input
                        type="number"
                        value={editingCar.seatsFilled}
                        onChange={(e) => handleEditChange(e, "seatsFilled")}
                        className="border p-2 mb-2 w-full"
                        placeholder="Seats Filled"
                      />
                      <button
                        onClick={saveChanges}
                        className="bg-blue-600 text-white px-4 py-2 rounded mb-2"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded mb-2"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p>
                        <strong>Driver:</strong> {car.driverName}
                      </p>
                      <p>
                        <strong>Car Model:</strong> {car.carModel}
                      </p>
                      <p>
                        <strong>Location:</strong> {car.location}
                      </p>
                      <p>
                        <strong>Seats:</strong> {car.seatsFilled}/{car.seatsAvailable} filled
                      </p>
                      <div className="mt-2">
                        <h3 className="font-bold">Requests:</h3>
                        {car.requests.length === 0 ? <p>No requests.</p> : null}
                        {car.requests.map((req) => (
                          <div key={req.userName} className="flex justify-between items-center bg-gray-200 p-2 rounded mb-2">
                            {editingRequest?.userName === req.userName ? (
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={req.status}
                                  onChange={(e) => handleRequestEditChange(e, car.id, req.userName, "status")}
                                  className="border p-2 w-32"
                                />
                                <button
                                  className="bg-green-600 text-white px-3 py-1 rounded"
                                  onClick={() => setEditingRequest(null)}
                                >
                                  Save Edit
                                </button>
                                <button
                                  className="bg-gray-500 text-white px-3 py-1 rounded"
                                  onClick={() => setEditingRequest(null)}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="flex justify-between items-center w-full">
                                <p>
                                  {req.userName} -{" "}
                                  <span
                                    className={
                                      req.status === "pending"
                                        ? "text-yellow-500"
                                        : req.status === "accepted"
                                        ? "text-green-600"
                                        : "text-red-500"
                                    }
                                  >
                                    {req.status}
                                  </span>
                                </p>
                                <div>
                                  <button
                                    className="bg-blue-600 text-white px-3 py-1 rounded mx-1"
                                    onClick={() => respondToRequest(car.id, req.userName, "accepted")}
                                  >
                                    ✅ Accept
                                  </button>
                                  <button
                                    className="bg-red-600 text-white px-3 py-1 rounded mx-1"
                                    onClick={() => respondToRequest(car.id, req.userName, "rejected")}
                                  >
                                    ❌ Reject
                                  </button>
                                  <button
                                    className="bg-gray-400 text-white px-3 py-1 rounded mx-1"
                                    onClick={() => setEditingRequest(req)}
                                  >
                                    ✏️ Edit
                                  </button>
                                  <button
                                    className="bg-red-500 text-white px-3 py-1 rounded mx-1"
                                    onClick={() => handleDeleteRequest(car.id, req.userName)}
                                  >
                                    🗑️ Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setEditingCar(car)}
                        className="bg-blue-600 text-white px-4 py-2 rounded mb-2"
                      >
                        Edit Car Details
                      </button>
                      <button
                        onClick={() => handleDeleteCar(car.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Delete Car
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </>
      )}

      {userRole === "user" && (
        <div className="w-full bg-white p-4 rounded-lg shadow-lg mt-4">
          <h2 className="text-lg font-bold mb-2">🚘 Available Cars</h2>
          {Array.isArray(cars) && cars.length === 0 ? <p>No cars available for carpooling.</p> : null}
          {Array.isArray(cars) &&
            cars.map((car) => (
              <div key={car.id} className="p-2 border-b">
                <p>
                  <strong>Driver:</strong> {car.driverName}
                </p>
                <p>
                  <strong>Car Model:</strong> {car.carModel}
                </p>
                <p>
                  <strong>Location:</strong> {car.location}
                </p>
                <p>
                  <strong>Seats:</strong> {car.seatsFilled}/{car.seatsAvailable} filled
                </p>
                <div className="mt-2">
                  {car.requests.some((req) => req.userName === userName) ? (
                    <p>You have already sent a request for this car.</p>
                  ) : (
                    <button
                      onClick={() => sendRequest(car.id, car.driverName)}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Send Request
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}

      {showPopup && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded">
          {popupMessage}
        </div>
      )}
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"><a href="/otp">OTP</a></button>
    </div>
  );
}
