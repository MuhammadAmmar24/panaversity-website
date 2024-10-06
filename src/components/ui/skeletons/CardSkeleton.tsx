"use client";
import React, { useState } from "react";
import { allTeamMembers } from "@/src/constants/teams";
import { Skeleton } from "@/src/components/ui/skeleton"


// Define types for the social link and team member


type TeamMember = {
  picture: string;
  fullName: string;
  designation: string;
  bio: string;
};

// Component to display individual team member
const TeamMemberItem = ({ member }: { member: TeamMember }) => (
  <div className="w-[280px] mt-2">
    {/* Team Member Picture with Background Shape */}
    <div className="relative flex justify-center items-center">
      {/* Background shape (decorative) */}
      <Skeleton className="w-full h-[200px] rounded-xl" />
    </div>

    <div className="bg-background dark:bg-slate-800 shadow-xl rounded-xl p-4 text-center mt-2 h-auto overflow-y-hidden">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  </div>
);

// Define prop types for validation

const CardSkeleton = () => {
  // State to handle visible team members
  const [visibleMembers, setVisibleMembers] = useState(9);

  // Function to load more team members
  const handleLoadMore = () => {
    setVisibleMembers((prev) => prev + 24);
  };

  return (
    <section className=" light bg-background dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-x-hidden">
        {/* Team Members */}
        <div className="container mx-auto px-4 sm:px-6 md:px-7 lg:px-1 xl:px-32 mt-8 ">
          <div className="flex flex-wrap justify-center -mx-4 ">
            {allTeamMembers.slice(0, visibleMembers).map((member: TeamMember, i: number) => (
              <div key={i} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8 flex justify-center ">
                <TeamMemberItem member={member} />
              </div>
            ))}
          </div>


          {visibleMembers < allTeamMembers.length && (
          <div className="flex justify-center mt-8 mb-8">
            <button
              onClick={handleLoadMore}
              className="bg-accent text-white px-6 py-2 rounded hover:bg-accent/90 transition-colors"
            >
              Load More
            </button>
          </div>
        )}

        </div>
    </section>
  );
};

export default CardSkeleton;