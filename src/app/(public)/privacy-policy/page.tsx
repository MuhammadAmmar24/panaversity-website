import { privacypolicydata } from "@/src/constants/privacypolicy";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Panaversity’s Privacy Policy",
  description:
    " Learn how Panaversity, an AI-powered online university, safeguards your privacy. Our comprehensive privacy policy outlines how we collect, use, and protect your personal information as you engage with our Generative AI courses and services.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white font-poppins">
      {/* Header */}
      <div className="flex justify-center items-center bg-teamBg bg-cover">
        <div className="text-center w-full py-12 sm:py-16">
          <h2 className="text-[1.8rem] sm:text-[2.5rem] md:text-[3.5rem] text-white font-bold tracking-wide">
            {privacypolicydata.headline1}
          </h2>
          <p className="text-white opacity-80 text-base sm:text-lg mt-4">
            {privacypolicydata.headline3}
          </p>
        </div>
      </div>

      {/* Privacy Policy Section */}
      <section className="lg:max-w-[950px] xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-8 sm:py-12 lg:py-16">
        <div className="text-black space-y-8">
          {/* Effective Date */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
            {privacypolicydata.head2}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            {privacypolicydata.paraline1}
          </p>

          {/* Section 1: Information We Collect */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {privacypolicydata.headpolicy1}
            </h3>
            <p className="text-sm sm:text-base font-medium text-gray-800">
              {privacypolicydata.policy1subhead}
            </p>
            <ul className="list-disc pl-5 space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li>{privacypolicydata.policy1description1}</li>
              <li>{privacypolicydata.policy1description2}</li>
              <li>{privacypolicydata.policy1description3}</li>
            </ul>
          </div>

          {/* Section 2: How We Use Your Information */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {privacypolicydata.headpolicy2}
            </h3>
            <p className="text-sm sm:text-base font-medium text-gray-800">
              {privacypolicydata.policy2subhead}
            </p>
            <ul className="list-disc pl-5 space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li>{privacypolicydata.policy2description1}</li>
              <li>{privacypolicydata.policy2description2}</li>
              <li>{privacypolicydata.policy2description3}</li>
              <li>{privacypolicydata.policy2description4}</li>
              <li>{privacypolicydata.policy2description5}</li>
            </ul>
          </div>

          {/* Section 3: Data Sharing and Third-Party Services */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {privacypolicydata.headpolicy3}
            </h3>
            <p className="text-sm sm:text-base">
              {privacypolicydata.policy3description1}
            </p>
          </div>

          {/* Section 4: Data Protection and Security */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {privacypolicydata.headpolicy4}
            </h3>
            <p className="text-sm sm:text-base">
              {privacypolicydata.policy4description1}
            </p>
          </div>

          {/* Section 5: Data Retention */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {privacypolicydata.headpolicy5}
            </h3>
            <p className="text-sm sm:text-base">
              {privacypolicydata.policy5description1}
            </p>
          </div>

          {/* Section 6: Your Rights */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {privacypolicydata.headpolicy6}
            </h3>
            <ul className="list-disc pl-5 space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li>{privacypolicydata.policy6description1}</li>
              <li>{privacypolicydata.policy6description2}</li>
            </ul>
          </div>

          {/* Section 7: Cookies */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {privacypolicydata.headpolicy7}
            </h3>
            <p className="text-sm sm:text-base">
              {privacypolicydata.policy7description1}
            </p>
          </div>

          {/* Section 8: Changes to This Policy */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {privacypolicydata.headpolicy8}
            </h3>
            <p className="text-sm sm:text-base">
              {privacypolicydata.policy8description1}
            </p>
          </div>

          {/* Section 9: Contact Us */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {privacypolicydata.headpolicy9}
            </h3>
            <div className="flex flex-wrap gap-1">
              <p className="text-sm sm:text-base">
                {privacypolicydata.policy9description1}
              </p>
              <Link
                href={privacypolicydata.contactlink}
                className="text-green-500 hover:underline text-sm sm:text-base"
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