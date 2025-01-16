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
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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

  const handleSignOut = async () => {
    await signOut();
    window.location.reload();
  };

  if (!userName || !userEmail || !userImage) {
    return <Error message="Error" />;
  }

  return (
    <div className="relative z-10" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Image
          width={100}
          height={100}
          src={userImage}
          alt={`${userName} profile`}
          className="h-8 w-8 rounded-full object-cover mobileM:h-10 mobileM:w-10 md:h-12 md:w-12"
        />

        <HiChevronDown
          className={`h-4 w-4 transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
            }`}
        />
      </button>

      <div
        className={`font-poppins absolute right-2 mt-2 w-48 origin-top-right transform rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out sm:w-64 ${isOpen
          ? "visible scale-100 opacity-100"
          : "invisible scale-95 opacity-0"
          }`}
        role="menu"
        aria-hidden={!isOpen}
      >
        <div className="p-4">
          <div className="flex w-full items-center space-x-3">
            <Image
              width={100}
              height={100}
              src={userImage}
              alt={`${userName} profile`}
              className="h-8 w-8 rounded-full object-cover mobileM:h-10 mobileM:w-10"
            />
            <div>
              <h2 className="w-24 truncate text-sm font-semibold text-gray-900 sm:text-base md:w-44">
                {userName}
              </h2>
              <p className="w-24 truncate text-xs text-gray-500 sm:text-sm md:w-44">
                {userEmail}
              </p>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        <ul className="p-2" role="menu">
          <Link href="/dashboard/profile" aria-label="Go to Profile">
            <li
              className="flex cursor-pointer items-center space-x-2 rounded-lg p-2 hover:bg-gray-100 hover:text-accent"
              role="menuitem"
            >
              <CgProfile className="h-5 w-5 text-gray-700" />
              <span className="text-xs text-gray-700 sm:text-sm">Profile</span>
            </li>
          </Link>

          <Link href="/contact" aria-label="Contact Support">
          <li
            className="flex cursor-pointer items-center space-x-2 rounded-lg p-2 hover:bg-gray-100"
            role="menuitem"
          >
            <TfiHelp className="h-5 w-5 text-gray-700" />
            <span className="text-xs text-gray-700 sm:text-sm">
              Help
            </span>
          </li>
          </Link>

          <hr className="border-gray-200" />

          <li
            onClick={() => setIsLogoutDialogOpen(true)}
            className="flex cursor-pointer items-center space-x-2 rounded-lg p-2 hover:bg-gray-100"
            role="menuitem"
          >
            <CiLogout className="h-5 w-5 text-gray-700" />
            <span className="text-xs text-gray-700 sm:text-sm">Logout</span>
          </li>
        </ul>
      </div>

      <LogoutDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
        onConfirm={handleSignOut}
      />
    </div>
  );
};

export default Dropdown;