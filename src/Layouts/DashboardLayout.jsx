import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { LuLayoutDashboard, LuTruck } from "react-icons/lu";
import logo from "../assets/logo.png";
const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open bg-base-200">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-100">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">Zapshift Dashboard</div>
        </nav>
        {/* Page content here */}
        <Outlet />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-100 is-drawer-close:w-20 is-drawer-open:w-64">
          {/* Logo */}
          <Link to={"/"} className="p-6 w-full flex items-end relative">
            <img src={logo} alt="ZapShift" />
            <h3 className="absolute left-12 text-3xl font-extrabold text-secondary  is-drawer-close:hidden">
              ZapShift
            </h3>
          </Link>
          {/* Sidebar content here */}
          <div className="flex flex-col w-full grow gap-6 px-4">
            {/* menu section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3 px-3 is-drawer-close:hidden">
                Menu
              </h3>
              {/* dashboard links */}
              <ul className="menu w-full p-0 gap-1">
                {/* dashboard home */}
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#C4E538] text-gray-900 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                  }
                  data-tip="Dashboard"
                >
                  <LuLayoutDashboard className="text-xl" />
                  <span className="is-drawer-close:hidden">Dashboard</span>
                </NavLink>

                {/* my parcels */}

                <NavLink
                  to="/dashboard/my-parcels"
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#C4E538] text-gray-900 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                  }
                  data-tip="My Parcels"
                >
                  <LuTruck className="text-xl" />
                  <span className="is-drawer-close:hidden">My Parcels</span>
                </NavLink>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
