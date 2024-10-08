"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { user_verify } from "@/src/lib/user-verify";

export function AuthButton() {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state to handle async status check
  const router = useRouter();

  const handleClick = () => {
    if (IsLoggedIn) {
      router.push("/dashboard");
    } else {
      router.push("/register");
    }
  };

  useEffect(() => {
    async function checkUserStatus() {
      const res = await user_verify();
      setIsLoggedIn(res?.isVerified || false);
      setLoading(false); // Set loading to false after status is checked
    }
    checkUserStatus();
  }, []);


  return (
    <button
      onClick={handleClick}
      className="relative items-center justify-start inline-block px-3 py-2 md:px-4 lg:px-5 lg:py-3  overflow-hidden font-bold rounded-full group"
    >
      <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-accent opacity-[3%]"></span>
      <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-accent opacity-100 group-hover:-translate-x-8"></span>
      <span className="relative w-full text-left text-[0.8rem] lg:text-[0.9rem] text-textPrimary transition-colors duration-200 ease-in-out group-hover:text-white font-poppins font-semibold">
        {IsLoggedIn ? "Dashboard" : "Get Started"}
      </span>
      <span className="absolute inset-0 border-2 border-accent rounded-full"></span>
    </button>
  );
}