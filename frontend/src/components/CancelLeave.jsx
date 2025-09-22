import { useState, useEffect } from "react";

const API_URL = "http://localhost:3000";

export default function CancelLeave() {
  const [requests, setRequests] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetch(`${API_URL}/leave/${username}`)
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch(() => alert("Error fetching requests"));
  }, [username]);

  const cancelRequest = async (id) => {
    try {
      const res = await fetch(`${API_URL}/leave/${id}/cancel`, { method: "PUT" });
      const data = await res.json();
      if (!res.ok) return alert("Error cancelling leave");

      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "Cancelled" } : r))
      );
      alert("✅ Leave cancelled");
    } catch {
      alert("🚨 Server error");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-red-50">
      <div className="max-w-5xl p-6 mx-auto bg-white shadow-lg rounded-2xl">
        <h2 className="mb-6 text-2xl font-bold text-red-600">
          Cancel Leave Requests
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full overflow-hidden bg-white border-collapse rounded-lg shadow">
            <thead className="text-red-800 bg-red-100">
              <tr>
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
                          : req.status === "Cancelled"
                          ? "text-gray-500"
                          : "text-yellow-600"
                      }`}
                    >
                      {req.status}
                    </td>
                    <td className="px-4 py-3">
                      {req.status === "Pending" ? (
                        <button
                          onClick={() => cancelRequest(req._id)}
                          className="px-3 py-1 text-white transition bg-red-500 rounded-lg shadow hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="italic text-gray-400">N/A</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-6 italic text-center text-gray-500"
                  >
                    No leave requests found.
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
