"use client";
import { allTeamMembers } from "@/src/constants/teams";
import { useState } from "react";
import { TeamMember } from "../../types/team";
import TeamMemberItem from "./TeamMemberItem";

const TeamGrid = () => {
  const [visibleMembers, setVisibleMembers] = useState(9);

  const handleLoadMore = () => {
    setVisibleMembers((prev) => prev + 9);
  };

  return (
    <div className="container mx-auto mt-8 px-2 xs:px-4 sm:px-6 md:px-7 lg:px-1 xl:px-32">
      <div className="flex flex-wrap justify-center gap-y-5">
        {allTeamMembers
          .slice(0, visibleMembers)
          .map((member: TeamMember, i) => (
            <div
              key={i}
              className="mb-8 flex w-full justify-center px-4 sm:w-1/2 lg:w-1/3"
            >
              <TeamMemberItem member={member} priority={i < 3} />
            </div>
          ))}
      </div>
      {visibleMembers < allTeamMembers.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="rounded bg-accent px-6 py-2 text-white transition-colors hover:bg-accent/90"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamGrid;
