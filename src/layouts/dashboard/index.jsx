import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar/index";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes.jsx";

export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = useState(window.innerWidth >= 1200);

  // Sync sidebar and find active route data in one pass
  useEffect(() => {
    const handleResize = () => setOpen(window.innerWidth >= 1200);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use useMemo to find the active route object once per location change
  const activeRoute = useMemo(() => {
    return routes.find(r => location.pathname.includes(r.layout + "/" + r.path)) || 
           { name: "Main Dashboard", secondary: false };
  }, [location.pathname]);

  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full">
        <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              brandText={activeRoute.name}
              secondary={activeRoute.secondary}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {routes.map((prop, key) => (
                  prop.layout === "/dashboard" && 
                  <Route path={prop.path} element={prop.component} key={key} />
                ))}
                <Route path="/" element={<Navigate to="/dashboard/home" replace />} />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
