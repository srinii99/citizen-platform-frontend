import {
  useState,
} from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import {
  useAuth
} from "../../context/AuthContext";

export default function DashboardLayout({
  children,
}) {

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const { user } = useAuth();

  const isAdmin =
    user?.role === "ADMIN";

  // -------------------------
  // MENU ITEMS
  // -------------------------

  const menuItems = isAdmin

    ? [
        {
          label: "Dashboard",
          path: "/admin/dashboard",
        },
        {
          label: "Schemes",
          path: "/admin/schemes",
        },
        {
          label: "Applications",
          path: "/admin/applications",
        },

        {
          label: "Citizens",
          path: "/admin/users",
        },

        {
          label: "Government Queue",
          path: "/admin/government-queue",
        },

        {
          label: "Agencies",
          path: "/admin/agencies",
        },
        {
          label: "Agents",
          path: "/admin/agents",
        },
        {
          label: "Scheme Sources",
          path: "/admin/scheme-sources",
        },

        
      ]

    : [
        {
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          label: "All Schemes",
          path: "/schemes",
        },
        {
          label: "My Applications",
          path: "/applications",
        },
      ];

  return (

    <div className="bg-slate-100 min-h-screen">

      {/* SIDEBAR */}

      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        menuItems={menuItems}
        isAdmin={isAdmin}
      />

      {/* MAIN AREA */}

      <div className="lg:ml-64">

        <Topbar
          setMobileOpen={setMobileOpen}
        />

        <main className="p-4 md:p-6">

          {children}

        </main>

      </div>

    </div>
  );
}