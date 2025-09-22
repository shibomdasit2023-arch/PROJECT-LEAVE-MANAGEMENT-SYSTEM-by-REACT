import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000";

export default function AdminHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/leave`)
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch(() => alert("Error fetching history"));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-5xl p-6 mx-auto bg-white shadow-lg rounded-2xl">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          All Users Leave History
        </h2>

        {/* 🔹 Navigation back to Dashboard */}
        <div className="mb-6">
          <Link
            to="/admin-dashboard"
            className="inline-block px-4 py-2 text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-700"
          >
            ⬅ Back to Dashboard
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full overflow-hidden bg-white border-collapse rounded-lg shadow">
            <thead className="text-gray-700 bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">From</th>
                <th className="px-4 py-3 text-left">To</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? (
                history.map((h) => (
                  <tr
                    key={h._id}
                    className="transition border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{h.user}</td>
                    <td className="px-4 py-3">{h.type}</td>
                    <td className="px-4 py-3">
                      {new Date(h.from).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(h.to).toLocaleDateString()}
                    </td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        h.status === "Approved"
                          ? "text-green-600"
                          : h.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {h.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-6 italic text-center text-gray-500"
                  >
                    No leave history found.
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
