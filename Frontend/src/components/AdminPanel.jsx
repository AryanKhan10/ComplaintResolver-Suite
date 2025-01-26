"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import toast from "react-hot-toast"
import API from "../../api/api"
 function AdminPanel() {
  const [complaints, setComplaints] = useState([    
  ])
  
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const getUser = async () => {
    try {
      const res = await API.get('/complaint/getAllComplaints');
      console.log(res.data.complaints)
      setComplaints(res.data.complaints);
    } catch (error) {
      console.log(error);
      toast.error("Cannot get complaints...");
    }
  };

  useEffect(() => {
    getUser(); 
  }, []);
  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.description.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "All" || complaint.status === statusFilter),
  )

  const pageCount = Math.ceil(filteredComplaints.length / itemsPerPage)
  const paginatedComplaints = filteredComplaints.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      const data = { status: newStatus }
      console.log(complaintId)
      const res = await API.put(`/complaint/update-status/${complaintId}`,
         data)
      if (res.data.success) {
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint._id === complaintId ? { ...complaint, status: newStatus } : complaint,
          ),
        )
        toast.success("Status updated successfully")
      } else {
        throw new Error("Failed to update status")
      }
    } catch (error) {
      console.error(error)
      toast.error("Cannot update status...")
    }
  }

  return (
    <div className="space-y-4 w-9/12 relative left-72 top-10">
      {/* Search and Filter */}
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search complaints..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm p-2 border rounded"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-[180px] p-2 border rounded"
        >
          {/* <option value="All">All</option>
          <option value="Open">Open</option> */}
          <option value="pending">Pending</option>
          <option value="progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            {/* <th className="border border-gray-200 p-2">ID</th> */}
            <th className="border border-gray-200 p-2">S.No</th>
            {/* <th className="border border-gray-200 p-2">Date</th> */}
            <th className="border border-gray-200 p-2">Status</th>
            <th className="border border-gray-200 p-2">Description</th>
            <th className="border border-gray-200 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedComplaints.map((complaint,index) => ( 
            <tr key={complaint._id}>
              {/* <td className="border border-gray-200 p-2 text-center">{complaint._id}</td> */}
              <td className="border border-gray-200 p-2">{index+1}</td>
              {/* <td className="border border-gray-200 p-2">{complaint.date}</td> */}
              <td className="border border-gray-200 p-2">{complaint.status}</td>
              <td className="border border-gray-200 p-2">{complaint.description}</td>
              <td className="border border-gray-200 p-2">
                <select
                  value={complaint.status}
                  onChange={(e) => {
                    console.log(complaint._id)
                    handleStatusChange(complaint._id, e.target.value)
                  }
                  }
                  className="p-2 border rounded"
                >
                  {/* <option value="Open">Open</option> */}
                  <option value="pending">Pending</option>
                  <option value="progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div>
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredComplaints.length)} of {filteredComplaints.length} results
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border rounded disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
            disabled={currentPage === pageCount}
            className="p-2 border rounded disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
export default AdminPanel;