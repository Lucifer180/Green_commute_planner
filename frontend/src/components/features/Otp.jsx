import React, { useState } from 'react';
import Img8 from '../../../public/Img8.jpg';
function App() {
  const [confirmationCode, setConfirmationCode] = useState('######');

  const generateRandomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const handleConfirm = () => {
    setConfirmationCode(generateRandomNumber());
  };

  const handleEnd = () => {
    setConfirmationCode(generateRandomNumber());
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Ride Confirmation</h1>
        <div className="text-center mb-6">
          <img
            src={Img8}
            alt="Illustration of a car ride confirmation"
            className="mx-auto mb-4"
          />
          <p className="text-lg">Your ride is confirmed!</p>
          <p className="text-2xl font-bold text-blue-600" id="confirmation-code">
            {confirmationCode}
          </p>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleConfirm}
          >
            Confirm Ride
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={handleEnd
                
            }
            
          >
          End ride
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
