import ContactUs from "@/src/components/contact/contact";
import HeaderSection from "@/src/components/ui/HeaderSection";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with Panaversity University for inquiries about our Agentic AI and Cloud Native programs. Reach out for admissions, technical support, or general questions.`,
};

export default async function Courses() {
  return (
    <section className="overflow-x-hidden bg-background text-zinc-900">
      <div className="w-full">
        <HeaderSection
          title="Contact Us"
          description="We’re here to assist you on your journey."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Contact", href: "/contact" },
          ]}
        />

        <ContactUs />
      </div>
    </section>
  );
}
