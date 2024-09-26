"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import TopBar from "./Components/TopBar";
import Dashboard from "./Components/Dashboard";
import Welcome from "./Components/Welcome";
import Image from "next/image"; // Import Next.js Image component


export default function Home() {
  const [loading, setLoading] = useState(true);

  // Simulate a loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1 second delay
    return () => clearTimeout(timer); // Clean up the timer when the component unmounts
  }, []);

  if (loading) {
    return (
      <div className="relative h-screen bg-gray-100 flex justify-center items-center">
        {/* Logo at the top */}
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2">
          <Image
            src="/logos/logo.png" // Replace with the correct path to your logo
            alt="Logo"
            width={500} // Adjust the size of the logo
            height={500}
          />
        </div>
        {/* Spinner in the center */}
        <div className="relative flex justify-center items-center">
          <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-400"></div>
          <div className="absolute animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-green-500"></div>
          <div className="absolute animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
          <div className="h-10 w-10 bg-gradient-to-r from-accent to-green-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-4 mr-4 md:mr-20 md:ml-20 overflow-hidden">
        <TopBar />
        <Welcome />
        <Dashboard />
      </div>
    </div>
  );
}
