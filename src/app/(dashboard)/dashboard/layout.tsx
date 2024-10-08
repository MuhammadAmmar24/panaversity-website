// layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Panaversity",
  description: `Navigate through your personalized Panaversity dashboard. Access courses, track learning progress, and manage your account settings, all in one place.`
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        {children}</div>
    </>
  );
}