import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const API_URL = "http://localhost:3000";

export default function Login() {
  const { role } = useParams(); 
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);

      // ✅ Fixed paths
      if (data.role === "user") navigate("/user-dashboard");
      if (data.role === "admin") navigate("/admin-dashboard");
      if (data.role === "approver") navigate("/approver-dashboard");
    } catch (err) {
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen p-6 bg-green-300 login-page">
      <div className="form-container">
        <h2 className="mb-10 text-lg font-bold text-blue-600">Login ({role})</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          className="flex gap-3 px-4 py-2 mb-4 text-black bg-blue-100 border border-gray-300 rounded"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="px-4 py-2 mb-4 text-black bg-blue-100 border border-gray-300 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={loading} className="w-full py-2 text-white transition bg-blue-500 rounded hover:bg-blue-700">
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
