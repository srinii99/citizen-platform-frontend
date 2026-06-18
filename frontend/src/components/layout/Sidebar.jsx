import {
  FiGrid,
  FiFileText,
  FiLayers,
  FiLogOut,
  FiUser,
  FiMenu,
  FiX,
  FiUsers,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

import { useAuth }
from "../../context/AuthContext";

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
  menuItems,
  isAdmin,
}) {

  const { logout } = useAuth();

  // -------------------------
  // ICON MAPPING
  // -------------------------

  const getIcon = (label) => {

    switch (label) {

      case "Dashboard":
        return <FiGrid />;

      case "Schemes":
      case "All Schemes":
        return <FiLayers />;

      case "Applications":
      case "My Applications":
        return <FiFileText />;

      case "Agencies":
      case "Agents":
        return <FiUsers />;

      case "Government Queue":
        return <FiFileText />;

      default:
        return <FiGrid />;
    }
  };

  // -------------------------
  // LOGOUT
  // -------------------------

  const handleLogout = () => {

    logout();

    window.location.href = "/login";
  };

  return (

    <>
      {/* MOBILE OVERLAY */}

      {
        mobileOpen && (

          <div
            className="
              fixed
              inset-0
              bg-black/40
              z-40
              lg:hidden
            "
            onClick={() =>
              setMobileOpen(false)
            }
          />
        )
      }

      {/* SIDEBAR */}

      <div
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-72
          bg-white
          border-r
          border-slate-200
          flex
          flex-col
          justify-between
          transition-transform
          duration-300

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >

        {/* TOP */}

        <div>

          {/* MOBILE CLOSE */}

          <div className="lg:hidden flex justify-end p-4">

            <button
              onClick={() =>
                setMobileOpen(false)
              }
            >

              <FiX className="text-2xl text-slate-700" />

            </button>

          </div>

          {/* LOGO */}

          <div
            className="
              px-6
              py-8
              border-b
              border-slate-200
            "
          >

            <h1 className="text-4xl font-bold text-blue-600">

              Citizen Platform

            </h1>

            <p className="text-slate-500 mt-2">

              Welfare Access System

            </p>

          </div>

          {/* USER */}

          <div className="px-6 py-6 border-b border-slate-100">

            <div className="flex items-center gap-4">

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-blue-100
                  text-blue-600
                  flex
                  items-center
                  justify-center
                  text-xl
                "
              >

                <FiUser />

              </div>

              <div>

                <h2 className="font-semibold text-slate-800">

                  {
                    isAdmin
                      ? "Admin"
                      : "Citizen"
                  }

                </h2>

                <p className="text-sm text-slate-500">

                  {
                    isAdmin
                      ? "Platform Administrator"
                      : "Welfare User"
                  }

                </p>

              </div>

            </div>

          </div>

          {/* NAVIGATION */}

          <div className="p-4 space-y-2">

            {menuItems.map((item) => (

              <NavLink
                key={item.path}
                to={item.path}
                onClick={() =>
                  setMobileOpen(false)
                }
                className={({ isActive }) =>
                  `
                    flex
                    items-center
                    gap-4
                    px-4
                    py-4
                    rounded-2xl
                    transition-all
                    duration-200
                    font-medium

                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-slate-700 hover:bg-slate-100"
                    }
                  `
                }
              >

                <span className="text-xl">

                  {getIcon(item.label)}

                </span>

                {item.label}

              </NavLink>

            ))}

          </div>

        </div>

        {/* BOTTOM */}

        <div className="p-4">

          <button
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3
              px-4
              py-4
              rounded-2xl
              bg-red-500
              hover:bg-red-600
              text-white
              font-medium
              transition-all
            "
          >

            <FiLogOut />

            Logout

          </button>

        </div>

      </div>
    </>
  );
}