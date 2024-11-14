"use client";

import { Button } from "@/src/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/src/components/ui/sheet";
import Link from "next/link";
import { navItems } from "@/src/constants/nav";
import Image from "next/image";
import { FaHome, FaSignInAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useEffect, useState } from "react";

export function MobileMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await fetch('/api', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Auth check failed');
        }

        const data = await response.json();
        setIsLoggedIn(data.isAuthenticated);
      } catch (error) {
        console.error('Auth check error:', error);
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
          className="md:hidden"
        >
          <FiMenu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="max-w-64 md:hidden border-0 bg-white/80 backdrop-blur-lg"
      >
        <nav className="flex flex-col justify-between items-center px-4 py-8 h-full">
          <div className="flex flex-col gap-y-4">
            <Link href="/" aria-label="Home">
              <Image
                src="/logos/logo.webp"
                alt="Logo"
                width={500}
                height={500}
                className="mb-3"
                priority
              />
            </Link>
            {navItems.slice(1).map((nav) => (
              <SheetClose asChild key={nav.name}>
                <Link
                  href={nav.link}
                  aria-label={`${nav.name}`}
                  className="text-md font-medium text-textPrimary hover:text-accent flex items-center gap-3"
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
                href={isLoggedIn ? "/dashboard" : "/register"}
                className="relative flex items-center justify-center text-center px-4 py-2 gap-x-2 overflow-hidden font-medium rounded-3xl group border-2 border-accent"
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