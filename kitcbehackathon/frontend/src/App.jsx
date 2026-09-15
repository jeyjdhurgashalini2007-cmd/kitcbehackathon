import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProgress from "./pages/StudentProgress";

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/admin/dashboard")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load admin dashboard");
        }
        return response.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  if (!data) {
    return <div className="p-8">Loading admin dashboard...</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg shadow bg-white">
          <h2>Total Students</h2>
          <p className="text-3xl font-bold">{data.total_students}</p>
        </div>

        <div className="p-6 rounded-lg shadow bg-white">
          <h2>Total Teachers</h2>
          <p className="text-3xl font-bold">{data.total_teachers}</p>
        </div>

        <div className="p-6 rounded-lg shadow bg-white">
          <h2>Total Courses</h2>
          <p className="text-3xl font-bold">{data.total_courses}</p>
        </div>

        <div className="p-6 rounded-lg shadow bg-white">
          <h2>At-Risk Students</h2>
          <p className="text-3xl font-bold">{data.at_risk_students}</p>
        </div>

        <div className="p-6 rounded-lg shadow bg-white">
          <h2>Average Attendance</h2>
          <p className="text-3xl font-bold">{data.average_attendance}%</p>
        </div>

        <div className="p-6 rounded-lg shadow bg-white">
          <h2>Average Performance</h2>
          <p className="text-3xl font-bold">{data.average_performance}%</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/student/dashboard" />} />

        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />
        <Route
  path="/student/progress"
  element={<StudentProgress />}
/>
        
        

        
        

        

        

        

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route path="*" element={<Navigate to="/student/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;