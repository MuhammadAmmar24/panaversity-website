"use client";

import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { navItems } from "@/src/constants/nav";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHome, FaSignInAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import logo from "../../../public/logos/logo.webp";
import { RiRobot2Line } from "react-icons/ri";

export function MobileMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await fetch("/api", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Auth check failed");
        }

        const data = await response.json();
        setIsLoggedIn(data.isAuthenticated);
      } catch (error) {
        console.error("Auth check error:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuthStatus();
  }, []);

  if (isLoading) {
    return (
      <Button
        aria-label="Loading"
        variant="ghost"
        size="icon"
        className="md:hidden"
        disabled
      >
        <FiMenu size={24} />
      </Button>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Open Menu"
          variant="ghost"
          size="icon"
          className="tablet_lg:hidden"
        >
          <FiMenu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="max-w-64 border-0 bg-white/80 backdrop-blur-lg tablet_lg:hidden"
      >
        <SheetHeader>
          <VisuallyHidden>
            <DialogTitle>Mobile Menu</DialogTitle>
            <SheetDescription>Menu Sheet for mobile devices</SheetDescription>
          </VisuallyHidden>
        </SheetHeader>
        <nav className="flex h-full flex-col items-center justify-between px-4 py-8">
          <div className="flex flex-col gap-y-4">
            <Link href="/" aria-label="Home">
              <Image
                src={logo}
                alt="Panaversity Logo"
                className="mb-3"
                priority
              />
            </Link>
            {navItems.map((nav) => (
              <SheetClose asChild key={nav.name}>
                <Link
                  href={nav.link}
                  aria-label={`${nav.name}`}
                  className="text-md flex items-center gap-3 font-medium text-textPrimary hover:text-accent"
                >
                  {<nav.icon />}
                  {nav.name}
                </Link>
              </SheetClose>
            ))}
            <Link
              href="/studentbot"
              aria-label="StudentBot"
              className="text-md flex items-center gap-3 font-medium text-green-800"
            >
              <RiRobot2Line/>
              <span className="font-semibold">StudentBot</span>
            </Link>
          </div>
          <div className="">
            <SheetClose asChild>
              <Link
                href={isLoggedIn ? "/dashboard" : "/register"}
                className="group relative flex items-center justify-center gap-x-2 overflow-hidden rounded-3xl border-2 border-accent px-4 py-2 text-center font-medium"
              >
                {isLoggedIn ? (
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
