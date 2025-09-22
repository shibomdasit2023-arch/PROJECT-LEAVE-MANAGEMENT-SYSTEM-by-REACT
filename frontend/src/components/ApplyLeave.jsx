import { useState } from "react";

const API_URL = "http://localhost:3000";

export default function ApplyLeave() {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("username");

    if (!leaveType || !fromDate || !toDate || !reason) {
      return alert("⚠️ Please fill in all fields");
    }

    try {
      const res = await fetch(`${API_URL}/leave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: username,
          type: leaveType,
          from: fromDate,
          to: toDate,
          reason,
        }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message || "❌ Error applying leave");

      alert("✅ Leave request submitted!");
      setLeaveType("");
      setFromDate("");
      setToDate("");
      setReason("");
    } catch {
      alert("🚨 Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-blue-700">
          Apply for Leave
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Leave Type */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Leave Type
            </label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select --</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Earned Leave">Earned Leave</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Reason
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason..."
              rows="3"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-700"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
