import HeaderSection from "@/src/components/ui/HeaderSection";
import { privacypolicydata } from "@/src/constants/privacypolicy";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";

// Metadata for the page
export const metadata: Metadata = {
  title: "Panaversity’s Privacy Policy",
  description:
    "Learn how Panaversity, an AI-powered online university, safeguards your privacy. Our comprehensive privacy policy outlines how we collect, use, and protect your personal information as you engage with our Generative AI courses and services.",
};

// Reusable section component for headings and paragraphs
const Section = ({ title, content }: { title: string; content: string }) => (
  <div className="space-y-6">
    {" "}
    {/* Increased spacing */}
    <h3 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
      {title}
    </h3>{" "}
    {/* Increased font size */}
    <p className="text-base sm:text-lg">{content}</p>{" "}
    {/* Increased font size */}
  </div>
);

// Reusable section with list items
const SectionWithList = ({
  title,
  subtitle,
  items,
  id,
}: {
  title: string;
  subtitle: string;
  items: (string | JSX.Element)[];
  id?: string;
}) => (
  <div id={id} className="space-y-6">
    {" "}
    {/* Increased spacing */}
    <h3 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
      {title}
    </h3>{" "}
    {/* Increased font size */}
    <p className="text-base font-medium text-gray-800 sm:text-lg">
      {subtitle}
    </p>{" "}
    {/* Increased font size */}
    <ul className="list-disc space-y-3 pl-5 text-base sm:space-y-4 sm:text-lg">
      {" "}
      {/* Increased font size */}
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  </div>
);

export default function PrivacyPolicy() {
  return (
    <main className="font-poppins min-h-screen bg-white">
      <HeaderSection
        title={privacypolicydata.headline1}
        description={privacypolicydata.headline3}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy-policy" },
        ]}
      />

      {/* Privacy Policy Section */}
      <section className="lg:py-18 mx-auto px-4 py-10 sm:px-6 sm:py-14 lg:max-w-[950px] lg:px-0 xl:max-w-6xl">
        {" "}
        {/* Increased padding */}
        <div className="space-y-10 text-black">
          {" "}
          {/* Increased spacing */}
          {/* Effective Date */}
          <h2 className="mb-6 text-4xl font-bold text-gray-800 sm:mb-8 sm:text-[2.5rem]">
            {" "}
            {/* Increased font size */}
            {privacypolicydata.head2}
          </h2>
          <p className="text-base leading-relaxed sm:text-lg">
            {" "}
            {/* Increased font size */}
            {privacypolicydata.paraline1}
          </p>
          {/* Sections */}
          <SectionWithList
            title={privacypolicydata.headpolicy1}
            subtitle={privacypolicydata.policy1subhead}
            items={[
              <>
                <strong>Personal Information:</strong>{" "}
                {privacypolicydata.policy1description1}
              </>,
              <>
                <strong>Personalized Learning:</strong>{" "}
                {privacypolicydata.policy1description2}
              </>,
              <>
                <strong>Performance Tracking:</strong>{" "}
                {privacypolicydata.policy1description3}
              </>,
            ]}
          />
          <SectionWithList
            title={privacypolicydata.headpolicy2}
            subtitle={privacypolicydata.policy2subhead}
            items={[
              <>
                <strong>Account Management:</strong>{" "}
                {privacypolicydata.policy2description1}
              </>,
              <>
                <strong>Personalized Learning:</strong>{" "}
                {privacypolicydata.policy2description2}
              </>,
              <>
                <strong>Performance Tracking:</strong>{" "}
                {privacypolicydata.policy2description3}
              </>,
              <>
                <strong>Service Improvement:</strong>{" "}
                {privacypolicydata.policy2description4}
              </>,
              <>
                <strong>Security and Compliance:</strong>{" "}
                {privacypolicydata.policy2description5}
              </>,
            ]}
          />
          <SectionWithList
            id="consent-policy"
            title={privacypolicydata.headpolicy2a}
            subtitle={privacypolicydata.policy2asubhead}
            items={[
              <>
                <strong>Obtaining Consent:</strong>{" "}
                {privacypolicydata.policy2adescription1}
              </>,
              <>
                <strong>Withdrawing Consent:</strong>{" "}
                {privacypolicydata.policy2adescription2}
                <Link
                  href={
                    "mailto:info@panaversity.com?subject=Privacy%20Policy%20Inquiry&body=Please%20provide%20details%20about%20your%20inquiry"
                  }
                  aria-label="Contact Us"
                  className="text-base text-green-500 hover:underline sm:text-lg"
                >
                  {privacypolicydata.contactlink}.
                </Link>
              </>,
              <>
                <strong>Parental Consent:</strong>{" "}
                {privacypolicydata.policy2adescription3}
              </>,
            ]}
          />
          <Section
            title={privacypolicydata.headpolicy3}
            content={privacypolicydata.policy3description1}
          />
          <Section
            title={privacypolicydata.headpolicy4}
            content={privacypolicydata.policy4description1}
          />
          <Section
            title={privacypolicydata.headpolicy5}
            content={privacypolicydata.policy5description1}
          />
          <SectionWithList
            title={privacypolicydata.headpolicy6}
            subtitle=""
            items={[
              <>{privacypolicydata.policy6description1}</>,
              <>{privacypolicydata.policy6description2}</>,
            ]}
          />
          <Section
            title={privacypolicydata.headpolicy7}
            content={privacypolicydata.policy7description1}
          />
          <Section
            title={privacypolicydata.headpolicy8}
            content={privacypolicydata.policy8description1}
          />
          {/* Contact Us */}
          <div className="space-y-6">
            {" "}
            {/* Increased spacing */}
            <h3 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              {privacypolicydata.headpolicy9}
            </h3>
            <div className="flex flex-wrap gap-1">
              <p className="text-base sm:text-lg">
                {" "}
                {/* Increased font size */}
                {privacypolicydata.policy9description1}
              </p>
              <Link
                href={
                  "mailto:info@panaversity.com?subject=Privacy%20Policy%20Inquiry&body=Please%20provide%20details%20about%20your%20inquiry"
                }
                aria-label="Contact Us"
                className="text-base text-green-500 hover:underline sm:text-lg"
              >
                {privacypolicydata.contactlink}.
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
