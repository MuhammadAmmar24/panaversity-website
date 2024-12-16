import fetchProfile from "@/src/lib/getProfile";
import type { Metadata } from "next";
import ProfileSettings from "../Components/Ui/ProfileSettings";
import TopBar from "../Components/Ui/TopBar";

export const metadata: Metadata = {
  title: "Account Settings",
  description: `Manage your Panaversity account settings. Update your profile, change your password, and customize your preferences for a personalized learning experience.`,
};

export default async function Profile() {
  
  const user_data = await fetchProfile();

  return (
    <main className="flex-1 px-2 mobileM:px-4 xs:px-6 ssm:px-12 md:px-24">
      <TopBar studentName={user_data?.full_name} studentEmail={user_data?.email} />
      <ProfileSettings profile={user_data} />
    </main>
  );
}