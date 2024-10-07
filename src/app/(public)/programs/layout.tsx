// layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses Offered",
  description: ``
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}