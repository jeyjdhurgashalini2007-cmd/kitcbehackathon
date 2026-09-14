import { Link } from "react-router-dom";

function PublicNavbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            SP
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Student Performance
            </h1>
            <p className="text-xs text-gray-500">
              Learn. Improve. Succeed.
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/courses"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Courses
          </Link>

          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Contact
          </Link>

          <Link
            to="/student/dashboard"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
          >
            Student Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default PublicNavbar;