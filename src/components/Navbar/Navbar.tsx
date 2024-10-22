import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logos/logo.webp";
import { AuthButton } from "./AuthButton";
import { MobileMenu } from "./MobileMenu";
import NavLinks from "./NavLinks";
import { ScrollHandler } from "./ScrollHandler";

export default function Navbar() {

  const isCookie = cookies().get("user_data") !== undefined;

  console.log(isCookie, "isCookie Cookie Navbae");

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
        <NavLinks />

        <div className="flex items-center gap-4">
          {/* CTA Button */}
          <div className="">
            <AuthButton isCookie={isCookie ? true : false} />
          </div>

          {/* Mobile Menu */}
          <MobileMenu isCookie={isCookie ? true : false}/>
        </div>
      </div>
    </ScrollHandler>
  );
}