import { signOut } from "@/src/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import {
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
  IoIosHelpCircleOutline,
} from "react-icons/io";
import { IoLibraryOutline } from "react-icons/io5";
import { SlBookOpen } from "react-icons/sl";
import { SidebarProps } from "../../types/types";
import LogoutDialog from "../Dialog/LogoutDialog";

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
    <aside ref={sidebarRef} className="relative flex h-screen">
      {/* Sidebar container */}
      <div
        className={`fixed z-40 flex h-full flex-col bg-white text-black shadow-2xl transition-all duration-500 ${
          isOpen ? "w-60" : "w-12"
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
        <div className="flex items-center justify-between p-4">
          {/* Sidebar logo */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              isOpen ? "visible opacity-100 delay-200" : "invisible opacity-0"
            }`}
          >
            <Image
              src="/logos/logo.webp"
              alt="Logo"
              width={500}
              height={500}
              className="h-16 w-auto"
            />
          </div>
          {/* Sidebar toggle button */}
          <button onClick={toggleSidebar} className="focus:outline-none">
            {isOpen ? (
              <IoIosArrowRoundBack className="mr-0 text-2xl text-black transition-all duration-300 hover:text-accent" />
            ) : (
              <IoIosArrowRoundForward className="-ml-1 mr-1 text-2xl text-black transition-all duration-300 hover:text-accent" />
            )}
          </button>
        </div>

        {/* Main Menu Items */}
        <nav className="mt-10 flex-1 space-y-2">
          {menuItems.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href}
                aria-label={`Go to ${item.label}`}
                className="flex items-center px-2 py-4 transition-all duration-300 hover:text-accent"
              >
                {/* Menu icon */}
                <item.icon className="min-w-[2rem] text-2xl" />
                {/* Menu label (hidden when sidebar is closed) */}
                <span
                  className={`ml-4 text-base transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "visible opacity-100 delay-100"
                      : "invisible opacity-0"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
              {/* Tooltip when sidebar is closed */}
              {!isOpen && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 transform rounded-md bg-accent px-2 py-1 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Menu Items */}
        <div className="mb-4 mt-auto">
          {menuItemsBottom.map((item) => (
            <div key={item.label} className="group relative">
              <button
                onClick={item.onClick}
                className="flex w-full items-center px-2 py-4 text-left transition-all duration-300 hover:text-accent"
              >
                {/* Bottom menu icon */}
                <item.icon className="min-w-[2rem] text-2xl" />
                {/* Bottom menu label (hidden when sidebar is closed) */}
                <span
                  className={`ml-4 text-base transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "visible opacity-100 delay-100"
                      : "invisible opacity-0"
                  }`}
                >
                  {item.label}
                </span>
              </button>
              {/* Tooltip when sidebar is closed */}
              {!isOpen && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 transform rounded-md bg-accent px-2 py-1 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
