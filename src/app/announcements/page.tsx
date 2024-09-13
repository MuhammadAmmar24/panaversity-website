import Link from "next/link";

export default function announcements() {
  return (
    <main className="min-h-screen mt-[-3rem] md:mt-[-4rem] flex flex-col justify-center items-center gap-4 bg-background px-5 ">
      <h2 className="text-xl font-medium font-poppins text-center text-accent">
        Coming Soon
      </h2>
      <h2 className="text-4xl sm:text-5xl mt-[-0.5rem] font-bold font-poppins text-center text-textPrimary">
        This Page is Under Construction
      </h2>
      <p className="mt-4 px-3 font-inter text-center text-lg text-textSecondary">
      Good things take time! We’re working on this page and will have it ready soon.
      </p>
      <Link
        href="/"
        className="relative inline-block px-8 py-4 mt-6 overflow-hidden font-bold rounded-full group"
      >
        <span className="absolute top-0 left-10 w-32 h-32 translate-x-12 -translate-y-4 rotate-45 bg-accent opacity-[3%]"></span>
        <span className="absolute top-0 left-0 w-48 h-48 -mt-1 bg-accent opacity-100 transition-all duration-500 ease-in-out -translate-x-56 -translate-y-24 rotate-45 group-hover:-translate-x-1"></span>
        <span className="relative text-[1rem] font-bold text-textPrimary transition-colors duration-200 ease-in-out font-poppins lg:text-[0.9rem] group-hover:text-textPrimary">
          Go back to Home
        </span>
        <span className="absolute inset-0 rounded-full border-2 border-accent"></span>
      </Link>
    </main>
  );
}
