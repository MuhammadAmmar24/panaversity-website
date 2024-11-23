import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Announcements",
  description: `Stay updated with the latest news and updates from Panaversity. Explore our announcements on new courses, Agentic AI advancements, and important information for our learners.`,
};

export default function results() {
  return (
    <main className="mt-[-3rem] flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-5 md:mt-[-4rem]">
      <h2 className="font-poppins text-center text-xl font-medium text-accent">
        Coming Soon!
      </h2>
      <h2 className="font-poppins mt-[-0.5rem] text-center text-4xl font-bold text-textPrimary sm:text-5xl">
        This Page is Under Construction
      </h2>
      <p className="font-inter mt-4 px-3 text-center text-lg text-textSecondary">
        Good things take time! We’re working on this page and will have it ready
        soon.
      </p>
      <Link
        href="/announcements"
        aria-label="Go to announcements page"
        className="group relative mt-6 inline-block cursor-pointer overflow-hidden rounded-full px-8 py-4 font-bold"
      >
        {/* Background Shape */}
        <span className="absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-accent opacity-[3%] transition-all duration-500 ease-in-out"></span>
        {/* Hover Effect */}
        <span className="absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-y-1/2 translate-x-[100%] rotate-45 transform bg-accent opacity-100 transition-transform duration-500 ease-in-out group-hover:translate-x-[-50%]"></span>
        {/* Button Text */}
        <span className="duration-400 font-poppins relative text-[1rem] font-bold text-textPrimary transition-colors ease-in-out lg:text-[0.9rem]">
          Go back to Home
        </span>
        {/* Border */}
        <span className="absolute inset-0 rounded-full border-2 border-accent"></span>
      </Link>
    </main>
  );
}
