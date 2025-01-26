// "use client"

// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import toast from "react-hot-toast";
// import API from "../../api/api";

// function AdminPanel() {
//   const [complaints, setComplaints] = useState([]);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const getUser = async () => {
//     try {
//       const res = await API.get("/complaint/getAllComplaints");
//       setComplaints(res.data.complaints);
//     } catch (error) {
//       console.error(error);
//       toast.error("Cannot get complaints...");
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   const filteredComplaints = complaints.filter(
//     (complaint) =>
//       complaint.description.toLowerCase().includes(search.toLowerCase()) &&
//       (statusFilter === "All" || complaint.status === statusFilter)
//   );

//   const pageCount = Math.ceil(filteredComplaints.length / itemsPerPage);
//   const paginatedComplaints = filteredComplaints.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleStatusChange = async (complaintId, newStatus) => {
//     try {
//       const data = { status: newStatus };
//       const res = await API.put(`/complaint/update-status/${complaintId}`, data);
//       if (res.data.success) {
//         setComplaints((prevComplaints) =>
//           prevComplaints.map((complaint) =>
//             complaint._id === complaintId
//               ? { ...complaint, status: newStatus }
//               : complaint
//           )
//         );
//         toast.success("Status updated successfully");
//       } else {
//         throw new Error("Failed to update status");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Cannot update status...");
//     }
//   };

//   return (
//     <div className="space-y-4 w-9/12 relative left-72 top-10">
//       {/* Search and Filter */}
//       <div className="flex justify-between items-center">
//         <input
//           type="text"
//           placeholder="Search complaints..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="max-w-sm p-2 border rounded"
//         />
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="w-[180px] p-2 border rounded"
//         >
//           <option value="All">All</option>
//           <option value="pending">Pending</option>
//           <option value="progress">In Progress</option>
//           <option value="closed">Closed</option>
//         </select>
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {paginatedComplaints.map((complaint, index) => (
//           <div
//             key={complaint._id}
//             className="border p-4 rounded-lg shadow-sm space-y-2 bg-white"
//           >
//             <div className="flex justify-between items-center">
//               <h3 className="text-lg font-bold">{complaint.title}</h3>
//               <span className="text-sm px-2 py-1 rounded bg-gray-200">
//                 {complaint.status}
//               </span>
//             </div>
//             <p className="text-sm text-gray-600">{complaint.description}</p>
//             <div className="flex justify-between items-center mt-4">
//               <span className="text-sm text-gray-500">S.No: {index + 1}</span>
//               <select
//                 value={complaint.status}
//                 onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
//                 className="p-2 border rounded"
//               >
//                 <option value="pending">Pending</option>
//                 <option value="progress">In Progress</option>
//                 <option value="closed">Closed</option>
//               </select>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-4">
//         <div>
//           Showing {(currentPage - 1) * itemsPerPage + 1} to {" "}
//           {Math.min(currentPage * itemsPerPage, filteredComplaints.length)} of {" "}
//           {filteredComplaints.length} results
//         </div>
//         <div className="flex space-x-2">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="p-2 border rounded disabled:opacity-50"
//           >
//             <ChevronLeft className="h-4 w-4" />
//           </button>
//           <button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
//             disabled={currentPage === pageCount}
//             className="p-2 border rounded disabled:opacity-50"
//           >
//             <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminPanel;


"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import API from "../../api/api";

function AdminPanel() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getUser = async () => {
    try {
      const res = await API.get("/complaint/getAllComplaints");
      setComplaints(res.data.complaints);
    } catch (error) {
      console.error(error);
      toast.error("Cannot get complaints...");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.description.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "All" || complaint.status === statusFilter)
  );

  const pageCount = Math.ceil(filteredComplaints.length / itemsPerPage);
  const paginatedComplaints = filteredComplaints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      const data = { status: newStatus };
      const res = await API.put(`/complaint/update-status/${complaintId}`, data);
      if (res.data.success) {
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint._id === complaintId
              ? { ...complaint, status: newStatus }
              : complaint
          )
        );
        toast.success("Status updated successfully");
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Cannot update status...");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 ml-64"> {/* Added margin-left */}
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <input
          type="text"
          placeholder="Search complaints..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-6 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-1/5 px-6 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="All">All</option>
          <option value="pending">Pending</option>
          <option value="progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedComplaints.map((complaint, index) => (
          <div
            key={complaint._id}
            className="border border-gray-200 rounded-lg shadow-lg p-8 bg-white transition-transform transform hover:scale-105"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">{complaint.title}</h3>
              <span
                className={`text-xs font-medium px-4 py-2 rounded-full ${complaint.status === "pending"
                  ? "bg-yellow-100 text-yellow-600"
                  : complaint.status === "progress"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-green-100 text-green-600"
                  }`}
              >
                {complaint.status}
              </span>
            </div>
            <p className="text-md text-gray-600 mt-3">{complaint.description}</p>
            <div className="flex justify-between items-center mt-5">
              <span className="text-sm text-gray-500">S.No: {index + 1}</span>
              <select
                value={complaint.status}
                onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                className="px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="pending">Pending</option>
                <option value="progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8">
        <div className="text-md text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredComplaints.length)} of{" "}
          {filteredComplaints.length} results
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-5 py-3 border rounded-lg shadow-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
            disabled={currentPage === pageCount}
            className="px-5 py-3 border rounded-lg shadow-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;

