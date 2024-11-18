import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logos/logo.webp";
import { AuthButton } from "./AuthButton";
import { MobileMenu } from "./MobileMenu";
import NavLinks from "./NavLinks";
import { ScrollHandler } from "./ScrollHandler";

export default function Navbar() {
  return (
    <ScrollHandler>
      <div className="mx-auto flex h-16 items-center justify-between px-2 mobileM:px-3 xs:px-4 sm:px-6 md:px-6 lg:max-w-[950px] lg:px-0 xl:max-w-6xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="Home">
          <Image
            src={logo}
            alt="Panaversity Logo"
            className="w-[120px] sm:w-[140px] md:w-[140px] lg:w-[150px]"
            priority
          />
        </Link>

        {/* Full Navigation Links */}
        <NavLinks />

        <div className="flex items-center gap-4">
          {/* CTA Button */}
          <div className="">
            <AuthButton />
          </div>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </ScrollHandler>
  );
}
