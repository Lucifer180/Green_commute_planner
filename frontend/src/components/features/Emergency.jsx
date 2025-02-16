import axios from 'axios';
import React, { useState } from 'react';

const Emergency = () => {
  const [emergency, setEmergency] = useState(false);
  const [complaint, setComplaint] = useState('');
  const [message, setMessage] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const data = {
        type: emergency ? 'Emergency' : 'Complaint',
        message: complaint,
        contactInfo: contactInfo,
      };

      
      const response = await axios.post('http://localhost:5000/api/reports', data);

      
      setMessage(response.data.message);

      
      setComplaint('');
      setContactInfo('');
    } catch (error) {
      console.error('Error submitting the report:', error);
      setMessage('There was an error submitting your report. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Emergency & Complaint Page</h2>

        
        <form onSubmit={handleSubmit}>
          <div className="flex items-center space-x-2 mb-4">
            <div className="text-yellow-500 text-3xl">⚠</div>
            <h3 className="text-xl font-semibold">Emergency or Complaint?</h3>
          </div>

          
          <div className="mb-4 flex space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="reportType"
                checked={emergency}
                onChange={() => setEmergency(true)}
                className="h-4 w-4 text-green-500"
              />
              <span>Emergency</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="reportType"
                checked={!emergency}
                onChange={() => setEmergency(false)}
                className="h-4 w-4 text-red-500"
              />
              <span>Complaint</span>
            </label>
          </div>

          
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Message:</label>
            <textarea
              rows="4"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder={emergency ? 'Describe the emergency situation' : 'Enter your complaint'}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>


          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Your Contact Info:</label>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">📧</span>
              <input
                type="email"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          
          <div className="mb-4 text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
            >
              <a href="/api/reports">view Complaints and reports</a>
            </button>
          </div>
          <br />
          <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
              onClick={()=>alert('Immediate SOS Call feature needs to be implemented')}
            >
              Immediate SOS Call
            </button>
        
        {message && (
          <div className="mt-4 text-center text-green-500">
            {message}
          </div>
        )}
      </div>
     
    </div>
  );
};

export default Emergency;
