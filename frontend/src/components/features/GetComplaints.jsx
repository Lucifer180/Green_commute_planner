import axios from 'axios';
import React, { useEffect, useState } from 'react';

const GetComplaints = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reports');
        setReports(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reports:', error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Emergency & Complaint Page</h2>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Reports:</h3>
          {reports.length === 0 ? (
            <p>No reports found.</p>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report._id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                  <h4 className="font-bold">{report.type}</h4>
                  <p className="text-sm text-gray-500">Contact: {report.contactInfo}</p>
                  <p className="mt-2">{report.message}</p>
                  <p className="text-xs text-gray-400 mt-2">Submitted on {new Date(report.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetComplaints;
