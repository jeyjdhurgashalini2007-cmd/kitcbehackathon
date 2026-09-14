import DashboardLayout from "../layouts/DashboardLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const performanceData = [
  { month: "Jan", score: 62 },
  { month: "Feb", score: 68 },
  { month: "Mar", score: 65 },
  { month: "Apr", score: 72 },
  { month: "May", score: 78 },
  { month: "Jun", score: 82 },
];

const courses = [
  {
    name: "Data Structures",
    progress: 82,
    instructor: "Dr. Kumar",
  },
  {
    name: "Database Management",
    progress: 68,
    instructor: "Prof. Priya",
  },
  {
    name: "Artificial Intelligence",
    progress: 74,
    instructor: "Dr. Arun",
  },
];

const assignments = [
  {
    title: "Binary Trees Assignment",
    course: "Data Structures",
    status: "Submitted",
  },
  {
    title: "SQL Query Practice",
    course: "Database Management",
    status: "Pending",
  },
  {
    title: "ML Classification Task",
    course: "Artificial Intelligence",
    status: "Submitted",
  },
];

function StudentDashboard() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6 md:p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, Student! 👋
          </h1>
          <p className="mt-2 text-gray-500">
            Here's an overview of your academic performance.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Attendance</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-800">
              82%
            </h2>
            <p className="mt-2 text-sm text-green-600">
              Good attendance
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Average Grade</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-800">
              78%
            </h2>
            <p className="mt-2 text-sm text-blue-600">
              Improving steadily
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Assignments</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-800">
              12 / 15
            </h2>
            <p className="mt-2 text-sm text-orange-600">
              3 remaining
            </p>
          </div>

        </div>

        {/* Performance Chart */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Performance Trend
            </h2>
            <p className="text-sm text-gray-500">
              Your academic performance over the last six months
            </p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Courses */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            My Courses
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.name}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <h3 className="font-semibold text-gray-800">
                  {course.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {course.instructor}
                </p>

                <div className="mt-5">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-500">
                      Progress
                    </span>

                    <span className="font-semibold">
                      {course.progress}%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-indigo-600"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assignments + AI Recommendation */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Assignments */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-gray-800">
              Recent Assignments
            </h2>

            <div className="space-y-4">
              {assignments.map((assignment) => (
                <div
                  key={assignment.title}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {assignment.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {assignment.course}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      assignment.status === "Submitted"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {assignment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="rounded-xl bg-indigo-50 p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">

              <div className="rounded-lg bg-indigo-600 px-3 py-2 text-xl">
                🤖
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  AI Study Recommendation
                </h2>

                <p className="text-sm text-gray-500">
                  Personalized for your performance
                </p>
              </div>

            </div>

            <p className="leading-7 text-gray-700">
              Your recent performance is improving, but your Database
              Management progress is lower than your other courses.
              Consider spending extra time practicing SQL queries this
              week.
            </p>

            <button className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700">
              View Study Plan
            </button>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;