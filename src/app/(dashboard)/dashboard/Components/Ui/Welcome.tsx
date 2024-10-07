
import React, { useState, useEffect } from "react";
import { checkUserVerification } from "@/src/actions/profile";
import getProfile from "@/src/lib/getProfile";

const Welcome: React.FC = async () => {
  
  const profile : ProfileData = await getProfile();


  return (
    <section className="mx-auto">
      {/* Welcome message container */}
      <div className="h-32 w-full mt-10 mobileM:mt-12 xs:mt-14 flex gap-4 items-center justify-start">
        <h1 className="font-medium text-start text-xl fold:text-lg mobileM:text-2xl md:text-4xl font-poppins">
          Welcome {profile.full_name?.split(' ')[0]} {/* Dynamically display the user's first name */}
          <br />
          <span className="text-xs fold:text-sm mobileM:text-base md:text-lg font-medium">
            Overview of your courses {/* Subtitle */}
          </span>
        </h1>
      </div>
    </section>
  );
};

export default Welcome;
