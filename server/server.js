require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const fuelData = {
  petrol: { efficiency: 15, pricePerLiter: 100 },
  diesel: { efficiency: 18, pricePerLiter: 90 },
  cng: { efficiency: 25, pricePerLiter: 60 },
};

app.post("/calculate-fuel-cost", (req, res) => {
  const { distance, fuelType, passengers } = req.body;

  if (!distance || !fuelType || !passengers || passengers <= 0) {
    return res.status(400).json({ error: "Invalid input values" });
  }

  const fuelEfficiency = fuelData[fuelType]?.efficiency;
  const fuelPrice = fuelData[fuelType]?.pricePerLiter;

  if (!fuelEfficiency || !fuelPrice) {
    return res.status(400).json({ error: "Invalid fuel type" });
  }

  const totalFuelNeeded = distance / fuelEfficiency;
  const totalCost = totalFuelNeeded * fuelPrice;
  const costPerPassenger = (totalCost / passengers).toFixed(2);

  res.json({ totalCost: totalCost.toFixed(2), costPerPassenger });
});

mongoose.connect("mongodb://localhost:27017/carpooling", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const CarSchema = new mongoose.Schema({
  driverName: String,
  carModel: String,
  seatsAvailable: Number,
  seatsFilled: Number,
  location: String,
  requests: [{ userName: String, status: String }],
});

const Car = mongoose.model("Car", CarSchema);

app.post("/add-cars", async (req, res) => {
  await Car.deleteMany();

  const dummyCars = [];
  for (let i = 1; i <= 20; i++) {
    dummyCars.push({
      driverName: `Driver ${i}`,
      carModel: `Car Model ${i}`,
      seatsAvailable: Math.floor(Math.random() * 5) + 1,
      seatsFilled: Math.floor(Math.random() * 3),
      location: `Location ${i}`,
      requests: [],
    });
  }

  await Car.insertMany(dummyCars);
  res.json({ message: "20 Dummy Cars Added" });
});

app.get("/get-cars", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

app.post("/request-ride", async (req, res) => {
  const { carId, userName } = req.body;
  const car = await Car.findById(carId);
  if (!car) return res.status(404).json({ message: "Car not found" });

  car.requests.push({ userName, status: "pending" });
  await car.save();
  res.json({ message: "Ride request sent!" });
});

app.post("/respond-request", async (req, res) => {
  const { carId, userName, response } = req.body;
  const car = await Car.findById(carId);
  if (!car) return res.status(404).json({ message: "Car not found" });

  const request = car.requests.find(req => req.userName === userName);
  if (!request) return res.status(404).json({ message: "Request not found" });

  request.status = response;
  if (response === "accepted") car.seatsFilled += 1;
  await car.save();

  res.json({ message: `Request ${response}` });
});

const PORT = process.env.PORT || 5000;
const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.post('/api/distance', async (req, res) => {
  const { from, to } = req.body;

  try {
    const response = await axios.get('https://some-rapidapi.com/endpoint', {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'geoapify-address-autocomplete.p.rapidapi.com',
      },
      params: {
        from,
        to,
      }
    });

    res.json({
      distance: response.data.routes[0].distance,
      time: {
        car: response.data.routes[0].duration,
        cycle: response.data.routes[1].duration,
        walking: response.data.routes[2].duration,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const userSchema = new mongoose.Schema({
  name: String,
  place1: String,
  place2: String,
  distance: Number,
  estimatedCyclingTime: Number,
  times: {
    walking: Number,
    bike: Number,
    car: Number,
    cycle: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

app.post('/api/user', async (req, res) => {
  const { name, place1, place2, distance, estimatedCyclingTime, times } = req.body;

  try {
    const user = new User({
      name,
      place1,
      place2,
      distance,
      estimatedCyclingTime,
      times,
    });

    await user.save();
    res.status(201).json({ message: 'Data stored successfully!', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to store data' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

let cars = [
  {
    id: 1,
    driverName: "John Doe",
    carModel: "Toyota Prius",
    location: "Downtown",
    seatsAvailable: 4,
    seatsFilled: 2,
    requests: [],
  },
  {
    id: 2,
    driverName: "Alice Smith",
    carModel: "Honda Civic",
    location: "City Mall",
    seatsAvailable: 3,
    seatsFilled: 1,
    requests: [],
  },
  {
    id: 3,
    driverName: "Michael Brown",
    carModel: "Tesla Model 3",
    location: "Tech Park",
    seatsAvailable: 2,
    seatsFilled: 1,
    requests: [],
  },
  {
    id: 4,
    driverName: "Emma Wilson",
    carModel: "Ford Focus",
    location: "Metro Station",
    seatsAvailable: 3,
    seatsFilled: 2,
    requests: [],
  },
];

app.get("/api/cars", (req, res) => {
  res.json(cars);
});

app.post("/api/cars", (req, res) => {
  const newCar = {
    id: cars.length + 1,
    ...req.body,
    requests: [],
  };
  cars.push(newCar);
  res.json(newCar);
});

const reportSchema = new mongoose.Schema({
  type: { type: String, required: true },
  message: { type: String, required: true },
  contactInfo: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Report = mongoose.model('Report', reportSchema);

app.post('/api/reports', async (req, res) => {
  const { type, message, contactInfo } = req.body;

  if (!type || !message || !contactInfo) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newReport = new Report({ type, message, contactInfo });
    await newReport.save();
    res.status(201).json({ message: 'Report submitted successfully!' });
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({ error: 'There was an error saving the report' });
  }
});

app.get('/api/reports', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'There was an error fetching the reports' });
  }
});

const carpoolers = [
  { id: 1, name: "John Doe", rides: 45, moneySaved: 3500, coins: 150, users: [] },
  { id: 2, name: "Alice Smith", rides: 38, moneySaved: 2900, coins: 120, users: [] },
  { id: 3, name: "Michael Brown", rides: 35, moneySaved: 2700, coins: 110, users: [] },
  { id: 4, name: "Emma Wilson", rides: 33, moneySaved: 2600, coins: 100, users: [] },
  { id: 5, name: "Daniel Lee", rides: 30, moneySaved: 2400, coins: 90, users: [] },
  { id: 6, name: "Sophia Martin", rides: 28, moneySaved: 2200, coins: 80, users: [] },
  { id: 7, name: "James Anderson", rides: 26, moneySaved: 2100, coins: 75, users: [] },
  { id: 8, name: "Olivia Garcia", rides: 24, moneySaved: 2000, coins: 70, users: [] }
];

app.get('/api/carpoolers', (req, res) => {
  res.json(carpoolers);
});

app.post('/api/carpoolers', (req, res) => {
  const { name, rides, moneySaved, coins } = req.body;
  const newId = carpoolers.length ? carpoolers[carpoolers.length - 1].id + 1 : 1;
  const newCarpooler = { id: newId, name, rides, moneySaved, coins, users: [] };
  carpoolers.push(newCarpooler);
  res.status(201).json(newCarpooler);
});

app.put('/api/carpoolers/:id', (req, res) => {
  const { id } = req.params;
  const { name, rides, moneySaved, coins } = req.body;

  const carpooler = carpoolers.find(c => c.id === parseInt(id));
  if (!carpooler) {
    return res.status(404).json({ message: "Carpooler not found" });
  }

  carpooler.name = name || carpooler.name;
  carpooler.rides = rides || carpooler.rides;
  carpooler.moneySaved = moneySaved || carpooler.moneySaved;
  carpooler.coins = coins || carpooler.coins;

  res.json(carpooler);
});

app.delete('/api/carpoolers/:id', (req, res) => {
  const { id } = req.params;
  const index = carpoolers.findIndex(c => c.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: "Carpooler not found" });
  }
  carpoolers.splice(index, 1);
  res.status(204).send();
});

app.post("/request-ride", async (req, res) => {
  const { carId, userName } = req.body;
  const carpooler = carpoolers.find(c => c.id === carId);
  if (!carpooler) return res.status(404).json({ message: "Car not found" });

  carpooler.users.push({ userName, status: "pending" });

  res.json({ message: "Ride request sent!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});