import AccountSettings from "../Components/Ui/AccountSettings";
import TopBar from "../Components/Ui/TopBar";
import Is_sidebar_open from "../Components/Ui/Sidebar_open";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Settings",
  description: `Manage your Panaversity account settings. Update your profile, change your password, and customize your preferences for a personalized learning experience.`
};

export default function Home() {
  return (
    <div className="relative flex">
      <Is_sidebar_open />
      {/* Main content area */}
      <main className="flex-1 mr-6 ml-10 sm:mr-20 sm:ml-20 overflow-hidden transition-all duration-300">
        <TopBar />
    
        <AccountSettings />
      </main>
    </div>
  );
}