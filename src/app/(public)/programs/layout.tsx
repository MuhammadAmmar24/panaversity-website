// layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs offered by Panaversity",
  description: `Discover Panaversity's comprehensive programs in Generative AI, cloud-native technologies, and custom GPT development. Our expertly designed courses empower global learners to master the latest innovations in AI and technology, preparing them for future opportunities in a rapidly evolving digital world.`
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}