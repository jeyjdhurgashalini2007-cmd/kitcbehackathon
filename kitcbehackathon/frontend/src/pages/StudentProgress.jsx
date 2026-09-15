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

const subjects = [
  { name: "Data Structures", score: 86, status: "Strong" },
  { name: "Artificial Intelligence", score: 81, status: "Good" },
  { name: "Database Management", score: 68, status: "Needs Improvement" },
  { name: "Computer Networks", score: 76, status: "Good" },
];

const recommendations = [
  "Practice SQL queries for 30 minutes every day.",
  "Revise database normalization and indexing concepts.",
  "Complete more practice problems before the next exam.",
];

function StudentProgress() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            My Progress
          </h1>
          <p className="mt-2 text-gray-500">
            Track your academic performance and identify areas for improvement.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Overall Score</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-800">78%</h2>
            <p className="mt-2 text-sm text-green-600">
              +6% from last month
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Attendance</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-800">82%</h2>
            <p className="mt-2 text-sm text-blue-600">
              Good attendance
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Assignments</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-800">12/15</h2>
            <p className="mt-2 text-sm text-orange-600">
              3 remaining
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Current Level</p>
            <h2 className="mt-2 text-3xl font-bold text-indigo-600">
              Good
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Keep improving
            </p>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">
            Performance Trend
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your performance over the last six months
          </p>

          <div className="mt-6 h-72 w-full">
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

        {/* Subject Performance */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">
            Subject Performance
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            See how you are performing in each subject.
          </p>

          <div className="mt-6 space-y-5">
            {subjects.map((subject) => (
              <div key={subject.name}>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {subject.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {subject.status}
                    </p>
                  </div>

                  <span className="font-semibold text-gray-800">
                    {subject.score}%
                  </span>
                </div>

                <div className="h-2 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-indigo-600"
                    style={{ width: `${subject.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Topics + AI Recommendation */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              Areas to Improve
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Topics that need more attention.
            </p>

            <div className="mt-5 space-y-3">
              <div className="rounded-lg bg-orange-50 p-4">
                <p className="font-medium text-gray-800">
                  SQL Queries
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Practice joins, subqueries and aggregate functions.
                </p>
              </div>

              <div className="rounded-lg bg-orange-50 p-4">
                <p className="font-medium text-gray-800">
                  Database Normalization
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Revise 1NF, 2NF, 3NF and functional dependencies.
                </p>
              </div>

              <div className="rounded-lg bg-orange-50 p-4">
                <p className="font-medium text-gray-800">
                  Indexing
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Learn how indexes improve database performance.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-indigo-50 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-indigo-600 px-3 py-2 text-xl">
                🤖
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  AI Recommendations
                </h2>

                <p className="text-sm text-gray-500">
                  Personalized suggestions based on your progress
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-4"
                >
                  <p className="text-sm leading-6 text-gray-700">
                    {recommendation}
                  </p>
                </div>
              ))}
            </div>

            <button className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700">
              View Study Plan
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentProgress;
