"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaRocket } from "react-icons/fa";
import logo from "../../public/logos/logo.png"; // Correct paths for logos

interface NavbarProps {
  bg: string;
  navlinks_color: string;
  image_url: string;
}

export default function Navbar({ bg, navlinks_color, image_url }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Our Team", link: "/team" },
    { name: "Results", link: "/results" },
    { name: "Course Content", link: "/about" },
    { name: "Announcements", link: "/announcements" },
  ];

  // Variants for the hamburger menu lines
  const topLineVariants = {
    closed: {
      rotate: 0,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    open: {
      rotate: 45,
      y: 7,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const middleLineVariants = {
    closed: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
    open: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  const bottomLineVariants = {
    closed: {
      rotate: 0,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    open: {
      rotate: -45,
      y: -7,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`max-w-7xl lg:mx-44 px-4 sm:px-6 md:px-8  py-3 bg-${bg} rounded-full flex justify-between items-center relative top-0 z-50`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" aria-label="Home">
          <Image
            src={logo}
            alt="Panaversity Logo"
            className="w-[120px] sm:w-[140px] md:w-[140px] lg:w-[150px] xl:w-[150px] 2xl:w-[180px] h-auto" // Responsive logo sizes for all breakpoints
            priority
          />
        </Link>
      </div>

      {/* Full Navigation Links (visible on large screens only) */}
      <nav className="hidden lg:flex gap-4 lg:gap-8 lg:mt-7">
        {navItems.map((nav) => (
          <Link key={nav.name} href={nav.link}>
            <motion.span
              className={`text-${navlinks_color} text-sm sm:text-base md:text-lg lg:text-base font-semibold hover:text-[#40e477] transition duration-300 ease-in-out`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {nav.name}
            </motion.span>
          </Link>
        ))}
      </nav>

      {/* CTA Button (visible on large screens only) */}
      <div className="hidden lg:flex lg:mt-7">
        <button className="px-4 sm:px-6 md:px-4 lg:px-6 py-2 text-black bg-transparent border-2 hover:bg-[#40e477] border-[#40e477] transition-colors duration-300 rounded-full shadow-md hover:shadow-lg flex items-center gap-2">
          Enroll
        </button>
      </div>

      {/* Mobile Menu Icon (visible on md and smaller screens only) */}
      <div className="md:block lg:hidden flex items-center">
        <button
          className="text-[#000000] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle mobile menu"
        >
          <motion.svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top Line */}
            <motion.line
              x1="4"
              y1="6"
              x2="20"
              y2="6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              variants={topLineVariants}
              animate={menuOpen ? "open" : "closed"}
            />
            {/* Middle Line */}
            <motion.line
              x1="4"
              y1="12"
              x2="20"
              y2="12"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              variants={middleLineVariants}
              animate={menuOpen ? "open" : "closed"}
            />
            {/* Bottom Line */}
            <motion.line
              x1="4"
              y1="18"
              x2="20"
              y2="18"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              variants={bottomLineVariants}
              animate={menuOpen ? "open" : "closed"}
            />
          </motion.svg>
        </button>
      </div>

      {/* Mobile Menu (only visible on mobile and small screens) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg py-4 px-4 md:hidden origin-top"
          >
            <nav className="flex flex-col gap-4 jadu:gap-2 xsm:gap-3 sm:gap-4">
              {navItems.map((nav) => (
                <Link key={nav.name} href={nav.link}>
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-[#07071C] text-sm xsm:text-lg sm:text-xl font-semibold hover:text-[#40e477] transition duration-300 ease-in-out"
                  >
                    {nav.name}
                  </motion.span>
                </Link>
              ))}
            </nav>
            <div className="mt-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <button className="w-full text-black bg-transparent hover:bg-[#40e685] transition-colors duration-300 rounded-full shadow-md hover:shadow-lg py-2 flex items-center justify-center gap-2">
                  Enroll
                  <FaRocket />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
