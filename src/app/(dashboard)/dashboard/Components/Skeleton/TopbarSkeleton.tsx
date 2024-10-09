import { Link } from "lucide-react";
import React from "react";
import Image from "next/image";
import Dropdown from "../Ui/TopbarDropdown";

export default function TopbarSkeleton() {
  return (
    <header className="h-16 flex items-center justify-between mt-6 sm:mt-10 mb-4">
      <div>
        <Image
          src="/logos/logo.png"
          alt="Company Logo"
          width={500}
          height={500}
          className="h-14 w-auto mobileM:h-14 xs:h-14 sm:h-16 md:h-20 animate-pulse "
        />
      </div>
      <div className="bg-gray-200 h-12 w-12 rounded-full"></div>
    </header>
  );
}
