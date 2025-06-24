import { Album, Search, Sun, Moon } from "lucide-react";
import useStore from "../../store/useStore.js";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { theme, toggleTheme } = useStore();

  return (
    <nav
      className={`w-full mx-auto fixed shadow-md z-10 font-text transition-colors duration-300 ${
        theme === "light"
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-900 shadow-sm"
      }`}
    >
      <div className="mx-auto w-full flex justify-between items-center py-3 md:py-6 px-6 md:px-12 lg:px-16">
        <Link to="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <Album
              className={`w-7 h-7 transition-transform duration-300 group-hover:rotate-12 ${
                theme === "light" ? "text-indigo-400" : "text-indigo-600"
              }`}
            />
            <p className="text-lg md:text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              BookStore
            </p>
          </div>
        </Link>

        <form
          className={`flex items-center rounded-full px-3 py-1 md:px-4 md:py-2 focus-within:ring-2 transition-all w-32 md:w-64 lg:w-80 shadow-sm ${
            theme === "light"
              ? "bg-gray-800 focus-within:ring-indigo-500"
              : "bg-gray-100 focus-within:ring-indigo-300"
          }`}
        >
          <Search
            className={`w-4 h-4 mr-2 ${
              theme === "light" ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <input
            type="text"
            placeholder="Search books..."
            className={`bg-transparent outline-none w-full text-sm md:text-base font-normal ${
              theme === "light"
                ? "placeholder-gray-400"
                : "placeholder-gray-500"
            }`}
          />
        </form>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 hover:bg-opacity-20 cursor-pointer ${
              theme === "light"
                ? "hover:bg-indigo-500 text-gray-50"
                : "hover:bg-gray-200 text-gray-700"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Sun className="w-6 h-6" strokeWidth={1.5} />
            ) : (
              <Moon className="w-6 h-6" strokeWidth={1.5} />
            )}
          </button>
          <Link to="/login">
            <button
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 cursor-pointer ${
                theme === "light"
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-400 shadow-indigo-500/30"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white focus:ring-indigo-300 shadow-indigo-500/20"
              } shadow-md hover:-translate-y-0.5`}
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
