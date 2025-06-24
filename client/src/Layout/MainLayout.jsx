import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="hide-scrollbar min-h-screen w-full">
      <Navbar />
      <main className="hide-scrollbar">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
