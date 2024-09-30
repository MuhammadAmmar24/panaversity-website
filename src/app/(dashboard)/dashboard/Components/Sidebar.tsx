"use client";

import React, { useState, useEffect, useRef } from "react";
import { GoHome } from "react-icons/go";
import {
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
  IoIosHelpCircleOutline,
} from "react-icons/io";
import { SlBookOpen } from "react-icons/sl";
import { MdOutlineAnnouncement } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { IoLibraryOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
  setIsSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setIsSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setIsSidebarOpen(!isOpen); // Update the sidebar open state in Home
  };

  // Detect clicks outside the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsSidebarOpen(false); // Ensure blur is removed when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  const menuItems = [
    { icon: GoHome, label: "Dashboard", href: "/dashboard" },
    { icon: SlBookOpen, label: "Courses", href: "#" },
    { icon: IoLibraryOutline, label: "Lessons", href: "#" },
  ];

  const menuItemsBottom = [
    { icon: IoIosHelpCircleOutline, label: "Help", href: "#" },
    { icon: CiLogout, label: "Logout", href: "#" },
  ];



  return (
    <div ref={sidebarRef} className="relative h-screen flex">
      {/* Sidebar container */}
      <div
        className={`bg-white shadow-2xl text-black fixed h-full transition-all duration-500 z-40 flex flex-col ${
          isOpen ? "w-60" : "w-16"
        }`}
        onClick={(e) => {
          const target = e.target as Element;
          // Open the sidebar if clicked anywhere except on the icons (SVGs)
          if (!target.closest("svg")) {
            toggleSidebar();
          }
        }}
      >
        {/* Logo and button container with smooth transition for the logo */}
        <div className="p-4 flex justify-between items-center">
          {/* Display the logo with smooth transition */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              isOpen
                ? "opacity-100 visible delay-200 transition-all duration-300 ease-in-out"
                : "opacity-0 invisible delay-0"
            }`}
          >
            <Image
              src="/logos/logo.png"
              alt="Logo"
              width={500}
              height={500}
              className="h-16 w-auto"
            />
          </div>
          <button onClick={toggleSidebar} className="focus:outline-none">
            {isOpen ? (
              <IoIosArrowRoundBack className="text-black text-2xl hover:text-accent transition-all duration-300 mr-0" />
            ) : (
              <IoIosArrowRoundForward className="text-black text-2xl hover:text-accent transition-all duration-300 mr-1" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-10 space-y-2 flex-1">
          {menuItems.map((item) => (
            <div key={item.label} className="relative">
              <Link
                href={item.href}
                className="flex items-center p-4 hover:text-accent transition-all duration-300"
              >
                {/* Ensure icons are always visible */}
                <item.icon className="text-2xl min-w-[2rem]" />
                {/* Only hide text labels */}
                <span
                  className={`ml-4 text-base transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "opacity-100 visible delay-100"
                      : "opacity-0 invisible delay-0"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
              {/* Tooltip when sidebar is closed */}
              {!isOpen && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 bg-accent text-white text-sm py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom menu items (Help and Logout) */}
        <div className="mt-auto mb-4">
          {menuItemsBottom.map((item) => (
            <div key={item.label} className="relative">
              <Link
                href={item.href}
                className="flex items-center p-4 hover:text-accent transition-all duration-300"
              >
                {/* Ensure icons are always visible */}
                <item.icon className="text-2xl min-w-[2rem]" />
                {/* Only hide text labels */}
                <span
                  className={`ml-4 text-base transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "opacity-100 visible delay-100"
                      : "opacity-0 invisible delay-0"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
              {/* Tooltip when sidebar is closed */}
              {!isOpen && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 bg-accent text-white text-sm py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content area to trigger close on clicking outside */}
      <div className="flex-1 p-6 transition-all duration-300">
        {/* Any content inside the main container */}
      </div>
    </div>
  );
};

export default Sidebar;