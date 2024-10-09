"use client";
import React, { useState } from "react";
import TeamMember from "./TeamMember"; // Import the server component
import { allTeamMembers } from "@/src/constants/teams";

// Client component for managing state
const TeamMemberClient = () => {
  const [visibleMembers, setVisibleMembers] = useState(9);

  // Function to load more team members
  const handleLoadMore = () => {
    setVisibleMembers((prev) => prev + 9);
  };

  return (
    <>
      <TeamMember visibleMembers={visibleMembers} /> {/* Pass visible members as prop */}

      {/* Load More Button */}
      {visibleMembers < allTeamMembers.length && (
        <div className="flex justify-center mt-2 mb-3">
          <button
            onClick={handleLoadMore}
            className="bg-accent text-white px-6 py-2 rounded hover:bg-accent/90 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default TeamMemberClient;
