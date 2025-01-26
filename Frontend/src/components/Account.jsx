import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../context/AppContext";
import API from "../../api/api";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faMapMarkerAlt, faEdit, faLock } from "@fortawesome/free-solid-svg-icons";

const Account = () => {
  const { userId } = useContext(AppContext);
  const navigate = useNavigate();
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({ password: "", confirmPassword: "" });
  const [userInfo, setUserInfo] = useState({});
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data
  const getUser = async () => {
    try {
      const res = await API.get(`/user/getUser/${userId}`);
      setUserInfo(res.data.user);
    } catch (error) {
      console.error(error);
      toast.error("Cannot fetch user data.");
    }
  };

  // Sync formData with userInfo when userInfo is fetched
  useEffect(() => {
    setFormData(userInfo);
  }, [userInfo]);

  useEffect(() => {
    getUser();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const res = await API.put(`/user/updateUser/${userId}`, formData);
      setUserInfo(res.data.user);
      setIsEditing(false);
      toast.success("Details updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update details.");
    }
  };

  const handleDiscardChanges = () => {
    setFormData(userInfo);
    setIsEditing(false);
  };

  const handlePasswordUpdate = async () => {
    const { password, confirmPassword } = passwordData;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      await API.put(`/user/resetPass/${userId}`, passwordData);
      toast.success("Password updated successfully!");
      setPasswordData({ password: "", confirmPassword: "" });
      setIsUpdatingPassword(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUser} className="text-blue-500 text-2xl mr-4" />
            <div>
              <p className="text-lg font-semibold text-gray-800">{userInfo.firstName} {userInfo.lastName}</p>
              <p className="text-sm text-gray-600">UserID: {userId}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            <FontAwesomeIcon icon={faEdit} className="mr-2" />
            Edit
          </button>
        </div>

        {!isEditing ? (
          <>
            {/* Static Display */}
            <div className="mb-4">
              <div className="flex items-center border-b pb-4 mb-4">
                <FontAwesomeIcon icon={faEnvelope} className="text-green-500 text-2xl mr-4" />
                <p className="text-lg font-semibold text-gray-800">Email: {userInfo.email}</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 text-2xl mr-4" />
                <p className="text-lg font-semibold text-gray-800">Address: {userInfo.address}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Editable Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleInputChange}
                  className="w-full border px-4 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleInputChange}
                  className="w-full border px-4 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  className="w-full border px-4 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address || ""}
                  onChange={handleInputChange}
                  className="w-full border px-4 py-2 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={handleDiscardChanges}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Discard
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}

        {/* Change Password Section */}
        <button
          onClick={() => setIsUpdatingPassword((prev) => !prev)}
          className="mt-6 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 w-full"
        >
          <FontAwesomeIcon icon={faLock} className="mr-2" />
          Change Password
        </button>

        {isUpdatingPassword && (
          <div className="mt-4 bg-gray-100 p-4 rounded-md">
            <div>
              <label className="block text-gray-700 font-bold mb-2">New Password</label>
              <input
                type="password"
                name="password"
                value={passwordData.password}
                onChange={handlePasswordChange}
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-bold mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
            <button
              onClick={handlePasswordUpdate}
              className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 w-full"
            >
              Update Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
