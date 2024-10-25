"use client";
import { signOut } from "@/src/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { HiChevronDown } from "react-icons/hi";
import { TfiHelp } from "react-icons/tfi";
import { DropdownProps } from "../../types/types";
import LogoutDialog from "../Dialog/LogoutDialog";
import Error from "../Error/error_message";

const Dropdown: React.FC<DropdownProps> = ({
  userName,
  userEmail,
  userImage,
}) => {
  const [isOpen, setIsOpen] = useState(false); // State to track dropdown visibility
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false); // State to track logout dialog visibility
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown element

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sign out function
  const handleSignOut = async () => {
    await signOut();
    window.location.reload();
  };

  // Error handling: If user information is missing, display a fallback
  if (!userName || !userEmail || !userImage) {
    return <Error message="Error" />;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button to toggle dropdown */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* User profile image */}
        <Image
          width={100}
          height={100}
          src={userImage}
          alt={`${userName} profile`}
          className="w-8 h-8 mobileM:w-10 mobileM:h-10 md:w-12 md:h-12 rounded-full object-cover"
        />
        {/* Dropdown arrow icon */}

        <HiChevronDown
          className={`h-4 w-4 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown content */}
      <div
        className={`absolute right-2 mt-2 w-48 sm:w-64 bg-white rounded-lg shadow-lg border border-gray-200 font-poppins transform transition-all duration-300 ease-in-out origin-top-right ${
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
        role="menu"
        aria-hidden={!isOpen}
      >
        {/* User info */}
        <div className="p-4">
          <div className="flex items-center space-x-3 w-full">
            {/* User profile image */}
            <Image
              width={100}
              height={100}
              src={userImage}
              alt={`${userName} profile`}
              className="w-8 h-8 rounded-full object-cover mobileM:w-10 mobileM:h-10"
            />
            {/* Display username and email */}
            <div>
              <h2 className="text-gray-900 font-semibold text-sm sm:text-base w-24 md:w-44 truncate">
                {userName}
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm w-24 md:w-44 truncate">
                {userEmail}
              </p>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Links to different sections */}
        <ul className="p-2" role="menu">
          {/* Profile settings */}
          <Link href="/dashboard/profile">
            <li
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 hover:text-accent rounded-lg cursor-pointer"
              role="menuitem"
            >
              <CgProfile className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700 text-xs sm:text-sm">Profile</span>
            </li>
          </Link>

          {/* Help center */}
          <li
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
            role="menuitem"
          >
            <TfiHelp className="w-5 h-5 text-gray-700" />
            <span className="text-gray-700 text-xs sm:text-sm">
              Help Center
            </span>
          </li>

          <hr className="border-gray-200" />

          {/* Sign out */}
          <li
            onClick={() => setIsLogoutDialogOpen(true)}
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
            role="menuitem"
          >
            <CiLogout className="w-5 h-5 text-gray-700" />
            <span className="text-gray-700 text-xs sm:text-sm">Sign Out</span>
          </li>
        </ul>
      </div>

      {/* Logout confirmation dialog */}
      <LogoutDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
        onConfirm={handleSignOut}
      />
    </div>
  );
};

export default Dropdown;
