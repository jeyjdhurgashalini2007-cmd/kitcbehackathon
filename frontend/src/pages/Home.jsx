import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <p className="text-blue-200 font-semibold mb-4">
              AI-POWERED ACADEMIC PLATFORM
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Turn Your Academic Data Into Better Results
            </h1>

            <p className="mt-6 text-lg text-blue-100 max-w-xl">
              Track performance, understand your strengths and weaknesses,
              and receive personalized recommendations to improve your
              learning journey.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/courses"
                className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Explore Courses
              </Link>

              <Link
                to="/student/dashboard"
                className="border border-white/50 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                View Dashboard
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
            <div className="bg-white rounded-xl p-6 text-gray-800 shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">
                    Academic Performance
                  </p>
                  <h2 className="text-3xl font-bold mt-1">78%</h2>
                </div>

                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Improving
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>78%</span>
                </div>

                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-[78%]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500">Attendance</p>
                  <p className="text-xl font-bold mt-1">82%</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500">Assignments</p>
                  <p className="text-xl font-bold mt-1">12/15</p>
                </div>
              </div>

              <div className="mt-5 bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-800">
                  AI Recommendation
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  Focus on Mathematics practice this week.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-blue-600 font-semibold">
            EVERYTHING IN ONE PLACE
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Smarter Academic Management
          </h2>

          <p className="text-gray-500 mt-4">
            A single platform for students, teachers and academic teams.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
            <div className="text-3xl">📊</div>
            <h3 className="text-xl font-bold mt-5">Performance Tracking</h3>
            <p className="text-gray-500 mt-3">
              Monitor grades, attendance, assignments and overall academic
              progress from one dashboard.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
            <div className="text-3xl">🤖</div>
            <h3 className="text-xl font-bold mt-5">AI Insights</h3>
            <p className="text-gray-500 mt-3">
              Identify weak areas and receive personalized recommendations
              based on academic performance.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
            <div className="text-3xl">🎯</div>
            <h3 className="text-xl font-bold mt-5">Personalized Learning</h3>
            <p className="text-gray-500 mt-3">
              Discover relevant courses and focus your effort where it can
              make the biggest difference.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gray-900 rounded-3xl p-10 md:p-14 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to improve your performance?
          </h2>

          <p className="text-gray-300 mt-4 max-w-xl mx-auto">
            Explore courses and use your academic insights to build a smarter
            learning plan.
          </p>

          <Link
            to="/courses"
            className="inline-block mt-7 bg-blue-600 px-7 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Explore Courses
          </Link>
        </div>
      </section>

      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
          © 2026 Student Performance Platform. Learn. Improve. Succeed.
        </div>
      </footer>
    </div>
  );
}

export default Home;