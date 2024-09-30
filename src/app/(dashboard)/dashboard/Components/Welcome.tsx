"use client";
import React, { useState, useEffect } from "react";

const Welcome: React.FC = () => {
  const [userName, setUserName] = useState<string>("");

  // Simulate fetching user data from a backend (Replace with real API call)
  useEffect(() => {
    const fetchUserData = async () => {
      // Simulated API response
      const user = { name: "Rasaf Inayat" };
      setUserName(user.name);
    };

    fetchUserData();
  }, []);

  return (
    <div className="w-full">
      <div className="h-32 w-full mt-10 mobileM:mt-12 xs:mt-14 flex gap-4 items-center justify-start">
        <h1 className="font-medium text-start text-xl fold:text-lg mobileM:text-2xl md:text-3xl font-poppins">
          Welcome {userName}
          <br />
          <span className="text-xs fold:text-sm mobileM:text-base md:text-lg">
            Overview of your courses
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Welcome;
