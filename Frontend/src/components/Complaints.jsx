import { useEffect, useState } from 'react';
import API from '../../api/api';

const Complaint = () => {
  const [complaint, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await API.get('/complaint/getAllComplaints');
        console.log('response is', response.data);
        setComplaints(response.data.complaints);
      } catch (error) {
        console.error('Error fetching complaints:', error.response?.data?.message || error.message);
      }
    };

    fetchComplaints();
  }, [complaint]);

  const pendingComplaints = complaint.filter((c) => c.status === 'pending');
  const resolvedComplaints = complaint.filter((c) => c.status === 'closed');
  const progressComplaints = complaint.filter((c) => c.status === 'progress');

  const closeModal = () => {
    setSelectedComplaint(null);
  };

  const renderComplaintsTable = (title, complaints) => (
    <div style={{ transform: 'translate(10% ,0%)' }} className="w-full max-w-4xl bg-white p-4 rounded-md shadow-md mt-5">
      <h2 className="text-lg font-bold text-gray-800 mb-4">{title}</h2>
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
          {complaints.length > 0 ? (
            complaints.map((complaint, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{complaint._id}</td>
                <td className="border border-gray-300 px-4 py-2">{complaint.title}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(complaint.createdAt).toLocaleDateString()}</td>
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
                No complaints in this category.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-5">Complaint Management System</h1>

      {renderComplaintsTable('Pending Complaints', pendingComplaints)}
      {renderComplaintsTable('Complaints in Progress', progressComplaints)}
      {renderComplaintsTable('Resolved Complaints', resolvedComplaints)}

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
