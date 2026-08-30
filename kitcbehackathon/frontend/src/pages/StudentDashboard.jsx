import DashboardLayout from "../layouts/DashboardLayout";

function StudentDashboard() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, Student! 👋
        </h1>

        <p className="mt-2 text-gray-500">
          Here's an overview of your academic performance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500">Attendance</p>
            <h2 className="text-3xl font-bold mt-2">82%</h2>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500">Average Grade</p>
            <h2 className="text-3xl font-bold mt-2">78%</h2>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500">Assignments</p>
            <h2 className="text-3xl font-bold mt-2">12 / 15</h2>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;