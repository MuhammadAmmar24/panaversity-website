"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const TopBar: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <nav className="h-16 flex items-center justify-between pt-16 pb-4">
      <Link href="/">
        <Image
          src="/logos/logo.png"
          alt="Logo"
          width={500}
          height={500}
          className="h-20 w-auto"
        />
      </Link>

      {/* Search Input and Search Icon */}
      <div className="flex items-center gap-4 md:gap-10 mt-4 md:mt-8">
        {/* Search icon visible on small screens */}
        <div className="block md:hidden">
          <FaSearch
            onClick={toggleSearch}
            className="text-gray-600 text-xl cursor-pointer"
          />
        </div>

        {/* Search input, toggled on small screens, always visible on larger screens */}
        <input
          type="text"
          placeholder="Search..."
          className={`px-4 py-2 md:px-8 border rounded-md shadow-2xl bg-gray-200 border-gray-200 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-all duration-300 ${
            searchOpen ? "block" : "hidden"
          } md:block`}
        />

        <div className="relative group">
          <Link href="/dashboard/account-settings">
            <img
              src="/customers/lee-robinson.png"
              alt="User Avatar"
              className="rounded-full shadow-2xl h-10 w-10 md:h-14 md:w-auto border-2 border-accent"
            />
          </Link>

          {/* Hover text */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-2rem] bg-accent text-white text-sm py-1 px-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Profile
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;