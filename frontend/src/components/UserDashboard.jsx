import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000";

export default function UserDashboard() {
  const username = localStorage.getItem("username");
  const [myLeaves, setMyLeaves] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/leave/${username}`)
      .then((res) => res.json())
      .then((data) => setMyLeaves(data))
      .catch(() => alert("Error loading requests"));
  }, [username]);

  return (
    <div className="min-h-screen p-6 bg-blue-50">
      <div className="max-w-5xl p-6 mx-auto bg-white shadow-lg rounded-2xl">
        {/* Welcome Section */}
        <h2 className="mb-6 text-2xl font-bold text-blue-700">
          Welcome <span className="text-gray-800">{username}</span> - User Panel
        </h2>

        {/* 🔹 Quick Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            to="/apply-leave"
            className="px-4 py-2 font-semibold text-white transition bg-green-500 rounded-lg shadow hover:bg-green-600"
          >
            ➕ Apply Leave
          </Link>
          <Link
            to="/cancel-leave"
            className="px-4 py-2 font-semibold text-white transition bg-red-500 rounded-lg shadow hover:bg-red-600"
          >
            ❌ Cancel Leave
          </Link>
          <Link
            to="/my-requests"
            className="px-4 py-2 font-semibold text-yellow-900 transition bg-yellow-400 rounded-lg shadow hover:bg-yellow-500"
          >
            📜 My Requests
          </Link>
        </div>

        {/* Recent Leave Requests */}
        <h3 className="mb-4 text-xl font-semibold text-gray-700">
          Recent Leave Requests
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full overflow-hidden bg-white border-collapse rounded-lg shadow">
            <thead className="text-blue-800 bg-blue-100">
              <tr>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">From</th>
                <th className="px-4 py-3 text-left">To</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {myLeaves.length > 0 ? (
                myLeaves
                  .slice(-5)
                  .reverse()
                  .map((leave) => (
                    <tr
                      key={leave._id}
                      className="transition border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">{leave.type}</td>
                      <td className="px-4 py-3">
                        {new Date(leave.from).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(leave.to).toLocaleDateString()}
                      </td>
                      <td
                        className={`px-4 py-3 font-semibold ${
                          leave.status === "Approved"
                            ? "text-green-600"
                            : leave.status === "Rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {leave.status}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-6 italic text-center text-gray-500"
                  >
                    No recent leave requests.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
