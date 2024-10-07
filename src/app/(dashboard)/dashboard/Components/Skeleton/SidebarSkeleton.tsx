import React from "react";
import { GoHome } from "react-icons/go";
import { IoIosArrowRoundForward, IoIosHelpCircleOutline } from "react-icons/io";
import { SlBookOpen } from "react-icons/sl";
import { CiLogout } from "react-icons/ci";
import { IoLibraryOutline } from "react-icons/io5";

const Sidebar = () => {
  const menuItems = [
    { icon: GoHome, href: "/dashboard" },
    { icon: SlBookOpen, href: "#" },
    { icon: IoLibraryOutline, href: "#" },
  ];

  const menuItemsBottom = [
    { icon: IoIosHelpCircleOutline, href: "#" },
    { icon: CiLogout, href: "#" },
  ];

  return (
    <aside className="relative h-screen flex animate-pulse">
      <div className="bg-gray-200 shadow-2xl text-gray-700 fixed h-full z-40 flex flex-col w-16">
        <div className="p-4 mt-5">
          <IoIosArrowRoundForward className="text-gray-700 text-2xl ml-1" />
        </div>
        <nav className="mt-14 flex-1 px-5">
          {menuItems.map(({ icon: Icon, href }) => (
            <div key={href} className="block py-5">
              <Icon className="text-2xl" />
            </div>
          ))}
        </nav>
        <div className="mb-4 px-5">
          {menuItemsBottom.map(({ icon: Icon, href }) => (
            <div key={href} className="block py-4">
              <Icon className="text-2xl" />
            </div>
          ))}
        </div>
      </div>
      <main className="flex-1 p-6">{/* Placeholder for main content */}</main>
    </aside>
  );
};

export default Sidebar;
