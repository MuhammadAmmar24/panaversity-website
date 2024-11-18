"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollHandler({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  // const [scrollPosition, setScrollPosition] = useState(0);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (
        currentScrollPos > scrollPositionRef.current &&
        currentScrollPos > 100
      ) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      scrollPositionRef.current = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white/50 py-1 backdrop-blur-lg transition-transform duration-500 sm:py-4 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {children}
    </header>
  );
}
