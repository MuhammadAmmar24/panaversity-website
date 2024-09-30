import { useState, useEffect, useRef } from "react";
import { TfiWallet, TfiHelp } from "react-icons/tfi";
import { CiLogout } from "react-icons/ci";
import { LuSettings2 } from "react-icons/lu";
import Link from "next/link";

interface DropdownProps {
  userName: string;
  userEmail: string;
  userImage: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  userName,
  userEmail,
  userImage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button to trigger dropdown */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img
          src={userImage}
          alt="User profile"
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

      {/* Dropdown Menu */}
      <div
        className={`absolute right-2 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-lg border border-gray-200 font-poppins transform transition-all duration-300 ease-in-out origin-top-right ${
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        <div className="p-4">
          <div className="flex items-center space-x-3 w-full">
            <img
              src={userImage}
              alt="User profile"
              className="w-8 h-8 rounded-full object-cover mobileM:w-10 mobileM:h-10"
            />
            <div>
              <h2 className="text-gray-900 font-semibold text-sm sm:text-base">
                {userName}
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm w-24 md:w-32 truncate">ammaraamir609@gmail.com</p>
            </div>
          </div>
        </div>
        <hr className="border-gray-200" />
        <ul className="p-2">
          <Link href="/dashboard/account-settings">
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 hover:text-accent rounded-lg cursor-pointer">
              <LuSettings2 className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700 text-xs sm:text-sm">
                Profile Settings
              </span>
            </li>
          </Link>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <TfiWallet className="w-5 h-5 text-gray-700" />
            <span className="text-gray-700 text-xs sm:text-sm">Payments</span>
          </li>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <TfiHelp className="w-5 h-5 text-gray-700" />
            <span className="text-gray-700 text-xs sm:text-sm">
              Help Center
            </span>
          </li>
          <hr className="border-gray-200" />
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <CiLogout className="w-5 h-5 text-gray-700" />
            <span className="text-gray-700 text-xs sm:text-sm">Sign Out</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
