import React from "react";

// dashboard Imports
import Home from "pages/dashboard/home";
import Profile from "pages/dashboard/profile";

// Icon Imports
import {
  MdHome,
  MdPerson,
} from "react-icons/md";

const routes = [
  {
    name: "Dashboard",
    layout: "/dashboard",
    path: "home", // entry point
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
];

export default routes;