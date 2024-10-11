import Image from "next/image";
import Link from "next/link";
import React from "react";
import Dropdown from "./TopbarDropdown";
import  fetchProfile  from "@/src/lib/getProfile";
import Error from "../Error/error_message";

const TopBar: React.FC = async () => {
  let profile: ProfileData | null = null;

  // Fetch the profile data with error handling
  try {
    profile = await fetchProfile();  
  } catch (error) {
    console.error("Error fetching profile data:", error);
    // In case of an error, you could return default data or handle it appropriately
  }

  // Fallback UI if profile data is not available
  if (!profile) {
    return (
<Error message="Error loading profile" />
    );
  }

  return (
    <header className="h-16 flex items-center justify-between mt-6 sm:mt-10 mb-4 ml-2">
      {/* Logo link for home navigation */}
      <Link href="/" aria-label="Home">
        <Image
          width={500}
          height={500}
          src="/logos/logo.png"
          alt="Company Logo"
          className="h-14 w-auto mobileM:h-14 xs:h-14 sm:h-16 md:h-20"
          // layout="intrinsic" // Ensures image maintains its aspect ratio
          priority={true} // Optional: helps load the logo faster
        />
      </Link>

      {/* Client-side component to fetch user data and display the dropdown */}
      <Dropdown
        userName={profile.full_name}
        userEmail={profile.email}
        userImage="/profile.png" // Placeholder for user profile image
      />
    </header>
  );
};

export default TopBar;
