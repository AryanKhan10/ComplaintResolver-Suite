import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import API from "../../api/api";

function Department() {
    const token = localStorage.getItem("token");

    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({ departmentName: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [agentId, setAgentId] = useState("");

    useEffect(() => {
        if (!token) {
            toast.error("You are not authenticated. Please log in.");
            return;
        }

        const decodedToken = jwtDecode(token);
        try {
            if (decodedToken?.id) {
                setAgentId(decodedToken.id);
            } else {
                throw new Error("Invalid token: Agent ID not found.");
            }
        } catch (error) {
            toast.error("Invalid token. Please log in again.");
        }

        fetchDepartments(decodedToken?.id);
    }, [token]);

    const fetchDepartments = async (agentId) => {
        try {
            const response = await API.get("/department/getAllDepartments", {
                params: { agentId },
            });
            setDepartments(response.data.departments);
        } catch (error) {
            toast.error("Failed to load departments.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.departmentName.trim()) {
            toast.error("Department Name is required.");
            return;
        }

        try {
            const payload = { ...formData, agentId };
            await API.post("/department/createDepartment", payload);
            toast.success("Department created successfully!");
            setFormData({ departmentName: "" });
            fetchDepartments(agentId);
            setIsModalOpen(false);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to create department.");
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Manage Departments</h1>
            <div className="mb-6 text-right">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Add Department
                </button>
            </div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Department List</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {departments.length > 0 ? (
                        departments.map((department) => (
                            <div
                                key={department._id}
                                className="bg-gray-800 text-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{department.departmentName}</h3>
                                    <p className="text-gray-300">
                                        Agent ID: <span className="text-gray-100 font-medium">{department.agentId || "N/A"}</span>
                                    </p>
                                </div>
                                <button className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">Delete</button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">No departments found.</p>
                    )}
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Department</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="departmentName"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Department Name
                                </label>
                                <input
                                    type="text"
                                    id="departmentName"
                                    name="departmentName"
                                    value={formData.departmentName}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter department name"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Department;
