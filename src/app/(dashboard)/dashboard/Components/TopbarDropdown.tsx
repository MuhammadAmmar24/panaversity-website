// components/Dropdown.tsx
import { useState } from "react";
import {
  FiSettings,
  FiCreditCard,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

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

  return (
    <div className="relative">
      {/* Button to trigger dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img
          src={userImage}
          alt="User profile"
          className="w-10 h-10 md:w-auto md:h-14 rounded-full object-cover"
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
      {isOpen && (
        <div className="absolute right-2 md:right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 font-poppins">
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <img
                src={userImage}
                alt="User profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="text-gray-900 font-semibold">{userName}</h2>
                <p className="text-gray-500 text-sm">{userEmail}</p>
              </div>
            </div>
          </div>
          <hr className="border-gray-200" />
          <ul className="p-2">
            <Link href="/dashboard/account-settings">
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 hover:text-accent rounded-lg cursor-pointer">
                <LuSettings2 className="w-5 h-5 text-gray-700" />
                <span className="text-gray-700">Profile Settings</span>
              </li>
            </Link>
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <TfiWallet className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700">Payments</span>
            </li>
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <TfiHelp className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700">Help Center</span>
            </li>
            <hr className="border-gray-200" />
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <CiLogout className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700">Sign Out</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
