"use client";
import React, { useState, useEffect } from "react";
import AccountSettings from "../Components/Ui/AccountSettings";
import Sidebar from "../Components/Ui/Sidebar";
import TopBar from "../Components/Ui/TopBar";
import LoadingProfile from "../Components/Loading/LoadingProfile";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (isLoading) {
    return (
      <div>
        <LoadingProfile />
      </div>
    ); // You can replace this with a loading spinner or any other loading indicator
  }

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
        <AccountSettings />
      </main>
    </div>
  );
}
