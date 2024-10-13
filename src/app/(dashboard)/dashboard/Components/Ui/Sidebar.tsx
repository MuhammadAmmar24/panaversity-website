import React, { useState, useEffect, useRef } from "react";
import { GoHome } from "react-icons/go";
import {
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
  IoIosHelpCircleOutline,
} from "react-icons/io";
import { SlBookOpen } from "react-icons/sl";
import { CiLogout } from "react-icons/ci";
import { IoLibraryOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LogoutDialog from "../Dialog/LogoutDialog";
import { signOut } from "@/src/auth";
import { SidebarProps } from "../../types/types";

const Sidebar: React.FC<SidebarProps> = ({ setIsSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar visibility state
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false); // Logout dialog visibility state
  const sidebarRef = useRef<HTMLDivElement>(null); // Reference for sidebar DOM element

  const router = useRouter(); // Next.js router for navigation

  // Handle user sign-out and redirect to login page
  const handleSignOut = async () => {
    try {
      await signOut(); // Execute sign-out logic
      router.push("/login"); // Redirect to login page
      window.location.reload(); // Reload the page to ensure a clean session
    } catch (error) {
      console.error("Error during sign-out:", error); // Error handling for sign-out
    }
  };

  // Toggle sidebar open/close state
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setIsSidebarOpen(!isOpen); // Update parent component's state if necessary
  };

  // Detect clicks outside the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close the sidebar if clicked outside
        setIsSidebarOpen(false); // Inform parent component to close sidebar
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Attach event listener for outside clicks
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up listener on component unmount
    };
  }, [sidebarRef, setIsSidebarOpen]);

  // Menu items for sidebar navigation
  const menuItems = [
    { icon: GoHome, label: "Dashboard", href: "/dashboard" },
    { icon: SlBookOpen, label: "Courses", href: "/programs/flagship-program" },
    { icon: IoLibraryOutline, label: "Lessons", href: "#" },
  ];

  // Bottom menu items (Help and Logout)
  const menuItemsBottom = [
    { icon: IoIosHelpCircleOutline, label: "Help", href: "#" },
    {
      icon: CiLogout,
      label: "Logout",
      onClick: () => setIsLogoutDialogOpen(true), // Open the logout confirmation dialog
    },
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
              <button
                onClick={item.onClick}
                className="flex items-center p-4 hover:text-accent transition-all duration-300 w-full text-left"
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
                  {item.label}
                </span>
              </button>
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

      {/* Logout Confirmation Dialog */}
      <LogoutDialog
        onConfirm={handleSignOut}
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
      />
    </aside>
  );
};

export default Sidebar;
