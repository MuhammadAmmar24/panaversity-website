"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

const IsSidebarOpen: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility state

  // Error handling: Ensure setIsSidebarOpen is properly passed to Sidebar
  const handleSidebarState = (state: boolean) => {
    if (typeof state === "boolean") {
      setIsSidebarOpen(state);
    } else {
      console.error("Invalid sidebar state, expected a boolean value");
    }
  };

  return (
    <div>
      {/* Sidebar component with the ability to control open/close state */}
      <Sidebar setIsSidebarOpen={handleSidebarState} />

      {/* Overlay that appears when sidebar is open */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-80 transition-opacity duration-1000 z-30"></div>
      )}
    </div>
  );
};

export default IsSidebarOpen;
