"use client";


import { Button } from "@/src/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/src/components/ui/sheet";
import Link from "next/link";
import { navItems } from "@/src/constants/nav";
import Image from "next/image";
import { FaHome, FaSignInAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

type AuthButtonProps = {

  isCookie: boolean;

};

export function MobileMenu({ isCookie }: AuthButtonProps) {
  return (
          <Sheet>
            <SheetTrigger asChild>
              <Button
                aria-label="Open Menu"
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <FiMenu size={24} />
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
                      src="/logos/logo.webp"
                      alt="Logo"
                      width={500}
                      height={500}
                      className="mb-3 h-[84px]"
                      priority
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
                      href={isCookie ? "/dashboard" : "/register"}
                      className="relative flex items-center justify-center text-center px-4 py-2 gap-x-2  overflow-hidden font-medium rounded-3xl group border-2 border-accent "
                    >
                      {isCookie ? (
                        <>
                          <FaHome size={18} />
                          Dashboard
                        </>
                      ) : (
                        <>
                          <FaSignInAlt size={18} />
                          Get Started
                        </>
                      )}
                    </Link>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
  );
}