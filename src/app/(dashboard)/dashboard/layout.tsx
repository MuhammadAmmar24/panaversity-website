// layout.tsx
import type { Metadata } from "next";
import IsSidebarOpen from "./Components/Ui/Sidebar_open";
import { getCookie } from "@/src/lib/getCookies";
import TopBar from "./Components/Ui/TopBar";
import { UserData } from "./types/userData";

export const metadata: Metadata = {
  title: "Dashboard - Panaversity",
  description: `Navigate through your personalized Panaversity dashboard. Access courses, track learning progress, and manage your account settings, all in one place.`,
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  const userData: UserData | null = await getCookie()

  return (
    <>
      <div className="relative flex ">
        <IsSidebarOpen />
        <div className="flex flex-col  flex-1 overflow-hidden transition-all duration-300 sm:mr:10 md:mr-0 xl:mx-20 px-2 mobileM:px-3 xs:px-4 ssm:px-8 md:px-6 tablet_lg:px-8 lg:px-12">
        <TopBar studentName={userData!.full_name || ""} studentEmail={userData!.email} />
        {children}
        </div>
      </div>
    </>
  );
}
