import React, { useEffect, useState } from 'react';
import API from '../../api/api'
const Complaint = () => {
  const [complaints, setComplaints] = useState([
    {
      id: '#123-456ABC',
      name: 'John Doe',
      date: '30/11/24',
      status: 'PENDING',
      description: 'This is a description of the complaint for John Doe.',
    },
  ]);
  const getData = async()=>{
    try {
      const res = await API.get("/complaint/getAllComplaints")
      console.log(res.data.complaints)
    } catch (error) {
      console.log(`cannot get complaint...${error}`)
    }
  }
  useEffect( ()=>{
    getData()
  },[getData])

  const [newComplaint, setNewComplaint] = useState({ name: '', title: '', description: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [selectedComplaint, setSelectedComplaint] = useState(null); // State to track selected complaint for view
  
  // Handle adding a new complaint
  const handleAddComplaint = () => {
    if (newComplaint.name.trim() && newComplaint.title.trim() && newComplaint.description.trim()) {
      const id = `#123-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      const date = new Date().toISOString().split('T')[0]; // Today's date
      const newComplaintObj = {
        id,
        name: newComplaint.name,
        date,
        status: 'PENDING',
        description: newComplaint.description,
      };
      
      setComplaints([...complaints, newComplaintObj]); // Add complaint
      setNewComplaint({ name: '', title: '', description: '' }); // Reset form
      setShowForm(false); // Hide form after submission
    } else {
      alert('Please fill in all fields before submitting.');
    }
  };

  // Filter complaints based on search query
  const filteredComplaints = complaints.filter((complaint) =>
    complaint.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate complaints by status
  const pendingComplaints = filteredComplaints.filter((c) => c.status === 'PENDING');
  const resolvedComplaints = filteredComplaints.filter((c) => c.status === 'RESOLVED');

  // Close the modal
  const closeModal = () => {
    setSelectedComplaint(null); // Reset the selected complaint when modal is closed
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-5">Complaint Management System</h1>

      {/* Button to show form */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        {showForm ? 'Cancel' : 'New Complaint'}
      </button>

      {/* Show New Complaint Form */}
      {showForm && (
        <div style={{ transform: 'translate(10% ,0%)' }} className="bg-white p-4 bg-gray-300 rounded-md shadow-md mb-5 w-full max-w-4xl">
          <h2 className="font-bold text-gray-800 mb-4">Submit a New Complaint</h2>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Name"
              className="border rounded-md px-4 py-2 w-full"
              value={newComplaint.name}
              onChange={(e) => setNewComplaint({ ...newComplaint, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Title"
              className="border rounded-md px-4 py-2 w-full"
              value={newComplaint.title}
              onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <textarea
              placeholder="Complaint Description"
              className="border rounded-md px-4 py-2 w-full"
              rows="3"
              value={newComplaint.description}
              onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
            ></textarea>
          </div>
          <button
            onClick={handleAddComplaint}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit Complaint
          </button>
        </div>
      )}

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
