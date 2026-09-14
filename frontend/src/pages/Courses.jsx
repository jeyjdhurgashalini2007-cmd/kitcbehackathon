import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";

const courses = [
  {
    id: 1,
    title: "Mathematics",
    category: "Science & Mathematics",
    level: "Intermediate",
    description:
      "Build strong mathematical foundations through concepts, examples and practice.",
  },
  {
    id: 2,
    title: "Physics",
    category: "Science",
    level: "Intermediate",
    description:
      "Understand core physics concepts and connect theory with real-world applications.",
  },
  {
    id: 3,
    title: "Computer Science",
    category: "Technology",
    level: "Beginner",
    description:
      "Learn programming fundamentals, problem solving and computational thinking.",
  },
  {
    id: 4,
    title: "English Communication",
    category: "Language",
    level: "Beginner",
    description:
      "Improve communication, writing and presentation skills for academic success.",
  },
  {
    id: 5,
    title: "Data Science Basics",
    category: "Technology",
    level: "Advanced",
    description:
      "Explore data, patterns and basic analytical techniques through practical learning.",
  },
  {
    id: 6,
    title: "Study Skills",
    category: "Personal Development",
    level: "Beginner",
    description:
      "Develop effective study habits, time management and exam preparation strategies.",
  },
];

function Courses() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />

      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <p className="text-blue-600 font-semibold">LEARNING HUB</p>

          <h1 className="text-4xl font-bold text-gray-900 mt-2">
            Explore Courses
          </h1>

          <p className="text-gray-500 mt-4 max-w-2xl">
            Find courses designed to strengthen your academic knowledge and
            build skills for the future.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-3 mb-8">
          <button className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium">
            All Courses
          </button>

          <button className="px-4 py-2 rounded-full bg-white border text-gray-600 text-sm">
            Science
          </button>

          <button className="px-4 py-2 rounded-full bg-white border text-gray-600 text-sm">
            Technology
          </button>

          <button className="px-4 py-2 rounded-full bg-white border text-gray-600 text-sm">
            Mathematics
          </button>

          <button className="px-4 py-2 rounded-full bg-white border text-gray-600 text-sm">
            Language
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="h-32 bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white">
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  {course.category}
                </span>

                <h2 className="text-2xl font-bold mt-5">
                  {course.title}
                </h2>
              </div>

              <div className="p-6">
                <div className="text-sm text-gray-500">
                  Level:{" "}
                  <span className="font-medium text-gray-700">
                    {course.level}
                  </span>
                </div>

                <p className="text-gray-500 text-sm mt-4 leading-6">
                  {course.description}
                </p>

                <Link
                  to={`/courses/${course.id}`}
                  className="block text-center mt-6 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  View Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Courses;