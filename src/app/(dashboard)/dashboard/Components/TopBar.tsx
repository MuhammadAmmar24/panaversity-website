import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Dropdown from "./TopbarDropdown";

const TopBar: React.FC = () => {
  return (
    <nav className="h-16 flex items-center justify-between mt-14 mb-4">
      <Link href="/">
        <Image
          src="/logos/logo.png"
          alt="Logo"
          width={500}
          height={500}
          className="h-20 w-auto"
        />
      </Link>
      <Dropdown
        userName={"Rasaf"}
        userEmail={"rasaf@gmail.com"}
        userImage={"/team/rasaf.jpg"}
      />
    </nav>
  );
};

export default TopBar;
