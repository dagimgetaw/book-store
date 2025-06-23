import useStore from "../../store/useStore.js";

export default function Footer() {
  const { theme } = useStore();

  return (
    <footer
      className={`w-full py-8 transition-colors font-text duration-300 ${
        theme === "light"
          ? "bg-gray-900 text-gray-300"
          : "bg-gray-50 text-gray-700"
      }`}
    >
      {/* Top divider line */}
      <div
        className={`mx-auto max-w-7xl border-t ${
          theme === "light" ? "border-gray-700" : "border-gray-200"
        }`}
      ></div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="flex flex-col items-center justify-between md:flex-row gap-4 py-8">
          {/* Copyright */}
          <div className="text-sm md:text-base">
            © {new Date().getFullYear()} BookStore. All rights reserved.
          </div>

          {/* Simple navigation links */}
          <div className="flex gap-6">
            <a
              href="#"
              className={`text-sm md:text-base transition-colors hover:${
                theme === "light" ? "text-white" : "text-gray-900"
              }`}
            >
              About
            </a>
            <a
              href="#"
              className={`text-sm md:text-base transition-colors hover:${
                theme === "light" ? "text-white" : "text-gray-900"
              }`}
            >
              Contact
            </a>
            <a
              href="#"
              className={`text-sm md:text-base transition-colors hover:${
                theme === "light" ? "text-white" : "text-gray-900"
              }`}
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
