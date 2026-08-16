function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Student Performance
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-800">
          🔔
        </button>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
            S
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-800">
              Student
            </p>
            <p className="text-xs text-gray-500">
              student@example.com
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;