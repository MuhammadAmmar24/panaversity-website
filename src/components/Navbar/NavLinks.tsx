"use client"
import Link from "next/link";
import { navItems } from "@/src/constants/nav";
import { usePathname } from "next/navigation";


const NavLinks = () => {

      const pathName = usePathname();

  return (
    <nav className="hidden items-center mt-6 gap-10 text-sm font-medium md:flex">
    {navItems.map((nav) => (
      <Link
              key={nav.name}
              href={nav.link}
              className={` text-base ${
                pathName === nav.link
                  ? "text-[#40e477]"
                  : "text-textPrimary hover:text-[#40e477]"
              }`}
            >
              {nav.name}
            </Link>
    ))}
  </nav>
  )
}

export default NavLinks;
