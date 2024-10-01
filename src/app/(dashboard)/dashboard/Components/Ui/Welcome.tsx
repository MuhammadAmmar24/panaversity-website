"use client";
import React, { useState, useEffect } from "react";

const Welcome: React.FC = () => {
  const [userName, setUserName] = useState<string>("");

  // Simulate fetching user data (this should be replaced with an actual API call in production)
  useEffect(() => {
    const fetchUserData = async () => {
      // Simulated API response
      const user = { name: "Rasaf Inayat" }; // Mock user data
      setUserName(user.name); // Update state with user name
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <section className="w-full">
      {/* Welcome message container */}
      <div className="h-32 w-full mt-10 mobileM:mt-12 xs:mt-14 flex gap-4 items-center justify-start">
        <h1 className="font-medium text-start text-xl fold:text-lg mobileM:text-2xl md:text-3xl font-poppins">
          Welcome {userName} {/* Dynamically display the user's name */}
          <br />
          <span className="text-xs fold:text-sm mobileM:text-base md:text-lg">
            Overview of your courses {/* Subtitle */}
          </span>
        </h1>
      </div>
    </section>
  );
};

export default Welcome;
