import { Link, useParams } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";

const courseData = {
  1: {
    title: "Mathematics",
    category: "Science & Mathematics",
    level: "Intermediate",
    description:
      "Build confidence in mathematics through structured concepts, examples and practice.",
    topics: [
      "Algebra & Equations",
      "Geometry",
      "Statistics",
      "Probability",
      "Problem Solving",
    ],
  },
  2: {
    title: "Physics",
    category: "Science",
    level: "Intermediate",
    description:
      "Explore fundamental physics concepts and understand how they apply to the real world.",
    topics: [
      "Motion",
      "Forces",
      "Energy",
      "Electricity",
      "Waves",
    ],
  },
  3: {
    title: "Computer Science",
    category: "Technology",
    level: "Beginner",
    description:
      "Learn programming fundamentals and develop computational problem-solving skills.",
    topics: [
      "Programming Basics",
      "Variables & Functions",
      "Data Structures",
      "Algorithms",
      "Problem Solving",
    ],
  },
};

function CourseDetails() {
  const { id } = useParams();

  const course = courseData[id] || courseData[1];

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />

      <section className="bg-gradient-to-br from-blue-700 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="text-blue-200 font-semibold">
            {course.category}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            {course.title}
          </h1>

          <p className="mt-5 text-blue-100 max-w-2xl text-lg">
            {course.description}
          </p>

          <div className="mt-6 inline-block bg-white/15 px-4 py-2 rounded-lg">
            Level: {course.level}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">
            Course Overview
          </h2>

          <p className="text-gray-500 mt-4 leading-7">
            This course provides a structured learning experience with
            important concepts, guided practice and opportunities to monitor
            your progress.
          </p>

          <h3 className="text-xl font-bold mt-10">
            What you'll learn
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 mt-5">
            {course.topics.map((topic) => (
              <div
                key={topic}
                className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg"
              >
                <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                  ✓
                </span>

                <span className="font-medium text-gray-700">
                  {topic}
                </span>
              </div>
            ))}
          </div>
        </section>

        <aside className="bg-white rounded-2xl p-7 border border-gray-100 h-fit">
          <p className="text-sm text-gray-500">
            Course access
          </p>

          <h2 className="text-2xl font-bold mt-2">
            Start Learning
          </h2>

          <p className="text-gray-500 text-sm mt-3">
            Access your learning dashboard and track your progress.
          </p>

          <Link
            to="/student/dashboard"
            className="block text-center mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>

          <Link
            to="/courses"
            className="block text-center mt-3 border border-gray-200 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to Courses
          </Link>
        </aside>
      </main>
    </div>
  );
}

export default CourseDetails;