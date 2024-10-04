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
import { signOut } from "@/src/auth";

interface SidebarProps {
  setIsSidebarOpen: (open: boolean) => void;
}

// Sign out function
const handleSignOut = async () => {
  await signOut();
  console.log("Signing out...");
};

const Sidebar: React.FC<SidebarProps> = ({ setIsSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state
  const sidebarRef = useRef<HTMLDivElement>(null); // Sidebar ref to detect outside clicks

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setIsSidebarOpen(!isOpen); // Update the sidebar state in the parent component
  };

  // Detect clicks outside the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsSidebarOpen(false); // Close the sidebar when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  // Menu items
  const menuItems = [
    { icon: GoHome, label: "Dashboard", href: "/dashboard" },
    { icon: SlBookOpen, label: "Courses", href: "/programs/flagship-program" },
    { icon: IoLibraryOutline, label: "Lessons", href: "#" },
  ];

  // Bottom menu items (Help and Logout)
  const menuItemsBottom = [
    { icon: IoIosHelpCircleOutline, label: "Help", href: "#" },
    { icon: CiLogout, label: "Logout", href: "#" },
  ];

  return (
    <aside ref={sidebarRef} className="relative h-screen flex">
      {/* Sidebar container */}
      <div
        className={`bg-white shadow-2xl text-black fixed h-full transition-all duration-500 z-40 flex flex-col ${
          isOpen ? "w-60" : "w-16"
        }`}
        onClick={(e) => {
          const target = e.target as Element;
          // Open the sidebar if clicked outside the icons
          if (!target.closest("svg")) {
            toggleSidebar();
          }
        }}
      >
        {/* Logo and toggle button */}
        <div className="p-4 flex justify-between items-center">
          {/* Sidebar logo */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-100 visible delay-200" : "opacity-0 invisible"
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
          {/* Sidebar toggle button */}
          <button onClick={toggleSidebar} className="focus:outline-none">
            {isOpen ? (
              <IoIosArrowRoundBack className="text-black text-2xl hover:text-accent transition-all duration-300 mr-0" />
            ) : (
              <IoIosArrowRoundForward className="text-black text-2xl hover:text-accent transition-all duration-300 mr-1" />
            )}
          </button>
        </div>

        {/* Main Menu Items */}
        <nav className="mt-10 space-y-2 flex-1">
          {menuItems.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                href={item.href}
                className="flex items-center p-4 hover:text-accent transition-all duration-300"
              >
                {/* Menu icon */}
                <item.icon className="text-2xl min-w-[2rem]" />
                {/* Menu label (hidden when sidebar is closed) */}
                <span
                  className={`ml-4 text-base transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "opacity-100 visible delay-100"
                      : "opacity-0 invisible"
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

        {/* Bottom Menu Items */}
        <div className="mt-auto mb-4">
          {menuItemsBottom.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                href={item.href}
                className="flex items-center p-4 hover:text-accent transition-all duration-300"
              >
                {/* Bottom menu icon */}
                <item.icon className="text-2xl min-w-[2rem]" />
                {/* Bottom menu label (hidden when sidebar is closed) */}
                <span
                  className={`ml-4 text-base transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "opacity-100 visible delay-100"
                      : "opacity-0 invisible"
                  }`}
                >
                  {item.label === "Logout" ? (
                    <button onClick={handleSignOut}>{item.label}</button>
                  ) : (
                    item.label
                  )}
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

      {/* Content area (clicking outside sidebar will close it) */}
      <main className="flex-1 p-6 transition-all duration-300">
        {/* Placeholder for main content */}
      </main>
    </aside>
  );
};

export default Sidebar;
