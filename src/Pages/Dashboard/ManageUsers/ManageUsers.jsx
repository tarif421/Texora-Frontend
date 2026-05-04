import React, { useEffect, useState } from "react";
// Assuming you use axios for API calls, if you use fetch, adjust accordingly
import axios from "axios"; 

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Function to handle the Suspend action
  const handleSuspend = async (id, currentName) => {
    // Add a confirmation prompt before suspending
    const confirmSuspend = window.confirm(`Are you sure you want to suspend ${currentName}?`);
    
    if (!confirmSuspend) return;

    try {
      const response = await axios.patch(`http://localhost:5000/users/suspend/${id}`);
      
      if (response.data.modifiedCount > 0) {
        alert("User has been suspended successfully.");
        // Update the UI instantly without reloading
        setUsers(users.map(user => 
          user._id === id ? { ...user, role: "suspended" } : user
        ));
      }
    } catch (error) {
      console.error("Error suspending user:", error);
      alert("Failed to suspend the user.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b text-left">Name</th>
              <th className="py-3 px-4 border-b text-left">Email</th>
              <th className="py-3 px-4 border-b text-left">Role</th>
              <th className="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{user.name}</td>
                <td className="py-3 px-4 border-b">{user.email}</td>
                <td className="py-3 px-4 border-b">
                  <span className={`px-2 py-1 rounded text-sm ${
                    user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 
                    user.role === 'suspended' ? 'bg-red-100 text-red-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4 border-b">
                  {/* Suspend Button - Disabled if already suspended */}
                  <button
                    onClick={() => handleSuspend(user._id, user.name)}
                    disabled={user.role === "suspended"}
                    className={`px-4 py-2 rounded text-white ${
                      user.role === "suspended" 
                        ? "bg-gray-400 cursor-not-allowed" 
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {user.role === "suspended" ? "Suspended" : "Suspend"}
                  </button>
                  
                  {/* You can add your 'Approve' or 'Make Admin' button here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;