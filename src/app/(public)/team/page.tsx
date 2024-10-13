import React from "react";
import TeamHeader from "@/src/app/(public)/team/components/TeamHeader";
import TeamGrid from "@/src/app/(public)/team/components/TeamGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Panaversity",
  description: `Meet the Panaversity team of experts specializing in Generative AI, cloud-native technologies, and AI Agents creation. Learn about our great minds behind our innovative learning platform.`
};

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
