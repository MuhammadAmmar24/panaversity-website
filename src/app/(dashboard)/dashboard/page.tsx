import TopBar from "./Components/Ui/TopBar";
import Dashboard from "./Components/Ui/Dashboard";
import Welcome from "./Components/Ui/Welcome";
import Is_sidebar_open from "./Components/Ui/Sidebar_open";
import DashboardClient from "./Components/Ui/DashboardClient";
import getProfile from "@/src/lib/getProfile"



export default async function Home() {

  const profile : ProfileData = await getProfile();

  return (
    <div className="relative flex">
      <Is_sidebar_open />
      {/* Main content area */}
      <main className="flex-1 mr-6 ml-10 sm:mr-20 sm:ml-20 overflow-hidden transition-all duration-300">
        <TopBar />
        <Welcome />
        <DashboardClient profileId={profile.id} />
      </main>
    </div>
  );
}
