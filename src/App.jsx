import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/footer";
import LenisScroll from "./components/lenis-scroll";
import Navbar from "./components/navbar";
import HeroSection from "./pages/landing/hero-section";

import DashboardLayout from "./layouts/dashboard/index.jsx";
import Home from "./pages/dashboard/home/index.jsx"; 
import Profile from "./pages/dashboard/profile/index.jsx";

export default function App() {
  return (
    <>
      <LenisScroll />
      <Routes>
        {/* --- LANDING PAGE ROUTE --- */}
        <Route 
          path="/" 
          element={
            <>
              <Navbar />
              <main className="px-6 md:px-16 lg:px-24 xl:px-32">
                <HeroSection />
              </main>
              <Footer />
            </>
          } 
        />

        {/* --- DASHBOARD ROUTES --- */}
        {/* This uses the Layout as a wrapper */}
        <Route path="dashboard/*" element={<DashboardLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          
          {/* If someone just types /dashboard, send them to /dashboard/home */}
          <Route index element={<Navigate to="/dashboard/home" replace />} />
        </Route>

        {/* Catch-all: send any broken links back to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}