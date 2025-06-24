import useStore from "../../store/useStore.js";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { theme } = useStore();

  return (
    <div
      className={`min-h-screen flex flex-col font-text items-center justify-center p-6 transition-colors duration-300 relative overflow-hidden ${
        theme === "light"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <p
        className={`absolute z-9 select-none ${
          theme === "light" ? "text-gray-800" : "text-gray-200"
        }`}
        style={{
          fontSize: "35rem",
          lineHeight: 1,
          fontWeight: 900,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        404
      </p>

      <div className="max-w-md text-center relative z-10">
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>

        <p
          className={`text-lg mb-8 ${
            theme === "light" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/">
          <button
            className={`flex items-center justify-center gap-2 px-6 py-3 cursor-pointer rounded-full font-medium transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 ${
              theme === "light"
                ? "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-400 shadow-indigo-500/30"
                : "bg-indigo-500 hover:bg-indigo-600 text-white focus:ring-indigo-300 shadow-indigo-500/20"
            } shadow-md hover:-translate-y-0.5 mx-auto`}
          >
            <ArrowLeft className="w-5 h-5" />
            Return to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
}
