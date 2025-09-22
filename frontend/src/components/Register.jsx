import { useState } from "react";

const API_URL = "http://localhost:3000";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Registration failed");
      } else {
        setMessage("✅ Registration successful! Please login.");
        setUsername("");
        setPassword("");
        setRole("");
      }
    } catch (err) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="flex justify-center min-h-screen p-6 bg-green-300 register-container">
      <div className="register-card">
        <h2 className="mb-10 text-lg font-bold text-blue-600">Create an Account</h2>

        <form onSubmit={handleSubmit} className="w-full p-6 bg-white border-collapse rounded-lg shadow-md">
          <div className="form-group">
            <label className="font-semibold text-blue-800">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} required  className="flex gap-3 mb-4 text-black bg-blue-100 border border-gray-300 rounded"/>
          </div>

          <div className="form-group">
            <label className="font-semibold text-blue-800">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required  className="flex gap-3 mb-4 text-black bg-blue-100 border border-gray-300 rounded"/>
          </div>

          <div className="form-group">
            <label className="font-semibold text-blue-800 ">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="">Select a role</option>
              <option value="user"    className="flex gap-3 mb-4 text-blue-700 bg-blue-100 border border-gray-300 rounded">User</option>
              <option value="admin"  className="flex gap-3 mb-4 text-green-700 bg-green-100 border border-gray-300 rounded">Admin</option>
              <option value="approver"  className="flex gap-3 mb-4 text-purple-700 bg-purple-100 border border-gray-300 rounded">Approver</option>
            </select>
          </div>

          <button type="submit"  className="w-full py-2 text-white transition bg-blue-500 rounded hover:bg-blue-700">Register</button>
        </form>

        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Register;
