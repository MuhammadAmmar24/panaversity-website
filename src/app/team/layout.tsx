// layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team",
  description: `Discover the team driving Panaversity, an AI-powered online university. Our experts in Generative AI, cloud-native technologies, and custom GPTs are reshaping the future of education with cutting-edge solutions for global learners.`
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}