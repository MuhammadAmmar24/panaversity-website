import AccountSettings from "../Components/Ui/AccountSettings";
import TopBar from "../Components/Ui/TopBar";
import type { Metadata } from "next";
import fetchProfile from "@/src/lib/getProfile";

export const metadata: Metadata = {
  title: "Account Settings",
  description: `Manage your Panaversity account settings. Update your profile, change your password, and customize your preferences for a personalized learning experience.`,
};

export default async function Home() {
  const user_data = await fetchProfile();
  console.log(user_data)
  return (
    <main className="flex-1 mr-6 ml-10 sm:mr-20 sm:ml-20 overflow-hidden transition-all duration-300">
      <TopBar />
      <AccountSettings  profile={user_data}/>
    </main>
  );
}
