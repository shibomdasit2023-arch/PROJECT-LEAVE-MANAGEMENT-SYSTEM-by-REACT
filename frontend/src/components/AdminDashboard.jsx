/*import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/leave`)
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch(() => alert("Error fetching leaves"));
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`${API_URL}/leave/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setRequests((prev) =>
      prev.map((req) => (req._id === id ? { ...req, status } : req))
    );
  };

  return (
    <div className="justify-center min-h-screen p-6 bg-green-300 admin-page ">
      <h2 className="mb-10 text-3xl font-bold text-red-500 ">Admin Panel - Leave Requests</h2>

     

      <table className="w-full px-3 py-3 bg-white border-collapse rounded shadow-md">
        <thead>
          <tr className="font-bold text-blue-600 underline ">
            <th>User</th>
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className="font-semibold text-yellow-700">
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.user}</td>
              <td>{req.type}</td>
              <td>{new Date(req.from).toLocaleDateString()}</td>
              <td>{new Date(req.to).toLocaleDateString()}</td>
              <td>{req.status}</td>
              <td>
                <button onClick={() => updateStatus(req._id, "Approved")} className="px-2 py-1 text-green-600 bg-blue-300 rounded-lg">Approve</button>
                <button onClick={() => updateStatus(req._id, "Rejected")} className="px-2 py-1 text-red-600 bg-blue-300 rounded-lg ">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
      <div className="admin-links">
        <Link to="/admin-history" className="px-2 py-2 text-yellow-800 bg-yellow-300 rounded btn">View Leave History</Link>
      </div>
    </div>
  );
}
*/




import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/leave`)
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch(() => alert("Error fetching leaves"));
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`${API_URL}/leave/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setRequests((prev) =>
      prev.map((req) => (req._id === id ? { ...req, status } : req))
    );
  };

  return (
    <div className="min-h-screen p-6 bg-green-100">
      <div className="max-w-6xl p-6 mx-auto bg-white shadow-lg rounded-2xl">
        <h2 className="mb-6 text-3xl font-bold text-green-700">
          Admin Panel - Leave Requests
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full overflow-hidden bg-white border-collapse rounded-lg shadow">
            <thead className="text-green-800 bg-green-200">
              <tr>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">From</th>
                <th className="px-4 py-3 text-left">To</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((req) => (
                  <tr
                    key={req._id}
                    className="transition border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{req.user}</td>
                    <td className="px-4 py-3">{req.type}</td>
                    <td className="px-4 py-3">
                      {new Date(req.from).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(req.to).toLocaleDateString()}
                    </td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        req.status === "Approved"
                          ? "text-green-600"
                          : req.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {req.status}
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() => updateStatus(req._id, "Approved")}
                        className="px-3 py-1 text-white transition bg-green-500 rounded-lg shadow hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(req._id, "Rejected")}
                        className="px-3 py-1 text-white transition bg-red-500 rounded-lg shadow hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-6 italic text-center text-gray-500"
                  >
                    No leave requests available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 🔹 Navigation to Admin History */}
        <div className="mt-6">
          <Link
            to="/admin-history"
            className="inline-block px-4 py-2 font-semibold text-yellow-900 transition bg-yellow-400 rounded-lg shadow hover:bg-yellow-500"
          >
            📜 View Leave History
          </Link>
        </div>
      </div>
    </div>
  );
}
