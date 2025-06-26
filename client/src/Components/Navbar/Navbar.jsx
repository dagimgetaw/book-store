import { Album, Search, Sun, Moon, LogOut, X } from "lucide-react";
import useStore from "../../store/useStore.js";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { theme, toggleTheme, isLoggedIn, fullName, logout } = useStore();
  const firstName = fullName?.split(" ")[0];
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef(null);

  // Close mobile search when clicking outside
  useEffect(() => {
    if (!showMobileSearch) return;
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowMobileSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showMobileSearch]);

  return (
    <nav
      className={`w-full mx-auto fixed shadow-md z-10 font-text transition-colors duration-300 ${
        theme === "light"
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-900 shadow-sm"
      }`}
    >
      <div className="mx-auto w-full flex justify-between items-center py-4 md:py-6 px-4 md:px-12 lg:px-16">
        <Link to="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <Album
              className={`w-5 h-5 md:w-7 md:h-7 transition-transform duration-300 group-hover:rotate-12 ${
                theme === "light" ? "text-indigo-400" : "text-indigo-600"
              }`}
            />
            <p className="text-sm md:text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              BookStore
            </p>
          </div>
        </Link>

        {/* Search Bar: visible on md+ screens */}
        <form
          className={`hidden md:flex items-center rounded-full px-3 py-1 md:px-4 md:py-2 focus-within:ring-2 transition-all md:w-80 lg:w-120 shadow-sm ${
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

        {/* Search Icon: visible on sm screens */}
        <button
          className={`flex md:hidden p-2 rounded-full cursor-pointer transition-colors ${
            theme === "light"
              ? "hover:bg-gray-300 text-gray-500"
              : "hover:bg-gray-200 text-gray-700"
          }`}
          onClick={() => setShowMobileSearch(true)}
          aria-label="Open search"
        >
          <Search
            className={`w-4 h-4 md:w-5 md:h-5 ${
              theme === "light" ? "text-gray-400" : "text-gray-500"
            }`}
          />
        </button>

        {/* Right Nav */}
        <div className="flex items-center gap-2 md:gap-4">
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
              <Sun className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
            ) : (
              <Moon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
            )}
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span
                className={`text-sm font-medium ${
                  theme === "light" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Hi, {firstName}
              </span>
              <button
                onClick={logout}
                className={`p-2 rounded-full transition-all duration-300 hover:bg-opacity-20 cursor-pointer ${
                  theme === "light"
                    ? "hover:bg-rose-500 text-rose-400"
                    : "hover:bg-rose-100 text-rose-600"
                }`}
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <Link to="/sign-in">
              <button
                className={`px-3 md:px-5 py-2 rounded-full text-xs md:text-sm transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 cursor-pointer ${
                  theme === "light"
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-400 shadow-indigo-500/30"
                    : "bg-indigo-500 hover:bg-indigo-600 text-white focus:ring-indigo-300 shadow-indigo-500/20"
                } shadow-md hover:-translate-y-0.5`}
              >
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Floating Search Input for Mobile */}
      {showMobileSearch && (
        <div
          className={`fixed inset-0 z-30 flex items-start justify-center md:hidden bg-black/40 transition-all duration-300`}
        >
          <div
            ref={searchRef}
            className={`relative mt-30 w-11/12 max-w-md rounded-2xl shadow-2xl p-4 flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 animate-fade-in`}
          >
            <button
              onClick={() => setShowMobileSearch(false)}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Close search"
              tabIndex={0}
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <Search
              className={`w-4 h-4 md:w-5 md:h-5 ${
                theme === "light" ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              autoFocus
              type="text"
              placeholder="Search books..."
              className={`bg-transparent outline-none w-full text-xs md:text-sm text-gray-50 ${
                theme === "light"
                  ? "placeholder-gray-400"
                  : "placeholder-gray-500"
              }`}
            />
          </div>
        </div>
      )}
    </nav>
  );
}
