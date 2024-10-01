"use client";
import Dashboard from "../Skeleton/DashboardSkeleton";
import Sidebar from "../Skeleton/SidebarSkeleton";
import TopbarSkeleton from "../Skeleton/TopbarSkeleton";
import Welcome from "../Skeleton/WelcomeSekeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="relative flex">
      <aside>
        <Sidebar />
      </aside>
      <header className="md:mx-20 mx-4 w-full h-full">
        <TopbarSkeleton />
        <Welcome />
        <Dashboard />
      </header>
    </main>
  );
}
