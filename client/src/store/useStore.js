import { create } from "zustand";

const useStore = create((set) => ({
  // Theme state
  theme: "light",
  loading: true,

  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    });
  },

  init: () => {
    // Theme initialization
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    // Auth initialization
    const token = localStorage.getItem("token");
    const fullName = localStorage.getItem("fullName");

    set({
      theme: savedTheme,
      isLoggedIn: !!token,
      fullName: fullName || "",
      loading: false,
    });
  },

  // Auth state
  isLoggedIn: false,
  fullName: "",

  login: (token, fullName) => {
    if (!token || !fullName) return;

    localStorage.setItem("token", token);
    localStorage.setItem("fullName", fullName);

    set({
      isLoggedIn: true,
      fullName,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");

    set({
      isLoggedIn: false,
      fullName: "",
    });

    // Optional: Redirect to home page after logout
    window.location.href = "/";
  },

  getFirstName: () => {
    const fullName = localStorage.getItem("fullName") || "";
    return fullName.split(" ")[0] || "";
  },
}));

export default useStore;
