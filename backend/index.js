const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://localhost:27017/LMS", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

const User = mongoose.model('User', userSchema);

// Leave Schema
const leaveSchema = new mongoose.Schema({
  user: String,
  type: String,
  from: Date,
  to: Date,
  reason: String,
  status: { type: String, default: 'Pending' }, // 'Pending', 'Approved', 'Rejected', 'Cancelled'
});

const Leave = mongoose.model('Leave', leaveSchema);

// Register user
app.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // prevent duplicate usernames
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "Username already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed, role });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login user
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ message: "User Not Found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Wrong Password" });

    res.json({ role: user.role, username: user.username });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// Apply for leave
app.post("/leave", async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.json({ message: "Leave application submitted", leave });
  } catch (err) {
    res.status(500).json({ message: "Error applying for leave" });
  }
});

// Get all leaves (Admin)
app.get("/leave", async (req, res) => {
  const leaves = await Leave.find();
  res.json(leaves);
});

// Get user-specific leaves
app.get("/leave/:username", async (req, res) => {
  const leaves = await Leave.find({ user: req.params.username });
  res.json(leaves);
});

// Cancel leave
app.put("/leave/:id/cancel", async (req, res) => {
  const leave = await Leave.findByIdAndUpdate(
    req.params.id,
    { status: 'Cancelled' },
    { new: true }
  );
  res.json(leave);
});

// Update leave status (Admin/Approver)
app.put("/leave/:id/status", async (req, res) => {
  const { status } = req.body;
  const leave = await Leave.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(leave);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
