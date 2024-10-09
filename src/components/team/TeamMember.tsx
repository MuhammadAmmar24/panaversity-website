import React, { Suspense } from "react";
import { allTeamMembers } from "@/src/constants/teams";
import  { TeamMemberItem } from "@/src/components/team/TeamMemberItem"
import CardSkeleton from "@/src/components/ui/skeletons/CardSkeleton";

// TeamMember Server Component
const TeamMember = ({ visibleMembers }: { visibleMembers: number }) => {
  return (
    <section className=" light bg-background dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-x-hidden">
      <Suspense fallback={<CardSkeleton />}>
        <div className="w-full mb-32">
          {/* Header */}
          <div className="flex justify-center items-center bg-teamBg bg-cover">
            <div className="text-center w-full backdrop-brightness-75 backdrop-opacity-100 bg-blur-[1px] py-[7rem]">
              <h2
                className="text-[1.8rem] sm:text-[2rem] md:text-[3.6rem] text-background font-bold font-poppins tracking-tighter"
                style={{ wordSpacing: "0.2em" }}
              >
                Meet The Visionaries Behind
                <br />
                Panaversity
              </h2>
              <p className="text-background/60 mb-2 px-4 mt-4">
                Discover the Experts Shaping the Future of AI Education
              </p>
            </div>
          </div>

          {/* Team Members */}
          <div className="container mx-auto px-4 sm:px-6 md:px-7 lg:px-1 xl:px-32 mt-8 ">
            <div className="flex flex-wrap justify-center -mx-4 ">
              {allTeamMembers.slice(0, visibleMembers).map((member, i) => (
                <div key={i} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8 flex justify-center ">
                  <TeamMemberItem member={member} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Suspense>
    </section>
  );
};

export default TeamMember;
