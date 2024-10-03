"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Components/Ui/Sidebar";
import TopBar from "./Components/Ui/TopBar";
import Dashboard from "./Components/Ui/Dashboard";
import Welcome from "./Components/Ui/Welcome";
// import Loading from "./Components/Loading/LoadingDashboard";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  return (
    <div className="relative flex">
      {/* Sidebar component with the ability to control open/close state */}
      <Sidebar setIsSidebarOpen={setIsSidebarOpen} />

      {/* Overlay that appears when sidebar is open */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-80 transition-opacity duration-1000 z-30"></div>
      )}

      {/* Main content area */}
      <main className="flex-1 mr-6 ml-10 sm:mr-20 sm:ml-20 overflow-hidden transition-all duration-300">
        <TopBar />
        <Welcome />
        <Dashboard />
      </main>
    </div>
  );
}
