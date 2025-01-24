import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { signOut } from "@/src/lib/auth";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import {
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
  IoIosHelpCircleOutline,
} from "react-icons/io";
import { IoLibraryOutline, IoWalletOutline } from "react-icons/io5";
import { SlBookOpen } from "react-icons/sl";
import { SidebarProps } from "../../types/types";
import LogoutDialog from "../Dialog/LogoutDialog";

const Sidebar: React.FC<SidebarProps> = ({ setIsSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/login");
      window.location.reload();
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setIsSidebarOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef, setIsSidebarOpen]);

  const menuItems = [
    { icon: GoHome, label: "Dashboard", href: "/dashboard" },
    { icon: SlBookOpen, label: "Courses", href: "/programs/flagship-program" },
    {
      icon: IoWalletOutline,
      label: "Payment History",
      href: "/dashboard/payment-history",
    },
    { icon: IoLibraryOutline, label: "Lessons", href: "#" },
  ];

  return (
    <aside ref={sidebarRef} className="relative flex h-screen">
      <div
        className={`fixed z-40 flex h-full flex-col bg-white text-black shadow-2xl transition-all duration-500 ${
          isOpen ? "w-48 xs:w-52 md:w-64" : "w-12"
        }`}
        onClick={(e) => {
          const target = e.target as Element;
          if (!target.closest("svg")) {
            toggleSidebar();
          }
        }}
      >
        <div className="flex items-center justify-between p-4">
          <div
            className={`transition-all duration-300 ease-in-out ${
              isOpen ? "visible opacity-100 delay-200" : "invisible opacity-0"
            }`}
          >
            <Image
              src="/logos/logo.webp"
              alt="Logo"
              width={500}
              height={500}
              className="h-16 w-auto"
            />
          </div>
          <button onClick={toggleSidebar} className="focus:outline-none">
            {isOpen ? (
              <IoIosArrowRoundBack className="mr-0 text-2xl text-black transition-all duration-300 hover:text-accent" />
            ) : (
              <IoIosArrowRoundForward className="-ml-1 mr-1 text-2xl text-black transition-all duration-300 hover:text-accent" />
            )}
          </button>
        </div>
        <nav className="mt-10 flex-1 space-y-2">
          <TooltipProvider>
            {menuItems.map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-label={`Go to ${item.label}`}
                    className="flex items-center px-2 py-4 transition-all duration-300 hover:text-accent group"
                  >
                    <item.icon className="min-w-[2rem] text-2xl" />
                    <span
                      className={cn(
                        "ml-4  min-h-[2rem] flex items-center whitespace-nowrap text-base transition-all duration-300 ease-in-out group-hover:text-accent",
                        isOpen
                          ? "visible opacity-100 delay-100"
                          : "invisible opacity-0 "
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  className={cn("font-medium", !isOpen ? "" : "hidden")}
                  side="right"
                >
                  {item.label}
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>

        <div className="mb-4 mt-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/contact"
                  className="flex w-full items-center px-2 py-4 text-left transition-all duration-300 hover:text-accent group"
                >
                  <IoIosHelpCircleOutline className="min-w-[2rem] text-2xl" />
                  <span
                    className={cn(
                      "ml-4 min-h-[2rem] flex items-center whitespace-nowrap text-base transition-all duration-300 ease-in-out group-hover:text-accent",
                      isOpen
                        ? "visible opacity-100 delay-100"
                        : "invisible opacity-0",
                    )}
                  >
                    Contact Support
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                className={cn("font-medium", !isOpen ? "" : "hidden")}
                side="right"
              >
                Contact Support
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsLogoutDialogOpen(true)}
                  className="flex w-full items-center px-2 py-4 text-left transition-all duration-300 hover:text-accent group"
                >
                  <CiLogout className="min-w-[2rem] text-2xl" />
                  <span
                    className={cn(
                      "ml-4 min-h-[2rem] flex items-center whitespace-nowrap text-base transition-all duration-300 ease-in-out group-hover:text-accent",
                      isOpen
                        ? "visible opacity-100 delay-100"
                        : "invisible opacity-0",
                    )}
                  >
                    Logout
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent
                className={cn("font-medium", !isOpen ? "" : "hidden")}
                side="right"
              >
                Logout
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <main className="flex-1 p-6 transition-all duration-300"></main>

      <LogoutDialog
        onConfirm={handleSignOut}
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
      />
    </aside>
  );
};

export default Sidebar;
