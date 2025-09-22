import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ApproverDashboard from "./components/ApproverDashboard";
import ApplyLeave from "./components/ApplyLeave";
import CancelLeave from "./components/CancelLeave";
import MyRequests from "./components/MyRequests";
import AdminHistory from "./components/AdminHistory";


const Home = () => (
  <div className="flex flex-col items-center  min-h-screen bg-green-100 p-6">
    <h2 className="text-red-600 font-bold mb-6 ">WELCOME TO LMS</h2>
    <p className=" mb-8 text-blue-500 text-lg">New User? <Link to="/register" className=" underline hover:decoration-pink-500 text-blue-800">Register Here</Link></p>
    <div className="flex gap-6">
      <Link to="/login/user" className=" px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700 transition">USER</Link>
      <Link to="/login/admin"className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-700">ADMIN</Link>
      <Link to="/login/approver" className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-700">APPROVER</Link>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login/:role" element={<Login />} />

        {/* Dashboards */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/approver-dashboard" element={<ApproverDashboard />} />

        {/* User Pages */}
        <Route path="/apply-leave" element={<ApplyLeave />} />
        <Route path="/cancel-leave" element={<CancelLeave />} />
        <Route path="/my-requests" element={<MyRequests />} />

        {/* Admin Extra Pages */}
        <Route path="/admin-history" element={<AdminHistory />} />
      </Routes>
    </Router>
  );
}
