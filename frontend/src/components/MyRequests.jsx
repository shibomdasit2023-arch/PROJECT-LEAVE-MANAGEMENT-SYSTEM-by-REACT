import { useState, useEffect } from "react";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // 🔹 Replace with API call
    setRequests([
      {
        id: 1,
        type: "Sick Leave",
        from: "2025-09-01",
        to: "2025-09-03",
        reason: "Fever",
        status: "Pending",
      },
      {
        id: 2,
        type: "Casual Leave",
        from: "2025-09-10",
        to: "2025-09-11",
        reason: "Personal Work",
        status: "Approved",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl p-6 mx-auto bg-white shadow-lg rounded-2xl">
        <h2 className="mb-6 text-2xl font-bold text-indigo-700">
          My Leave Requests
        </h2>

        {/* 🔹 Filters */}
        <div className="flex flex-wrap gap-6 mb-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Status
            </label>
            <select className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <option value="all">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Type
            </label>
            <select className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <option value="all">All</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Earned Leave">Earned Leave</option>
            </select>
          </div>
        </div>

        {/* 🔹 Export Buttons */}
        <div className="flex gap-4 mb-6">
          <button className="px-4 py-2 font-semibold text-white transition bg-red-500 rounded-lg shadow hover:bg-red-600">
            📄 Download PDF
          </button>
          <button className="px-4 py-2 font-semibold text-white transition bg-green-500 rounded-lg shadow hover:bg-green-600">
            📊 Download Excel
          </button>
        </div>

        {/* 🔹 Requests Table */}
        <div className="overflow-x-auto">
          <table className="w-full overflow-hidden bg-white border-collapse rounded-lg shadow">
            <thead className="text-indigo-800 bg-indigo-100">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">From</th>
                <th className="px-4 py-3 text-left">To</th>
                <th className="px-4 py-3 text-left">Reason</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((r) => (
                  <tr
                    key={r.id}
                    className="transition border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{r.id}</td>
                    <td className="px-4 py-3">{r.type}</td>
                    <td className="px-4 py-3">{r.from}</td>
                    <td className="px-4 py-3">{r.to}</td>
                    <td className="px-4 py-3">{r.reason}</td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        r.status === "Approved"
                          ? "text-green-600"
                          : r.status === "Rejected"
                          ? "text-red-600"
                          : r.status === "Cancelled"
                          ? "text-gray-500"
                          : "text-yellow-600"
                      }`}
                    >
                      {r.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
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
