"use client";

import { useEffect, useState } from "react";

export function ScrollHandler({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > scrollPosition && currentScrollPos > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  return (
    <header
      className={`py-1 sm:py-4 sticky bg-white/50 backdrop-blur-lg top-0 z-40 w-full transition-transform duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {children}
    </header>
  );
}