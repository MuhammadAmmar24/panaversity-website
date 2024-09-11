"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import logo from "../../public/logos/logo.png";
import { navItems } from "@/constants/nav";

export default function Navbar() {
  // State to track whether navbar is hidden
  const [hidden, setHidden] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // If scrolling down and past 100px, hide the navbar
      if (currentScrollPos > scrollPosition && currentScrollPos > 100) {
        setHidden(true);
      } else {
        // If scrolling up, show the navbar
        setHidden(false);
      }

      // Update the scroll position
      setScrollPosition(currentScrollPos);
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up the event listener on unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return (
    <header
      className={`py-1 sm:py-4 sticky bg-white/50 backdrop-blur-lg top-0 z-50 w-full transition-transform duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container mx-auto flex h-16 lg:max-w-[950px] xl:max-w-6xl items-center justify-between px-4 md:px-0">
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
            <a
              href="#_"
              className="relative items-center justify-start inline-block px-3 py-2 md:px-4 lg:px-5 lg:py-3  overflow-hidden font-bold rounded-full group"
            >
              <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-accent opacity-[3%]"></span>
              <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-accent opacity-100 group-hover:-translate-x-8"></span>
              <span className="relative w-full text-left text-[0.8rem] lg:text-[0.9rem] text-textPrimary transition-colors duration-200 ease-in-out group-hover:text-textPrimary font-poppins font-semibold">
                Enroll Now
              </span>
              <span className="absolute inset-0 border-2 border-accent rounded-full"></span>
            </a>
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
            <SheetContent side="left" className="md:hidden  border-0  bg-white/50 backdrop-blur-lg">
              <nav className="grid gap-4 p-4 mt-6">
                {navItems.map((nav) => (
                  <SheetClose asChild key={nav.name}>
                    <Link
                      href={nav.link}
                      className="text-md  font-medium text-textPrimary hover:text-accent"
                    >
                      {nav.name}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}