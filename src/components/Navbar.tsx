"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/src/components/ui/sheet";
import logo from "../../public/logos/logo.png";
import { navItems } from "@/src/constants/nav";
import { usePathname } from "next/navigation";
import { user_verify } from "@/src/lib/user-verify";
import { useRouter } from "next/navigation";
import { FaHome, FaSignInAlt } from "react-icons/fa";


export default function Navbar() {
  // State to track whether navbar is hidden
  const [hidden, setHidden] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  // const handleClick = () => {
  //   if (IsLoggedIn) {
  //     router.push("/dashboard");
  //   } else {
  //     router.push("/register");

  //   }
  // }

  useEffect(() => {
    // async function checkUserStatus() {
    //   const res = await user_verify();
    //   if (res?.isVerified) {
    //     setIsLoggedIn(res.isVerified);
    //   }
    // }
    // checkUserStatus()

    async function checkUserStatus() {
      const res = await user_verify();
      if (res?.isVerified) {
        setIsLoggedIn(res.isVerified);
      }
    }
    checkUserStatus();
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
      className={`py-1 sm:py-4 sticky bg-white/50 backdrop-blur-lg top-0 z-40 w-full transition-transform duration-500 ${hidden ? "-translate-y-full" : "translate-y-0"
        }`}
    >
      <div className="container mx-auto flex h-16 lg:max-w-[950px] xl:max-w-6xl items-center justify-between mobileM:px-3 xs:px-1 sm:px-2  md:px-0">
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
              className={` text-base ${pathName === nav.link
                ? "text-[#40e477]"
                : "text-textPrimary hover:text-[#40e477]"
                }`}
            >
              {nav.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* CTA Button */}
          <div className="hidden md:flex mt-6">
            <Link
              href={IsLoggedIn ? "/dashboard" : "/register"}
              //  onClick={handleClick}
              className="relative items-center justify-start inline-block px-3 py-2 md:px-4 lg:px-5 lg:py-3  overflow-hidden font-bold rounded-full group"
            >
              <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-accent opacity-[3%]"></span>
              <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-accent opacity-100 group-hover:-translate-x-8"></span>
              <span className="relative w-full text-left text-[0.8rem] lg:text-[0.9rem] text-textPrimary transition-colors duration-200 ease-in-out group-hover:text-white font-poppins font-semibold">
                {IsLoggedIn ? "Dashboard" : "Get Started"}
              </span>
              <span className="absolute inset-0 border-2 border-accent rounded-full"></span>
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                aria-label="Open Menu"
                variant="ghost"
                size="icon"
                className=" md:hidden"
              >
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
            <SheetContent
              side="left"
              className="max-w-64 md:hidden  border-0  bg-white/80 backdrop-blur-lg"
            >
              <nav className="flex flex-col justify-between items-center px-4 py-8 h-full">
                <div className="flex flex-col gap-y-4">
                  <Link href="/">
                    <Image
                      src="/logos/logo.png"
                      alt="Logo"
                      width={500}
                      height={500}
                      className="mb-3"
                    />
                  </Link>
                  {navItems.slice(1).map((nav) => (
                    <SheetClose asChild key={nav.name}>
                      <Link
                        href={nav.link}
                        className="text-md  font-medium text-textPrimary hover:text-accent flex items-center gap-3"
                      >
                        {<nav.icon />}
                        {nav.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                <div className="">
                  <SheetClose asChild>
                    <Link
                      href={IsLoggedIn ? "/dashboard" : "/register"}
                      className="relative flex items-center justify-center text-center px-4 py-2 gap-x-2  overflow-hidden font-medium rounded-3xl group border-2 border-accent "
                    >
                      {/* <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-accent opacity-[3%]"></span>
                      <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-accent opacity-100 group-hover:-translate-x-8"></span>

                     
                      <span className="relative flex items-center gap-2 w-full text-center text-textPrimary transition-colors duration-200 ease-in-out group-hover:text-white font-medium"></span> */}
                      {IsLoggedIn ? (
                        <>
                          <FaHome size={18} /> {/* Home icon */}
                          Dashboard
                        </>
                      ) : (
                        <>
                          <FaSignInAlt size={18} /> {/* Login icon */}
                          Get Started
                        </>
                      )}
                      {/* </span> */}

                      {/* <span className="absolute inset-0 border-2 border-accent rounded-3xl"></span> */}
                    </Link>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
