"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

const IsSidebarOpen: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarState = (state: boolean) => {
    if (typeof state === "boolean") {
      setIsSidebarOpen(state);
    } else {
      console.error("Invalid sidebar state, expected a boolean value");
    }
  };

  return (
    <div>
      <Sidebar setIsSidebarOpen={handleSidebarState} />
      {isSidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black opacity-80 transition-opacity duration-1000"></div>
      )}
    </div>
  );
};

export default IsSidebarOpen;