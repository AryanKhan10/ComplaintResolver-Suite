import React, { useState } from 'react';

const Notification = () => {
  const [notifications, setNotifications] = useState([
    { id: '#123-456ABC', date: '30/11/24', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: '#123-789DEF', date: '29/11/24', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { id: '#456-101GHI', date: '28/11/24', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
    { id: '#789-112JKL', date: '27/11/24', description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  // Filter notifications based on search query
  const filteredNotifications = notifications.filter((notification) =>
    notification.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-start bg-gray-100 h-screen p-5">
      {/* Placeholder for Sidebar and Header */}
      <div className="hidden">[Sidebar and Header Space]</div>

      <div style={{transform:"translate(14% ,0%)"}} className="w-full max-w-4xl bg-gray-200 rounded-md shadow-md p-5">
        {/* Title */}
        <h2 className="text-lg font-bold  text-gray-800 mb-4">Notifications</h2>

        {/* Search Bar */}
        <div className="flex justify-between  items-center mb-4">
          <input
            type="text"
            placeholder="Search by ID"
            className="border rounded-md px-4 py-2 w-full max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Notifications Table */}
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Serial No.</th>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{notification.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{notification.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{notification.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  No notifications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notification;
