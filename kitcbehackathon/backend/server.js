const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Load student data
const students = JSON.parse(fs.readFileSync("students.json"));

// Login route
app.post("/login", (req, res) => {
  const { id, password } = req.body;
  if (students[id] && students[id].password === password) {
    res.json({ success: true, student: students[id] });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

// Get student details
app.get("/student/:id", (req, res) => {
  const id = req.params.id;
  if (students[id]) {
    res.json(students[id]);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
