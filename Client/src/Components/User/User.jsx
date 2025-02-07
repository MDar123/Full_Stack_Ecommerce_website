import axios from "axios";
import { useState, useEffect } from "react";

const UserDetails = () => {
  const [users, setUsers] = useState([]);

  async function GetAllUsers() {
    const response = await axios.get("http://localhost:8000/AdminDashboard/GetAllUsers/");
    setUsers(response.data);
  }

  useEffect(() => {
    GetAllUsers();
  }, []);

  return (
    <>
      {users.length > 0 ? (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Admin User Dashboard</h2>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left border-b font-medium">User ID</th>
                  <th className="p-4 text-left border-b font-medium">Name</th>
                  <th className="p-4 text-left border-b font-medium">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="p-4 border-b">#{user.id}</td>
                    <td className="p-4 border-b">{user.username}</td>
                    <td className="p-4 border-b">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">No Users Found</div>
      )}
    </>
  );
};

export default UserDetails;
