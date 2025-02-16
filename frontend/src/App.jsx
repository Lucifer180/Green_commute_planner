import 'leaflet/dist/leaflet.css';
import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RoutePlanner from "../src/components/route-planner/RoutePlanner";
import CarbonTracker from './components/features/CarbonTracker';
import CarPooling from './components/features/CarPooling';
import CarpoolingSystem from "./components/features/CarpoolingSystem";
import EmergencyAndComplaintPage from './components/features/Emergency';
import FuelSharing from './components/features/FuelSharing';
import GetComplaints from './components/features/GetComplaints';
import MakeYourPlan from "./components/features/MakeYourPlan";
import Otp from './components/features/Otp';
import Routess from "./components/features/Routess";
import AboutTransCard from "./components/features/TranCard";
import Header from "./components/header/header";
import Hero from "./components/hero/Hero";
import WhyUs from './components/info/WhyUs';
export default function App() {
  return (
<div>   


<Router>
  <Header />

      <div>
        <Routes>
          <Route path="/" element={<div><Hero/>
            <AboutTransCard />
          </div>} />
          <Route path="/otp" element={<Otp/>} />
          <Route path="/api/reports" element={<GetComplaints/>} />
          <Route path="/api/distance" element={<Routess/>} />
          <Route path="/get-directions" element={<RoutePlanner />} />
          <Route path="/carpooling" element={<CarPooling />} />
          <Route path="/carbontracker" element={<CarbonTracker />} />
          <Route path="/calculate-fuel-cost" element={<FuelSharing />} />
          <Route path="/rewards" element={<CarPooling/>} />
          <Route path="/carpoolingsystem" element={<CarpoolingSystem />} />
          <Route path="/emergency-complaints" element={<EmergencyAndComplaintPage/>} />
           <Route path="/why-us" element={<WhyUs/>} />
           <Route path="/make-your-plan" element={<MakeYourPlan/>} />
        </Routes>
      </div>
    </Router>
    
</div>
    
    
  );
}