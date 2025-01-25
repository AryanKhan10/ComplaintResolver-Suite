import React, { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import API from "../../api/api";
import { AppContext } from "../context/AppContext";

const Modal = ({ isOpen, title, children, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8 relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 focus:outline-none"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

const DepartmentCard = ({ department, onDelete }) => {
    const activeComplaints = Math.floor(Math.random() * 10);
    const resolvedComplaints = Math.floor(Math.random() * 15);

    const departmentInfo = {
        activeComplaints,
        resolvedComplaints,
        totalComplaints: activeComplaints + resolvedComplaints,
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 py-4 px-6">
                <h3 className="text-xl font-bold text-white truncate">{department.departmentName}</h3>
            </div>
            <div className="p-6 flex flex-col justify-between h-full">
                <div>
                    <div className="mb-2">
                        <p className="text-gray-700 font-medium">Type:</p>
                        <p className="text-gray-600">{department.departmentType}</p>
                    </div>
                    <div className="mb-2">
                        <p className="text-gray-700 font-medium">Active Complaints:</p>
                        <p className="text-gray-600">{departmentInfo.activeComplaints}</p>
                    </div>
                    <div className="mb-2">
                        <p className="text-gray-700 font-medium">Resolved Complaints:</p>
                        <p className="text-gray-600">{departmentInfo.resolvedComplaints}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700 font-medium">Total Complaints:</p>
                        <p className="text-gray-600">{departmentInfo.totalComplaints}</p>
                    </div>
                    <div className="mb-2">
                        <p className="text-gray-700 font-medium">Location:</p>
                        <p className="text-gray-600">{department.departmentLocation}</p>
                    </div>
                    <div className="mb-2">
                        <p className="text-gray-700 font-medium">Head of Department:</p>
                        <p className="text-gray-600">{department.departmentHead}</p>
                    </div>
                    <div>
                        <p className="text-gray-700 font-medium">Total Employees:</p>
                        <p className="text-gray-600">{department.departmentEmployees}</p>
                    </div>
                </div>
                <div className="mt-auto"> {/* Aligns button to bottom */}
                    <button
                        onClick={() => onDelete(department._id)}
                        className="w-full bg-red-500 hover:bg-red-700 text-white font-medium py-2 rounded-md transition duration-300"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};



function Department() {
    const { userId } = useContext(AppContext);

    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({ departmentName: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDepartments = async () => {
            setIsLoading(true);
            try {
                const response = await API.get("/department/getAllDepartments", {
                    params: { agentId: userId },
                });
                setDepartments(response.data.departments);
            } catch (error) {
                toast.error("Failed to load departments.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDepartments();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { departmentName } = formData;

        if (!departmentName.trim()) {
            toast.error("Department Name is required.");
            return;
        }

        try {
            const response = await API.post("/department/createDepartment", {
                ...formData,
                agentId: userId,
            });
            toast.success("Department created successfully!");
            setDepartments((prev) => [...prev, response.data.department]);
            setFormData({ departmentName: "" });
            setIsModalOpen(false);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to create department.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/department/deleteDepartment/${id}`);
            toast.success("Department deleted successfully!");
            setDepartments((prev) => prev.filter((dept) => dept._id !== id));
        } catch (error) {
            toast.error("Failed to delete department.");
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Manage Departments</h1>

            <div className="mb-8 text-right">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                >
                    + Add Department
                </button>
            </div>

            <div className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Departments List</h2>

                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-500 h-12 w-12"></div>
                    </div>
                ) : departments.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {departments.map((department) => (
                            <DepartmentCard
                                key={department._id}
                                department={department}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-10">No departments found.</p>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                title="Add Department"
                onClose={() => setIsModalOpen(false)}
            >
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
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
                            className="shadow border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Department Name"
                            required
                        />
                        <label
                            htmlFor="departmentLocation"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Location
                        </label>
                        <input
                            type="text"
                            id="departmentLocation"
                            name="departmentLocation"
                            value={formData.departmentLocation}
                            onChange={handleInputChange}
                            className="shadow border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Department Location"
                            required
                        />
                        <label
                            htmlFor="departmentType"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Type
                        </label>
                        <input
                            type="text"
                            id="departmentType"
                            name="departmentType"
                            value={formData.departmentType}
                            onChange={handleInputChange}
                            className="shadow border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Department Type"
                            required
                        />
                        <label
                            htmlFor="departmentHead"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Head of Department
                        </label>
                        <input
                            type="text"
                            id="departmentHead"
                            name="departmentHead"
                            value={formData.departmentHead}
                            onChange={handleInputChange}
                            className="shadow border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Department Head Name"
                            required
                        />
                        <label
                            htmlFor="departmentEmployees"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Employees Count
                        </label>
                        <input
                            type="text"
                            id="departmentEmployees"
                            name="departmentEmployees"
                            value={formData.departmentEmployees}
                            onChange={handleInputChange}
                            className="shadow border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Number of Employees"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg mr-2 transition-all duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default Department;
