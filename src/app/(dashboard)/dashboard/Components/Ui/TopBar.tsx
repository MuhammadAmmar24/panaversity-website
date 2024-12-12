import fetchProfile from "@/src/lib/getProfile";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Error from "../Error/error_message";
import Dropdown from "./TopbarDropdown";

const TopBar: React.FC = async () => {
  let profile: ProfileData | null = null;

  try {
    profile = await fetchProfile();
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }

  return (
    <header className="mb-4 mt-6 flex h-16 items-center justify-between sm:mt-10">
      <Link href="/" aria-label="Home">
        <Image
          width={500}
          height={500}
          src="/logos/logo.webp"
          alt="Company Logo"
          className="h-14 w-auto mobileM:h-14 xs:h-14 sm:h-16 md:h-20"
          priority={true}
        />
      </Link>
      {profile ? (
        <Dropdown
          userName={profile.full_name}
          userEmail={profile.email}
          userImage="/profile.webp"
        />
      ) : (
        <Error message="Profile not available" />
      )}
    </header>
  );
};

export default TopBar;