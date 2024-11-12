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
      <div className="hidden md:flex mt-6">
        <Link
          href={isLoggedIn ? "/dashboard" : "/register"}
          className="relative items-center justify-start inline-block px-3 py-2 md:px-4 lg:px-5 lg:py-3 overflow-hidden font-bold rounded-full group"
        >
          <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-accent opacity-[3%]"></span>
          <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-accent opacity-100 group-hover:-translate-x-8"></span>
          <span className="relative w-full text-left text-[0.8rem] lg:text-[0.9rem] text-textPrimary transition-colors duration-200 ease-in-out group-hover:text-white font-poppins font-semibold">
            {isLoggedIn ? "Dashboard" : "Get Started"}
          </span>
          <span className="absolute inset-0 border-2 border-accent rounded-full"></span>
        </Link>
      </div>
    </div>
  );
}
