"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function checkAuthStatus() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/`, {
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
  }, [isLoggedIn]);

  return (
    <div className="flex items-center gap-4">
      <div className="mt-6 hidden tablet_lg:flex">
        <Link
          href={isLoggedIn ? "/dashboard" : "/register"}
          aria-label={
            isLoggedIn ? "Go to dashboard page" : "Go to register page"
          }
          className="group relative inline-block items-center justify-start overflow-hidden rounded-full px-3 py-2 font-bold md:px-4 lg:px-5 lg:py-3"
        >
          <span className="absolute left-0 top-0 h-32 w-32 -translate-y-2 translate-x-12 rotate-45 bg-accent opacity-[3%]"></span>
          <span className="absolute left-0 top-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-accent opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8"></span>
          <span className="font-poppins relative w-full text-left text-[0.8rem] font-semibold text-textPrimary transition-colors duration-200 ease-in-out group-hover:text-white lg:text-[0.9rem]">
            {isLoggedIn ? "Dashboard" : "Get Started"}
          </span>
          <span className="absolute inset-0 rounded-full border-2 border-accent"></span>
        </Link>
      </div>
    </div>
  );
}
