"use client";
import { Skeleton } from "@/src/components/ui/skeleton";
import { allTeamMembers } from "@/src/constants/teams";
import { TeamMember } from "@/src/types/team";
import { useState } from "react";

// Component to display individual team member
const TeamMemberItem = ({ member }: { member: TeamMember }) => (
  <div className="mt-2 w-[280px]">
    {/* Team Member Picture with Background Shape */}
    <div className="relative flex items-center justify-center">
      {/* Background shape (decorative) */}
      <Skeleton className="h-[200px] w-full rounded-xl" />
    </div>

    <div className="mt-2 h-auto overflow-y-hidden rounded-xl bg-background p-4 text-center shadow-xl">
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
    <section className="light overflow-x-hidden bg-background text-zinc-900">
      {/* Team Members */}
      <div className="container mx-auto mt-8 px-4 sm:px-6 md:px-7 lg:px-1 xl:px-32">
        <div className="-mx-4 flex flex-wrap justify-center">
          {allTeamMembers
            .slice(0, visibleMembers)
            .map((member: TeamMember, i: number) => (
              <div
                key={i}
                className="mb-8 flex w-full justify-center px-4 sm:w-1/2 lg:w-1/3"
              >
                <TeamMemberItem member={member} />
              </div>
            ))}
        </div>

        {visibleMembers < allTeamMembers.length && (
          <div className="mb-8 mt-8 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="rounded bg-accent px-6 py-2 text-white transition-colors hover:bg-accent/90"
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
