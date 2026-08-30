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

        <div className="px-4 py-3 text-gray-500 cursor-not-allowed">
          👤 Profile
        </div>

        <div className="px-4 py-3 text-gray-500 cursor-not-allowed">
          📅 Attendance
        </div>

        <div className="px-4 py-3 text-gray-500 cursor-not-allowed">
          📝 Assignments
        </div>

        <div className="px-4 py-3 text-gray-500 cursor-not-allowed">
          📊 Grades
        </div>

        <div className="px-4 py-3 text-gray-500 cursor-not-allowed">
          📈 Performance
        </div>

        <div className="px-4 py-3 text-gray-500 cursor-not-allowed">
          💡 Recommendations
        </div>
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