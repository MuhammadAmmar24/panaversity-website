"use client";
import React, { useState, useEffect } from "react";

const Welcome: React.FC = () => {
  const [userName, setUserName] = useState<string>("");

  // Simulate fetching user data from a backend (Replace with real API call)
  useEffect(() => {
    const fetchUserData = async () => {
      // Simulated API response
      const user = { name: "David Johns" };
      setUserName(user.name);
    };

    fetchUserData();
  }, []);

  return (
    <div className="">
      <div className="h-36 w-full mt-14 flex gap-4 items-center justify-center md:justify-start ">
        <h1 className="text-xl md:text-2xl text-center md:text-start  font-poppins font-medium">
          Welcome {userName}
          <br />
          <span className="text-sm md:text-lg">Overview of your courses</span>
        </h1>
      </div>
    </div>
  );
};

export default Welcome;