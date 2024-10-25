import Breadcrumbs from "@/src/components/ui/Breadcrumbs";
import { privacypolicydata } from "@/src/constants/privacypolicy";
import type { Metadata } from "next";
import Link from "next/link";

// export const dynamic = "force-static";

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
    <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900">
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
}: {
  title: string;
  subtitle: string;
  items: (string | JSX.Element)[];
}) => (
  <div className="space-y-6">
    {" "}
    {/* Increased spacing */}
    <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900">
      {title}
    </h3>{" "}
    {/* Increased font size */}
    <p className="text-base sm:text-lg font-medium text-gray-800">
      {subtitle}
    </p>{" "}
    {/* Increased font size */}
    <ul className="list-disc pl-5 space-y-3 sm:space-y-4 text-base sm:text-lg">
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
    <main className="min-h-screen bg-white font-poppins">
      {/* Header */}
      <div className="flex justify-center items-center bg-teamBg bg-cover bg-center">
        <div className="text-center w-full backdrop-brightness-75 backdrop-opacity-100 bg-blur-[1px] min-h-48 sm:min-h-52 md:min-h-72 lg:min-h-[21rem]">
          <div className="lg:max-w-[990px] xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-3">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Privacy Policy", href: "/privacy-policy" },
              ]}
            />
          </div>

          <div className="max-w-[312px] xs:max-w-[400px] sm:max-w-[630px] md:pb-6 lg:max-w-[760px] mx-auto">
            <h2
              className="text-[2rem] xs:text-[2rem] sm:text-[2.7rem] md:text-[3rem] lg:text-[3.9rem] -mt-4 text-background font-bold font-poppins tracking-tighter mx-auto"
              style={{ wordSpacing: "0.2em" }}
            >
              {privacypolicydata.headline1}
            </h2>
            <p className="text-background/60 mb-14 md:mb-0 pt-2 px-4 mt-0 max-w-[40rem] mx-auto">
              {privacypolicydata.headline3}
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Policy Section */}
      <section className="lg:max-w-[950px] xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-10 sm:py-14 lg:py-18">
        {" "}
        {/* Increased padding */}
        <div className="text-black space-y-10">
          {" "}
          {/* Increased spacing */}
          {/* Effective Date */}
          <h2 className="text-4xl sm:text-[2.5rem] font-bold text-gray-800 mb-6 sm:mb-8">
            {" "}
            {/* Increased font size */}
            {privacypolicydata.head2}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed">
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
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              {privacypolicydata.headpolicy9}
            </h3>
            <div className="flex flex-wrap gap-1">
              <p className="text-base sm:text-lg">
                {" "}
                {/* Increased font size */}
                {privacypolicydata.policy9description1}
              </p>
              <Link
                href={"mailto:info@panaversity.com?subject=Privacy%20Policy%20Inquiry&body=Please%20provide%20details%20about%20your%20inquiry"}
                className="text-green-500 hover:underline text-base sm:text-lg"
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
