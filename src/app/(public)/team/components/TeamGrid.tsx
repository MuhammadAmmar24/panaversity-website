"use client";
import React, { useState } from "react";
import { allTeamMembers } from "@/src/constants/teams";
import TeamMemberItem from "./TeamMemberItem";
import { TeamMember } from "../../../../types/team";

const TeamGrid = () => {
  const [visibleMembers, setVisibleMembers] = useState(9);

  const handleLoadMore = () => {
    setVisibleMembers((prev) => prev + 9);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-7 lg:px-1 xl:px-32 mt-8">
      <div className="flex flex-wrap justify-center -mx-4">
        {allTeamMembers.slice(0, visibleMembers).map((member: TeamMember, i) => (
          <div
            key={i}
            className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8 flex justify-center"
          >
            <TeamMemberItem member={member} />
          </div>
        ))}
      </div>
      {visibleMembers < allTeamMembers.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-accent text-white px-6 py-2 rounded hover:bg-accent/90 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamGrid;
