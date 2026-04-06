import React from "react";
import Home from "pages/dashboard/home";
import Profile from "pages/dashboard/profile";

// 1. Import your tool
import PasswordAnalyzer from "tools/paswd/passwordTool"; 

// Icon Imports
import { MdHome, MdPerson, MdSecurity } from "react-icons/md";

const routes = [
  {
    name: "Dashboard",
    layout: "/dashboard",
    path: "home",
    icon: <MdHome className="h-6 w-6" />,
    component: <Home />,
  },
  {
    name: "Profile",
    layout: "/dashboard",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  // 2. Add the tool route here
  {
    name: "Password Analyzer",
    layout: "/dashboard",
    path: "password-analyzer",
    icon: <MdSecurity className="h-6 w-6" />,
    component: <PasswordAnalyzer />,
    hidden: true,
  },
];

export default routes;