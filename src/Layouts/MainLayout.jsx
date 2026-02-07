import React from "react";
import { Outlet } from "react-router";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* main content */}
      <main>
        {" "}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
