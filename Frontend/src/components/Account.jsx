import React, { useState } from 'react';

const Account = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    address: '1234 Elm Street, Apartment 56B, Springfield, IL 62701',
    userId: 'user_00123',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userInfo);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save changes and update the user info
  const handleSaveChanges = () => {
    setUserInfo(formData);
    setIsEditing(false);
  };

  // Discard changes and reset form
  const handleDiscardChanges = () => {
    setFormData(userInfo);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center justify-start bg-gray-100 h-screen p-5">
      <div style={{ transform: 'translate(14%, 0%)' }} className="w-full max-w-4xl bg-gray-300 rounded-md shadow-md p-5">
        {!isEditing ? (
          // Display user information
          <>
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
                <strong>Full Name:</strong> {userInfo.fullName}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Email Address:</strong> {userInfo.email}
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> {userInfo.address}
              </p>
              <p className="text-gray-700 mt-4">
                <strong>User ID:</strong> {userInfo.userId}
              </p>
            </div>
          </>
        ) : (
          // Display form for editing user information
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-5">Edit Account</h2>

            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full border px-4 py-2 rounded-md"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
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
                  value={formData.address}
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
