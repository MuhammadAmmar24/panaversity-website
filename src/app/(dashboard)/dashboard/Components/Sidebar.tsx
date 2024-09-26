"use client";

import React, { useState } from "react";
import { GoHome } from "react-icons/go";
import {
  IoIosArrowRoundBack,
  IoIosHelpCircleOutline,
  IoIosArrowRoundForward,
} from "react-icons/io";
import { ImBooks } from "react-icons/im";
import { SlBookOpen } from "react-icons/sl";
import { MdOutlineAnnouncement } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { IoLibraryOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: GoHome, label: "Dashboard", href: "/dashboard" },
    { icon: SlBookOpen, label: "Courses", href: "#" },
    { icon: IoLibraryOutline, label: "Lessons", href: "#" },
    { icon: IoIosHelpCircleOutline, label: "Help", href: "#" },
    { icon: CiLogout, label: "Logout", href: "#" },
    { icon: MdOutlineAnnouncement, label: "Announcements", href: "#" },
  ];

  return (
    <div className="relative h-screen flex ">
      <div
        className={`bg-white shadow-2xl text-black fixed h-full transition-all duration-500 z-40 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4 mt-10 flex justify-between items-center">
          {isOpen && (
            <Image
              src="/logos/logo.png"
              alt="Logo"
              width={500}
              height={500}
              className="h-24 w-auto"
            />
          )}
          <button onClick={toggleSidebar} className="focus:outline-none">
            {isOpen ? (
              <IoIosArrowRoundBack className="text-black text-3xl mb-20 mr-2" />
            ) : (
              <IoIosArrowRoundForward className="text-black text-3xl" />
            )}
          </button>
        </div>

        <nav className="mt-8 space-y-4 pl-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center p-1 pt-4 hover:text-accent transition-all mt-20 duration-1000 ${
                item.label === "Help" ? "mt-auto" : ""
              }`}
            >
              <item.icon className="text-3xl" />
              {isOpen && <span className="ml-4">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className={`flex-1 p-6 transition-all duration-300`}>
        <button
          onClick={toggleSidebar}
          className="fixed rounded-full focus:outline-none z-50 md:hidden"
        >
          {/* <FaBars className="text-black text-2xl" /> */}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;