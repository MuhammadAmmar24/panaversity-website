import Image from "next/image";
import Link from "next/link";
import Dropdown from "./TopbarDropdown";

const TopBar = async ({
  studentName,
  studentEmail,
}: {
  studentName: string;
  studentEmail: string;
}) => {
  return (
    <header className="mb-4 mt-6 flex h-16 items-center justify-between sm:mt-10">
      <Link href="/" aria-label="Home">
        <Image
          width={500}
          height={500}
          src="/logos/logo.webp"
          alt="Company Logo"
          className="h-14 w-auto mobileM:h-14 xs:h-14 sm:h-16 md:h-20"
          priority={true}
        />
      </Link>

      <Dropdown
        userName={studentName}
        userEmail={studentEmail}
        userImage="/profile.webp"
      />
    </header>
  );
};

export default TopBar;
