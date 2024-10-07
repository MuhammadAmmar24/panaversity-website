
import React, { useState, useEffect } from "react";
import { checkUserVerification } from "@/src/actions/profile";
import Dropdown from "./TopbarDropdown";

const TopBarClient: React.FC = () => {
  // const [profile, setProfile] = useState<ProfileData | null>(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const user_data = await checkUserVerification();
  //       setProfile(user_data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  return (
    <Dropdown
     
      userImage="/profile.png"
    />
  );
};

export default TopBarClient;
