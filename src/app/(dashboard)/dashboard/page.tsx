import fetchProfile from "@/src/lib/getProfile";
import type { Metadata } from "next";
import Dashboard from "./Components/Ui/Dashboard";
import TopBar from "./Components/Ui/TopBar";
import Welcome from "./Components/Ui/Welcome";

export const metadata: Metadata = {
  title: "Dashboard",
  description: `Access your personalized Panaversity dashboard. Manage your enrolled courses, track progress, and explore additional learning opportunities powered by Generative AI and cutting-edge technologies.`,
};

export default async function Home() {
  const profile: ProfileData = await fetchProfile();

  return (
    <main className="flex-1 mx-3 mobileM:mx-4 xs:mx-6 sm:mr-20 sm:ml-20 overflow-hidden transition-all duration-300">
      <TopBar />
      <Welcome profile={profile} />
      <Dashboard profileId={profile?.id} />
    </main>
  );
}
