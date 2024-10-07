"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

function Is_sidebar_open() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  return (
    <div>
      {/* Sidebar component with the ability to control open/close state */}
      <Sidebar setIsSidebarOpen={setIsSidebarOpen} />

      {/* Overlay that appears when sidebar is open */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-80 transition-opacity duration-1000 z-30"></div>
      )}
    </div>
  );
}

export default Is_sidebar_open;
