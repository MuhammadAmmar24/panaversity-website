"use client";
import { useState, useEffect, useRef } from "react";
import { TfiWallet, TfiHelp } from "react-icons/tfi";
import { LuSettings2 } from "react-icons/lu";
import Link from "next/link";
import LogoutDialog from "../Dialog/LogoutDialog";
import { CiLogout } from "react-icons/ci";
import { ClientDropdownProps } from "../../types/types";

const ClientDropdown: React.FC<ClientDropdownProps> = ({
  userName,
  userEmail,
  userImage,
  onSignOut,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img
          src={userImage}
          alt={`${userName} profile`}
          className="w-8 h-8 mobileM:w-10 mobileM:h-10 md:w-12 md:h-12 rounded-full object-cover"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
      
        className={`absolute right-2 mt-2 w-48 sm:w-64 bg-white rounded-lg shadow-lg border border-gray-200 font-poppins transform transition-all duration-300 ease-in-out origin-top-right ${
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
        role="menu"
        aria-hidden={!isOpen}
      >
        <div className="p-4">
          <div className="flex items-center space-x-3 w-full">
            <img
              src={userImage}
              alt={`${userName} profile`}
              className="w-8 h-8 rounded-full object-cover mobileM:w-10 mobileM:h-10"
            />
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

        <ul className="p-2" role="menu">
          <Link href="/dashboard/account-settings">
            <li
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 hover:text-accent rounded-lg cursor-pointer"
              role="menuitem"
            >
              <LuSettings2 className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700 text-xs sm:text-sm">
                Profile Settings
              </span>
            </li>
          </Link>

          <li
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
            role="menuitem"
          >
            <TfiWallet className="w-5 h-5 text-gray-700" />
            <span className="text-gray-700 text-xs sm:text-sm">Payments</span>
          </li>

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

      <LogoutDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
        onConfirm={onSignOut}
      />
    </div>
  );
};

export default ClientDropdown;
