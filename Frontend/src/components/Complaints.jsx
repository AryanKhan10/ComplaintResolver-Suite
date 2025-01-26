import { useEffect, useState } from 'react';
import axios from 'axios';
// import API from '../../api/api'

const Complaint = () => {
  const [complaint, setComplaints] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  // const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [selectedComplaint, setSelectedComplaint] = useState(null); // State to track selected complaint for view

    useEffect(() => {
      const fetchComplaints = async () => {
        try {
          const token = localStorage.getItem("token"); // Assuming the JWT token is stored in localStorage
          const response = await axios.get("http://localhost:3000/api/v1/getAllComplaints", {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token for authentication
            },
          });
  
          if (response.data.success) {
            const complaintsData = Array.isArray(response.data.complaints)
              ? response.data.complaints
              : []; // Ensure it's an array
            setComplaints(complaintsData);
          } else {
            console.error(response.data.message);
          }
        } catch (error) {
          console.error("Error fetching complaints:", error.response?.data?.message || error.message);
        }
      };
  
      fetchComplaints();
    }, []);
    console.log('complaints are', complaint);
    const pendingComplaints = complaint.filter((c) => c.status === "PENDING");
    const resolvedComplaints = complaint.filter((c) => c.status === "RESOLVED");

  // Close the modal
  const closeModal = () => {
    setSelectedComplaint(null); // Reset the selected complaint when modal is closed
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-5">Complaint Management System</h1>


      {/* Complaints Table */}
      <div style={{ transform: 'translate(10% ,0%)' }} className="w-full max-w-4xl bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Pending Complaints</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Serial No.</th>
              <th className="border border-gray-300 px-4 py-2">Complaint ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingComplaints.length > 0 ? (
              pendingComplaints.map((complaint, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{complaint.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{complaint.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{complaint.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{complaint.status}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => setSelectedComplaint(complaint)}
                      className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                  No pending complaints.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Resolved Complaints */}
      <div style={{ transform: 'translate(10% ,0%)' }} className="w-full max-w-4xl bg-white p-4 rounded-md shadow-md mt-5">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Resolved Complaints</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Serial No.</th>
              <th className="border border-gray-300 px-4 py-2">Complaint ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {resolvedComplaints.length > 0 ? (
              resolvedComplaints.map((complaint, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{complaint.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{complaint.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{complaint.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{complaint.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                  No resolved complaints.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal to View Complaint Description */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-1/2 max-w-md">
            <h3 className="text-xl font-bold mb-4">Complaint Description</h3>
            <p className="mb-4">{selectedComplaint.description}</p>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaint;
