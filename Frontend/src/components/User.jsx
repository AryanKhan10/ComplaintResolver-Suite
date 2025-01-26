import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import API from "../../api/api";
 function User() {
  const [users, setUsers] = useState([
    // { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", role: "Admin" },
    // { id: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", role: "User" },
    // { id: 3, firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com", role: "Moderator" },
    // { id: 4, firstName: "Bob", lastName: "Brown", email: "bob.brown@example.com", role: "User" },
    // { id: 5, firstName: "Charlie", lastName: "Davis", email: "charlie.davis@example.com", role: "Admin" },
  ]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const itemsPerPage = 10;

  const getUser = async () => {
    try {
      const res = await API.get('/user/getAllUsers');
      console.log(res.data.allUsers)
      setUsers(res.data.allUsers);
    } catch (error) {
      console.log(error);
      toast.error("Cannot retrieve users...");
    }
};
useEffect(()=>{
    getUser()
},[])
const filteredUsers = users.filter(
    (user) =>
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
    user.lastName.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
);

  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  const handleDelete = async(userId) => {
      try {
        console.log(userId)
          const res = await API.delete(`/user/deleteUser/${userId}`);
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
          toast.success("User deleted succesfully!");

    } catch (error) {
        console.log(error);
      toast.error("couldn't delete the user...");
    }
  };
  const handleView = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="p-4 font-sans w-9/12 relative left-64">
      {/* Search */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-72 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border border-gray-300">S.No</th>
            <th className="p-3 border border-gray-300">First Name</th>
            <th className="p-3 border border-gray-300">Last Name</th>
            <th className="p-3 border border-gray-300">Email</th>
            <th className="p-3 border border-gray-300">Role</th>
            <th className="p-3 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user,index) => (
            <tr key={user.id} className="even:bg-gray-50">
              <td className="p-3 border border-gray-300 text-center">{index+1}</td>
              <td className="p-3 border border-gray-300">{user.firstName}</td>
              <td className="p-3 border border-gray-300">{user.lastName}</td>
              <td className="p-3 border border-gray-300">{user.email}</td>
              <td className="p-3 border border-gray-300">{user.accountType}</td>
              <td className="p-3 border border-gray-300 space-x-2">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleView(user)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {" "}
          {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} results
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded-md ${
              currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-100"
            }`}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
            disabled={currentPage === pageCount}
            className={`px-3 py-1 border rounded-md ${
              currentPage === pageCount ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-100"
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Modal for Viewing User Details */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            <p><strong>First Name:</strong> {selectedUser.firstName}</p>
            <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.accountType}</p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default User;