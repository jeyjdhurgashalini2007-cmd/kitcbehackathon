import PublicNavbar from "../components/PublicNavbar";

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />

      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <p className="text-blue-600 font-semibold">
            GET IN TOUCH
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mt-2">
            Contact Us
          </h1>

          <p className="text-gray-500 mt-4 max-w-2xl">
            Have a question about the platform? We'd love to hear from you.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-10">
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Let's connect
          </h2>

          <p className="text-gray-500 mt-4 leading-7">
            Whether you need help with your account, courses or academic
            dashboard, our support team is here to help.
          </p>

          <div className="mt-8 space-y-5">
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <p className="font-semibold text-gray-800">📧 Email</p>
              <p className="text-gray-500 mt-1">
                support@studentperformance.com
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <p className="font-semibold text-gray-800">💬 Support</p>
              <p className="text-gray-500 mt-1">
                Get assistance with your learning journey.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <p className="font-semibold text-gray-800">🎓 Academic Help</p>
              <p className="text-gray-500 mt-1">
                Questions about courses and academic performance?
              </p>
            </div>
          </div>
        </div>

        <form
          className="bg-white rounded-2xl p-8 border border-gray-100"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="text-2xl font-bold text-gray-900">
            Send a message
          </h2>

          <div className="mt-6">
            <label className="text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              placeholder="Your name"
              className="w-full mt-2 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-5">
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-2 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-5">
            <label className="text-sm font-medium text-gray-700">
              Message
            </label>

            <textarea
              rows="5"
              placeholder="How can we help?"
              className="w-full mt-2 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </main>
    </div>
  );
}

export default Contact;