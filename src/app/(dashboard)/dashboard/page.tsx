import { getCookie } from "@/src/lib/getCookies";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Dashboard from "./Components/Ui/Dashboard";
import Welcome from "./Components/Ui/Welcome";

export const metadata: Metadata = {
  title: "Dashboard",
  description: `Access your personalized Panaversity dashboard. Manage your enrolled courses, track progress, and explore additional learning opportunities powered by Agentic AI and cutting-edge technologies.`,
};

export default async function Home() {
  const userData = await getCookie();
  if (!userData || !userData.id) {
    redirect("/login");
  }

  return (
    // <main className="mx-3 flex-1 overflow-hidden transition-all duration-300 mobileM:mx-4 xs:mx-6 sm:ml-20 sm:mr-20 lg:mx-10 xl:mx-20 px-0 ssm:px-8 sm:px-0 tablet_lg:mx-10">
    <main>
      {/* <TopBar studentName={userData!.full_name || ""} studentEmail={userData!.email} /> */}
      <Welcome studentName={userData!.full_name || ""} />
      <Dashboard profileId={userData!.id || ""} />
    </main>
  );
}
