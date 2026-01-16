import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import ScrollTopButton from "./components/ScrollTopButton";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

// Component untuk redirect ke admin
function AdminRedirect() {
  useEffect(() => {
    const adminUrl =
      import.meta.env.VITE_ADMIN_URL ||
      "https://portfolio-tegar-admin.vercel.app";
    // Gunakan replace agar tidak bisa back
    window.location.replace(adminUrl);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-semibold">
          Redirecting to Admin Dashboard...
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen visible={loading} />
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <div className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />

                {/* Admin Redirect Routes */}
                <Route path="/admin" element={<AdminRedirect />} />
                <Route path="/admin/*" element={<AdminRedirect />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
        <ScrollTopButton />
      </Router>
    </>
  );
}
