import Footer from "@/app/lib/Footer";
import Navbar from "@/app/lib/Navbar";
import Sidebar from "../lib/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex">
        <Sidebar />
        <div className="w-full text-xl p-4 bg-gray-100 rounded-md mx-1">
          {children}
        </div>
      </div>
      <Footer />
    </section>
  );
}
