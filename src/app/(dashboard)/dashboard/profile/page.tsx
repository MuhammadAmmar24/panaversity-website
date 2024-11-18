import fetchProfile from "@/src/lib/getProfile";
import type { Metadata } from "next";
import ProfileSettings from "../Components/Ui/ProfileSettings";
import TopBar from "../Components/Ui/TopBar";

export const metadata: Metadata = {
  title: "Account Settings",
  description: `Manage your Panaversity account settings. Update your profile, change your password, and customize your preferences for a personalized learning experience.`,
};

export default async function Home() {
  const user_data = await fetchProfile();

  return (
    <main className="mx-2 flex-1 overflow-hidden px-1 transition-all duration-300 mobileM:px-2 xs:px-3 sm:px-8 md:px-24">
      <TopBar />
      <ProfileSettings profile={user_data} />
    </main>
  );
}
