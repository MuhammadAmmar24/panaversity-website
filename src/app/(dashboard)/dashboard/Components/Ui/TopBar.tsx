import Image from "next/image";
import Link from "next/link";
import React from "react";
import TopBarClient from "./TopBarClient"; // The client-side component
import Dropdown from "./TopbarDropdown";
import getProfile from "@/src/lib/getProfile";

const TopBar: React.FC = async () => {

  const profile : ProfileData = await getProfile();

  return (
    <header className="h-16 flex items-center justify-between mt-6 sm:mt-10 mb-4">
      {/* Logo link for home navigation */}
      <Link href="/" aria-label="Home">
        <Image
          src="/logos/logo.png"
          alt="Company Logo"
          width={500}
          height={500}
          className="h-14 w-auto mobileM:h-14 xs:h-14 sm:h-16 md:h-20"
        />
      </Link>

      {/* Client-side component to fetch user data and display the dropdown */}
      <Dropdown 
       userName={profile.full_name}
       userEmail={profile.email}
       userImage={"/profile.png"}
       />
    </header>
  );
};

export default TopBar;
