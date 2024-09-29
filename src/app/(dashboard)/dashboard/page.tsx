"use client";
import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import TopBar from "./Components/TopBar";
import Dashboard from "./Components/Dashboard";
import Welcome from "./Components/Welcome";


export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar open state


  return (
    <div className="relative flex">
      <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-80 transition-opacity duration-1000 z-30"></div>
      )}

      {/* Main content */}
      <div className="flex-1 mx-6 sm:mx-20 overflow-hidden transition-all duration-300">
        <TopBar />
        <Welcome />
        <Dashboard />
      </div>
    </div>
  );
}