import TopBar from "./Components/Ui/TopBar";
import Welcome from "./Components/Ui/Welcome";
import Dashboard from "./Components/Ui/Dashboard";
import type { Metadata } from "next";
import fetchProfile from "@/src/lib/getProfile";

export const metadata: Metadata = {
  title: "Dashboard",
  description: `Access your personalized Panaversity dashboard. Manage your enrolled courses, track progress, and explore additional learning opportunities powered by Generative AI and cutting-edge technologies.`,
};

export default async function Home() {

  const profile: ProfileData = await fetchProfile();


  return (
    <main className="flex-1 mr-6 ml-10 sm:mr-20 sm:ml-20 overflow-hidden transition-all duration-300">
      <TopBar />
      <Welcome profile={profile} />
      <Dashboard profileId={profile?.id} />
    </main>
  );
}
