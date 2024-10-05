"use client";
import React, { useState, useEffect } from "react";
import { checkUserVerification } from "@/src/actions/profile";

const Welcome: React.FC = () => {
  const [userName, setUserName] = useState<string>("");


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user_data = await checkUserVerification();
        console.log(user_data)
  
        setUserName(user_data.full_name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  
      fetchUserData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <section className=" mx-auto">
      {/* Welcome message container */}
      <div className="h-32 w-full mt-10 mobileM:mt-12 xs:mt-14 flex gap-4 items-center justify-start">
        <h1 className="font-medium text-start text-xl fold:text-lg mobileM:text-2xl md:text-4xl font-poppins">
          Welcome {userName} {/* Dynamically display the user's name */}
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
