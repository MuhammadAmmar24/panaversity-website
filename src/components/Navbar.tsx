"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import logo from "../../public/logos/logo.png";

export default function Navbar() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Our Team", link: "/team" },
    { name: "Results", link: "/results" },
    { name: "Course Content", link: "/about" },
    { name: "Announcements", link: "/announcements" },
  ];

  return (
    <header className={`pt-6 sticky  bg-white/50 backdrop-blur-lg  top-0 z-50 w-full`}>
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="Home">
          <Image
            src={logo}
            alt="Panaversity Logo"
            className="w-[120px] sm:w-[140px] md:w-[140px] lg:w-[150px]"
            priority
          />
        </Link>

        {/* Full Navigation Links (for large screens) */}
        <nav className="hidden items-center mt-6 gap-10 text-sm font-medium md:flex">
          {navItems.map((nav) => (
            <Link
              key={nav.name}
              href={nav.link}
              className={`text-textPrimary text-base hover:text-[#40e477]`}
            >
              {nav.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* CTA Button */}
          <div className="hidden md:flex mt-6">
            <Button className="px-4 py-2 text-black border-2 bg-white border-[#40e477] hover:bg-[#40e477] rounded-full">
              Enroll Now
            </Button>
          </div>

          {/* Mobile Menu Icon */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className=" md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <nav className="grid gap-4 p-4">
                {navItems.map((nav) => (
                  <Link
                    key={nav.name}
                    href={nav.link}
                    className="text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    {nav.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
