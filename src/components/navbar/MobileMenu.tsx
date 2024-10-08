"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/src/components/ui/sheet";
import Link from "next/link";
import { navItems } from "@/src/constants/nav";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Open Menu"
          variant="ghost"
          size="icon"
          className="md:hidden"
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
        className="md:hidden border-0 bg-white/50 backdrop-blur-lg"
      >
        <nav className="grid gap-4 p-4 mt-6">
          {navItems.map((nav) => (
            <SheetClose asChild key={nav.name}>
              <Link
                href={nav.link}
                className="text-md font-medium text-textPrimary hover:text-accent"
              >
                {nav.name}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}