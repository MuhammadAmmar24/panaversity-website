"use client"
import { useState } from "react";
import AccountSettings from "../Components/AccountSettings";
import Sidebar from "../Components/Sidebar";
import TopBar from "../Components/TopBar";


export default function AccSettings() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar open state

  return (
    <div className="relative flex">
      <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-80 transition-opacity duration-1000 z-30"></div>
      )}

      {/* Main content */}
      <div className="flex-1 mr-2 ml-3 md:mr-20 md:ml-20">
        <TopBar />
        <AccountSettings />
      </div>
    </div>
  );
}