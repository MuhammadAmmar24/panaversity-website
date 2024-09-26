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
    <div className="flex md:ml-16 justify-center md:justify-start">
      <div className="h-36 w-72 mt-14 md:ml-10 flex gap-4 px-4 items-center ">
        <h1 className="text-lg md:text-2xl">
          Welcome {userName}
          <br />
          <span className="text-sm md:text-lg">Overview of your courses</span>
        </h1>
      </div>
    </div>
  );
};

export default Welcome;
