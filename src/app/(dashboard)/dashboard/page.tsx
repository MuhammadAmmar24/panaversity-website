import React, { useState, useEffect } from "react";
import TopBar from "./Components/Ui/TopBar";
import Dashboard from "./Components/Ui/Dashboard";
import Welcome from "./Components/Ui/Welcome";
import Is_sidebar_open from "./Components/Ui/Sidebar_open";
// import Loading from "./Components/Loading/LoadingDashboard";

export default function Home() {
  return (
    <div className="relative flex">
      <Is_sidebar_open />
      {/* Main content area */}
      <main className="flex-1 mr-6 ml-10 sm:mr-20 sm:ml-20 overflow-hidden transition-all duration-300">
        <TopBar />
        <Welcome />
        <Dashboard />
      </main>
    </div>
  );
}
