import TeamGrid from "@/src/components/team/TeamGrid";
import TeamHeader from "@/src/components/team/TeamHeader";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Team Panaversity",
  description: `Meet the Panaversity team of experts specializing in Generative AI, cloud-native technologies, and AI Agents creation. Learn about our great minds behind our innovative learning platform.`,
};

const TeamPage = () => {
  return (
    <section className=" overflow-x-hidden">
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
