import TeamGrid from "@/src/components/team/TeamGrid";
import HeaderSection from "@/src/components/ui/HeaderSection";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Team Panaversity",
  description: `Meet the Panaversity team of experts specializing in Agentic AI, cloud-native technologies, and AI Agents creation. Learn about our great minds behind our innovative learning platform.`,
};

const TeamPage = () => {
  return (
    <section className="overflow-x-hidden">
      <div>
        <div className="mb-32 w-full">
          <HeaderSection
            title="Meet The Visionaries"
            description="Discover the Experts Shaping the Future of AI"
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Our Team", href: "/team" },
            ]}
          />
          <TeamGrid />
        </div>
      </div>
    </section>
  );
};

export default TeamPage;
