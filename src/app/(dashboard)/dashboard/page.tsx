import fetchProfile from "@/src/lib/getProfile";
import type { Metadata } from "next";
import Dashboard from "./Components/Ui/Dashboard";
import TopBar from "./Components/Ui/TopBar";
import Welcome from "./Components/Ui/Welcome";

export const metadata: Metadata = {
  title: "Dashboard",
  description: `Access your personalized Panaversity dashboard. Manage your enrolled courses, track progress, and explore additional learning opportunities powered by Agentic AI and cutting-edge technologies.`,
};

export default async function Home() {
  const profile: ProfileData = await fetchProfile();

  return (
    <main className="mx-3 flex-1 overflow-hidden transition-all duration-300 mobileM:mx-4 xs:mx-6 sm:ml-20 sm:mr-20 lg:mx-10 xl:mx-20 px-0 ssm:px-8 sm:px-0 tablet_lg:mx-10">
      <TopBar studentName={profile?.full_name} studentEmail={profile?.email} />
      <Welcome studentName={profile?.full_name} />
      <Dashboard profileId={profile?.id} />
    </main>
  );
}
