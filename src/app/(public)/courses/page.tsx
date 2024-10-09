import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
  description: `Learn about the courses offered here at Panaversity. These courses focus on advanced topics in Generative AI and cloud-native technologies.`
};

export default function results() {
  return (
    <main className="min-h-screen mt-[-3rem] md:mt-[-4rem] flex flex-col justify-center items-center gap-4 bg-background px-5 ">
      <h2 className="text-xl font-medium font-poppins text-center text-accent">
        Coming Soon!    
      </h2>
      <h2 className="text-4xl sm:text-5xl mt-[-0.5rem] font-bold font-poppins text-center text-textPrimary">
        This Page is Under Construction
      </h2>
      <p className="mt-4 px-3 font-inter text-center text-lg text-textSecondary">
      Good things take time! We’re working on this page and will have it ready soon.
      </p>
      <Link
        href="/courses"
        className="relative inline-block px-8 py-4 mt-6 overflow-hidden font-bold rounded-full group cursor-pointer" 
      >
        {/* Background Shape */}
        <span
          className="absolute top-1/2 left-1/2 w-[200%] h-[200%] bg-accent opacity-[3%] rotate-45 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out"
        ></span>
        {/* Hover Effect */}
        <span
          className="absolute top-1/2 left-1/2 w-[300%] h-[300%] bg-accent opacity-100 rotate-45 transform translate-x-[100%]  -translate-y-1/2 transition-transform duration-500 ease-in-out group-hover:translate-x-[-50%]"
        ></span>
        {/* Button Text */}
        <span className="relative text-[1rem] font-bold text-textPrimary transition-colors duration-400 ease-in-out font-poppins lg:text-[0.9rem]">
          Go back to Home
        </span>
        {/* Border */}
        <span className="absolute inset-0 rounded-full border-2 border-accent"></span>
      </Link>

    </main>
  );
}
