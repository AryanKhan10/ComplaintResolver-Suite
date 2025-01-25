import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../context/AppContext";
import API from "../../api/api";
import toast from "react-hot-toast";

const Account = () => {
  const { userId } = useContext(AppContext);
const navigate= useNavigate()
  const [IsUpdatingPassword, setIsUpdatingPassword]=useState(false);
  const [passwordData, setPasswordData]=useState({
    password: '',
    confirmPassword: ''
  });
  // const [confPassword, setConfPassword]=useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data
  const getUser = async () => {
    try {
      const res = await API.get(`/user/getUser/${userId}`);
      setUserInfo(res.data.user); // Update userInfo
    } catch (error) {
      console.log(error);
      toast.error("Cannot get user...");
    }
  };

  // Sync formData with userInfo when userInfo is fetched
  useEffect(() => {
    setFormData(userInfo); // Update formData when userInfo changes
  }, [userInfo]);

  useEffect(() => {
    getUser();
  }, []);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };
  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes and update the user info
  const handleSaveChanges = async() => {
    try {
      console.log(userId)
      const res = await API.put(`/user/updateUser/${userId}`, formData); // API call to update user details
      setUserInfo(res.data.user); // Update the local state with the updated user data
      setIsEditing(false);
      toast.success('Details updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update details...');
    }
  };

  // Discard changes and reset form
  const handleDiscardChanges = () => {
    setFormData(userInfo);
    setIsEditing(false);
  };

  // Update password
  const handlePasswordUpdate = async () => {
    const { password, confirmPassword } = passwordData;

    // Validate passwords
    if (password !== confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    try {
      console.log(passwordData)
      await API.put(`/user/resetPass/${userId}`, passwordData);
      toast.success('Password updated successfully!');
      setPasswordData({
        password: '',
        confirmPassword: '',
      });
      setIsUpdatingPassword(false);
      navigate('/')
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to update password.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-start bg-gray-100 h-screen p-5">
      <div className="mb-10 flex justify-end w-full">
        <button
                    type="button"
                    onClick={()=>setIsUpdatingPassword(prev=>!prev)}
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                  >
                    Change Password

        </button>
        </div>
      
        {IsUpdatingPassword && 
          <div style={{ transform: "translate(14%, 0%)" }}
          className="w-full max-w-4xl bg-gray-300 rounded-md shadow-md p-5 my-5">
            <div>
                <label className="block text-gray-700 font-bold mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={passwordData.password}
                  onChange={handlePasswordChange}
                  className="w-full border px-4 py-2 rounded-md"
                  placeholder="Enter New Password"
                />
              </div>
            <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Confirm Password
                </label>
                <input
  type="password"
  name="confirmPassword"
  value={passwordData.confirmPassword}
  onChange={handlePasswordChange}
  className="w-full border px-4 py-2 rounded-md"
  placeholder="Enter Confirm Password"
/>

              </div>

              <button
                    type="button"
                    onClick={handlePasswordUpdate}
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 my-4"
                  >
                    Change

              </button>
          </div>
        }
      <div
        style={{ transform: "translate(14%, 0%)" }}
        className="w-full max-w-4xl bg-gray-300 rounded-md shadow-md p-5"
      >
        {!isEditing ? (
          <>
            {/* Display user information */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-gray-800">Account</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Edit
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="text-gray-700 mb-2">
                <strong>First Name:</strong> {userInfo.firstName}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Last Name:</strong> {userInfo.lastName}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Email Address:</strong> {userInfo.email}
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> {userInfo.address}
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Display form for editing user information */}
            <h2 className="text-xl font-bold text-gray-800 mb-5">Edit Account</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleInputChange}
                  className="w-full border px-4 py-2 rounded-md"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleInputChange}
                  className="w-full border px-4 py-2 rounded-md"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  className="w-full border px-4 py-2 rounded-md"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address || ""}
                  onChange={handleInputChange}
                  className="w-full border px-4 py-2 rounded-md"
                  placeholder="Enter address"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={handleDiscardChanges}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Account;
