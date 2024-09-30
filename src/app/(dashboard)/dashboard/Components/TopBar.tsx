"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Dropdown from "./TopbarDropdown";

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
      <div className="flex items-center gap-4 md:gap-10 mt-4 md:mt-4">
        {/* Search icon visible on small screens */}

        {/* <div className="relative group">
          <Link href="/dashboard/account-settings">
            <img
              src="/customers/lee-robinson.png"
              alt="User Avatar"
              className="rounded-full shadow-sm h-10 w-10 md:h-14 md:w-auto border-2 border-accent"
            />
          </Link> */}

        {/* Hover text */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-2rem] bg-accent text-white text-sm py-1 px-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Profile
        </div>
      </div>
      <Dropdown
        userName={"Rasaf"}
        userEmail={"rasaf@gmail.com"}
        userImage={"/team/rasaf.jpeg"}
      />
      {/* </div> */}
    </nav>
  );
};

export default TopBar;