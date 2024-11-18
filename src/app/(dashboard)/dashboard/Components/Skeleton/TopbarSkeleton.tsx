import Image from "next/image";

export default function TopbarSkeleton() {
  return (
    <header className="mb-4 mt-6 flex h-16 items-center justify-between sm:mt-10">
      <div>
        <Image
          src="/logos/logo.png"
          alt="Company Logo"
          width={500}
          height={500}
          className="h-14 w-auto animate-pulse mobileM:h-14 xs:h-14 sm:h-16 md:h-20"
        />
      </div>
      <div className="h-12 w-12 rounded-full bg-gray-200"></div>
    </header>
  );
}
