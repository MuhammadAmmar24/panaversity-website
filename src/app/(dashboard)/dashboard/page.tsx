import TopBar from "./Components/Ui/TopBar";
import Welcome from "./Components/Ui/Welcome";
import Is_sidebar_open from "./Components/Ui/Sidebar_open";
import Dashboard from "./Components/Ui/Dashboard";
import  {checkUserVerification}  from "@/src/actions/profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: `Access your personalized Panaversity dashboard. Manage your enrolled courses, track progress, and explore additional learning opportunities powered by Generative AI and cutting-edge technologies.`
};

export default async function Home() {
  const profile: ProfileData = await checkUserVerification();

  return (
    <div className="relative flex">
      <Is_sidebar_open />
      {/* Main content area */}
      <main className="flex-1 mr-6 ml-10 sm:mr-20 sm:ml-20 overflow-hidden transition-all duration-300">
        <TopBar />
        <Welcome />
        <Dashboard profileId={profile?.id} />
      </main>
    </div>
  );
}
