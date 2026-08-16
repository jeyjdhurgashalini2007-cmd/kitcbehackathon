import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-5">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">
          EduTrack
        </h2>
        <p className="text-sm text-gray-400">
          Student Platform
        </p>
      </div>

      <nav className="space-y-2">
        <Link
          to="/student/dashboard"
          className="block px-4 py-3 rounded-lg hover:bg-gray-800"
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/student/profile"
          className="block px-4 py-3 rounded-lg hover:bg-gray-800"
        >
          👤 Profile
        </Link>

        <Link
          to="/student/attendance"
          className="block px-4 py-3 rounded-lg hover:bg-gray-800"
        >
          📅 Attendance
        </Link>

        <Link
          to="/student/assignments"
          className="block px-4 py-3 rounded-lg hover:bg-gray-800"
        >
          📝 Assignments
        </Link>

        <Link
          to="/student/grades"
          className="block px-4 py-3 rounded-lg hover:bg-gray-800"
        >
          📊 Grades
        </Link>

        <Link
          to="/student/performance"
          className="block px-4 py-3 rounded-lg hover:bg-gray-800"
        >
          📈 Performance
        </Link>

        <Link
          to="/student/recommendations"
          className="block px-4 py-3 rounded-lg hover:bg-gray-800"
        >
          💡 Recommendations
        </Link>
      </nav>

      <div className="mt-10 border-t border-gray-700 pt-5">
        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800">
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;