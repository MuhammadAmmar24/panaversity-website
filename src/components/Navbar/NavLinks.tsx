"use client";
import Link from "next/link";
import { navItems } from "@/src/constants/nav";
import { usePathname } from "next/navigation";
import { RiRobot2Line } from "react-icons/ri";
import { IoMdChatbubbles } from "react-icons/io";

const NavLinks = () => {
  const pathName = usePathname();

  return (
    <nav className="mt-6 hidden items-center gap-10 text-base font-medium tablet_lg:flex">
      {navItems.map((nav) => (
        <Link
          key={nav.name}
          href={nav.link}
          aria-label={`${nav.name}`}
          className={`${pathName === nav.link ? "nav nav-active" : "nav"}`}
        >
          {nav.name}
        </Link>
      ))}
      <Link
        href="https://pana-agent.vercel.app/"
        target="_blank"
        aria-label="StudentBot"
        className={`${
          pathName === "https://pana-agent.vercel.app/"
            ? "nav nav-active"
            : "nav"
        }`}
      >
        <div className="flex items-center gap-2 text-green-800">
          <RiRobot2Line className="text-lg" />
          <span className="font-semibold">StudentBot</span>
          <IoMdChatbubbles />
        </div>
      </Link>
    </nav>
  );
};

export default NavLinks;
