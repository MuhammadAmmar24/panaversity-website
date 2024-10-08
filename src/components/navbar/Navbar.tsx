import Link from "next/link";
import Image from "next/image";
import { AuthButton } from "./AuthButton";
import { ScrollHandler } from "./ScrollHandler";
import { MobileMenu } from "./MobileMenu";
import { navItems } from "@/src/constants/nav";
import logo from "../../../public/logos/logo.png";

export default function Navbar() {
  return (
    <ScrollHandler>
      <div className="container mx-auto flex h-16 lg:max-w-[950px] xl:max-w-6xl items-center justify-between mobileM:px-3 xs:px-1 sm:px-2  md:px-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="Home">
          <Image
            src={logo}
            alt="Panaversity Logo"
            className="w-[120px] sm:w-[140px] md:w-[140px] lg:w-[150px]"
            loading="lazy"
          />
        </Link>

        {/* Full Navigation Links */}
        <nav className="hidden items-center mt-6 gap-10 text-sm font-medium md:flex">
          {navItems.map((nav) => (
            <Link
              key={nav.name}
              href={nav.link}
              className={` text-base ${
                false ? "text-[#40e477]" : "text-textPrimary hover:text-[#40e477]"
              }`}
            >
              {nav.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* CTA Button */}
          <div className="hidden md:flex mt-6">
            <AuthButton />
          </div>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </ScrollHandler>
  );
}