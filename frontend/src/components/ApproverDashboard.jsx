import { useState, useEffect } from "react";

const API_URL = "http://localhost:3000";

export default function ApproverDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/leave`)
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch(() => alert("Error fetching requests"));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/leave/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) return alert("Error updating status");

      setRequests((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
    } catch {
      alert("Server error");
    }
  };

  return (
    <div className="approver-page bg-green-300 min-h-screen p-6">
      <h2 className="text-red-500 mb-6 font-bold text-3xl ">Leave Requests</h2>
      <table className="w-full border-collapse bg-white shadow-md">
        <thead>
          <tr className="text-blue-600 font-bold underline">
            <th>User</th>
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-yellow-700 font-semibold">
          {requests.map((r) => (
            <tr key={r._id}>
              <td>{r.user}</td>
              <td>{r.type}</td>
              <td>{new Date(r.from).toLocaleDateString()}</td>
              <td>{new Date(r.to).toLocaleDateString()}</td>
              <td>{r.status}</td>
              <td>
                <button onClick={() => updateStatus(r._id, "Approved")} className="bg-blue-300 rounded-lg text-green-600">Approve</button>
                <button onClick={() => updateStatus(r._id, "Rejected")} className="bg-blue-300 rounded-lg text-red-600">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
