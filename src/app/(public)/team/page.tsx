import React from "react";
import TeamHeader from "@/src/app/(public)/team/components/TeamHeader";
import TeamGrid from "@/src/app/(public)/team/components/TeamGrid";

const TeamPage = () => {
  return (
    <section className="light bg-background dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-x-hidden">
      <div>
        <div className="w-full mb-32">
          <TeamHeader />
          <TeamGrid />
        </div>
      </div>
    </section>
  );
};

export default TeamPage;
