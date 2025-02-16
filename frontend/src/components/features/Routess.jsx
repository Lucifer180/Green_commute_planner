import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import Img1 from '../../../public/Img1.jpg';
import Img2 from '../../../public/Img2.jpg';
import Img3 from '../../../public/Img3.jpg';


const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180); 
  const dLon = (lon2 - lon1) * (Math.PI / 180); 
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; 
  return distance;
};


const calculateTime = (distance, speed) => {
  const time = distance / speed;
  return time;
};

const cyclingSpeed = 22.5; 

const LocationDistance = () => {
  const [place1, setPlace1] = useState('');
  const [place2, setPlace2] = useState('');
  const [name, setName] = useState('');
  const [data, setData] = useState(null);
  const [distance, setDistance] = useState(null);
  const [times, setTimes] = useState({ walking: null, bike: null, car: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [coords, setCoords] = useState({ location1: null, location2: null });

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        console.log(response.data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []); 
  const fetchCoordinates = async (place) => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: place,
          format: 'json',
          addressdetails: 1,
          limit: 1,  
        },
      });

      if (response.data.length === 0) {
        setError(`No results found for "${place}"`);
        setLoading(false);
        return;
      }

      const { lat, lon } = response.data[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } catch (err) {
      setError("Failed to fetch location data");
    } finally {
      setLoading(false);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (place1 && place2) {
      const location1 = await fetchCoordinates(place1);
      const location2 = await fetchCoordinates(place2);

      if (location1 && location2) {
        const dist = calculateDistance(location1.lat, location1.lon, location2.lat, location2.lon);
        setDistance(dist);

        setTimes({
          walking: calculateTime(dist, 5), 
          bike: calculateTime(dist, 45), 
          car: calculateTime(dist, 60),
          cycle: calculateTime(dist, 15) 
        });

        const estimatedCyclingTime = calculateTime(dist, cyclingSpeed);

        setData({
          from: place1,
          to: place2,
          distance: dist.toFixed(2),
          estimatedCyclingTime: estimatedCyclingTime.toFixed(2),
        });

        
        setCoords({ location1, location2 });
        try {
            await axios.post('http://localhost:5000/api/user', {
              name,
              place1,
              place2,
              distance: dist.toFixed(2),
              estimatedCyclingTime: estimatedCyclingTime.toFixed(2),
              times
            });
          } catch (error) {
            console.error('Error saving data:', error);
          }
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-center">Distance & Time Estimation</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl mb-2">Name</h2>
          <label className="block mb-2">enter the name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your Name "
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl mb-2">Place 1</h2>
          <label className="block mb-2">Place Name:</label>
          <input
            type="text"
            value={place1}
            onChange={(e) => setPlace1(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Place Name (e.g., Mysore)"
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl mb-2">Place 2</h2>
          <label className="block mb-2">Place Name:</label>
          <input
            type="text"
            value={place2}
            onChange={(e) => setPlace2(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Place Name (e.g., Bangalore)"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg"
        >
          Fetch Distance & Time
        </button>
      </form>

      {loading && <div className="mt-4 text-center">Loading...</div>}
      {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

      {data && !loading && (
        <div className="flex flex-wrap justify-between gap-2 mt-8">
         
          <div className="w-full mt-8">
            <MapContainer
              center={[coords.location1?.lat || 0, coords.location1?.lon || 0]}
              zoom={10}
              style={{ width: '100%', height: '400px' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              {coords.location1 && coords.location2 && (
                <>
                  <Marker position={[coords.location1.lat, coords.location1.lon]}>
                    <Popup>{place1}</Popup>
                  </Marker>
                  <Marker position={[coords.location2.lat, coords.location2.lon]}>
                    <Popup>{place2}</Popup>
                  </Marker>
                  <Polyline
                    positions={[
                      [coords.location1.lat, coords.location1.lon],
                      [coords.location2.lat, coords.location2.lon]
                    ]}
                    color="blue"
                    weight={3}
                  />
                </>
              )}
            </MapContainer>
            <div className="p-6 bg-gray-100 min-h-screen">
  <h1 className="text-2xl font-semibold mb-6 text-center">Distance & Time Estimation</h1>

  

  {loading && <div className="mt-4 text-center">Loading...</div>}
  {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

  {data && !loading && (
    <>
      
      <div className="flex flex-wrap justify-between gap-2 mt-8">
        
        <article className="w-full sm:w-1/3 lg:w-1/4 xl:w-1/4 max-w-lg overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg p-6">
          <img alt="" src={Img1} className="h-56 w-full object-cover mb-4" />
          <div className="bg-white p-4 sm:p-6">
            <time datetime="2022-10-10" className="block text-xs text-gray-500"> 15th Feb 2025 </time>
            <a href="#">
              <h2 className="text-xl font-bold">"Hii {name}"</h2>
              <h3 className="mt-0.5 text-lg text-gray-900">Use Cycle for reaching your destination</h3>
            </a>
            <p className="mt-2 text-sm text-gray-500">
              From: {data.from}<br />
              To: {data.to}<br />
              Distance: {data.distance} km
              Time: {times.cycle?.toFixed(2)} hours
            </p>
            <div className="mt-4">
              <h4 className="font-semibold">Benefits of Cycling:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Reduces carbon emissions and air pollution.</li>
                <li>Improves physical fitness and mental well-being.</li>
                <li>Lowers transportation costs and reduces traffic congestion.</li>
                <li>Fosters local interaction and supports businesses.</li>
              </ul>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Estimated Cycling Time: {data.estimatedCyclingTime} hours
            </p>
            <button
              className="mt-4 inline-block rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white"
              onClick={() => alert('Rent Cycle functionality coming soon!')}
            >
              Rent Cycles
            </button>
          </div>
        </article>

        
        <article className="w-full sm:w-1/3 lg:w-1/4 xl:w-1/4 max-w-lg overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg p-6">
          <img alt="" src={Img2} className="h-56 w-full object-cover mb-4" />
          <div className="bg-white p-4 sm:p-6">
            <time datetime="2022-10-10" className="block text-xs text-gray-500"> 15th Feb 2025 </time>
            <a href="#">
              <h2 className="text-xl font-bold">"Hii {name}"</h2>
              <h3 className="mt-0.5 text-lg text-gray-900">Use Carpooling to reach your destination</h3>
            </a>
            <p className="mt-2 text-sm text-gray-500">
              From: {data.from}<br />
              To: {data.to}<br />
              Distance: {data.distance} km<br />
              Time: {times.car?.toFixed(2)} hours
            </p>
            <div className="mt-4">
              <h4 className="font-semibold">Benefits of Carpooling</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Savings per person: ₹66 when sharing with three others.</li>
                <li>Carbon reduction: Saves 2.71 kg of CO2 per person.</li>
              </ul>
            </div>
            <button
              className="mt-4 inline-block rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white"
            >
              <a href="/carpoolingsystem">Use Carpooling</a>
            </button>
          </div>
        </article>

        
        <article className="w-full sm:w-1/3 lg:w-1/4 xl:w-1/4 max-w-lg overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg p-6">
          <img alt="" src={Img3} className="h-56 w-full object-cover mb-4" />
          <div className="bg-white p-4 sm:p-6">
            <time datetime="2022-10-10" className="block text-xs text-gray-500"> 15th Feb 2025 </time>
            <a href="#">
              <h2 className="text-xl font-bold">"Hii {name}"</h2>
              <h3 className="mt-0.5 text-lg text-gray-900">Choose walking or running to reach your destination</h3>
            </a>
            <p className="mt-2 text-sm text-gray-500">
              From: {data.from}<br />
              To: {data.to}<br />
              Distance: {data.distance} km<br />
              Time (Walking): {times.walking?.toFixed(2)} hours
            </p>
            <div className="mt-4">
              <h4 className="font-semibold">Benefits of walking and running</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Improves cardiovascular health.</li>
                <li>Enhances mental health and reduces stress.</li>
                <li>Boosts weight loss and fitness.</li>
              </ul>
            </div>
            <button
              className="mt-4 inline-block rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white"
              onClick={() => alert('Refreshment room functionality coming soon!')}
            >
              <a>Find nearby Refreshment Rooms</a>
            </button>
          </div>
        </article>
      </div>
    </>
  )}
</div>
    </div>
</div>
      )}
      
    </div>
  );
};

export default LocationDistance;
