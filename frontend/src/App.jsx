import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <h1 className="text-4xl font-bold">
                Student Performance Platform
              </h1>
            </div>
          }
        />

        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;