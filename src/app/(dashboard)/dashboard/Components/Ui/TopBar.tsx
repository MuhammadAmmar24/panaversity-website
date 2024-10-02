"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Dropdown from "./TopbarDropdown";
import { getProfile } from "@/src/auth";
import { useEffect, useState } from "react";

const TopBar: React.FC =  () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    getProfile().then(data => {
      setProfile(data);
      console.log(`PROFILE: ${data}`);
    });
  }, []);

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

      {/* User dropdown menu */}
      <Dropdown
        userName={profile?.full_name}
        userEmail={profile?.email}
        userImage="/profile.png"
      />
    </header>
  );
};

export default TopBar;
