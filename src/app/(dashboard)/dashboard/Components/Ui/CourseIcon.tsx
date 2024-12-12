"use client";
import React from "react";
import { FaYoutube, FaGithub, FaBullhorn } from "react-icons/fa";
import { SiZoom } from "react-icons/si";
import { RiRobot2Line } from "react-icons/ri";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip";
import { cn } from "@/src/lib/utils";
import { CourseIconsProps } from "../../types/courses";

const CourseIcons: React.FC<CourseIconsProps> = ({ status, youtubeLink, githubLink, zoomLink }) => {
  const icons = [
    {
      component: <FaYoutube />,
      link: youtubeLink,
      name: "YouTube",
      className: `text-red-600 text-xl mobileM:text-2xl sm:text-3xl md:text-4xl hover:scale-105 transition-all duration-300 ease-in-out ${status === "active" ? "" : "opacity-30 pointer-events-none cursor-not-allowed"}`,
    },
    {
      component: <FaGithub />,
      link: githubLink,
      name: "GitHub",
      className: `text-gray-800 text-base mobileM:text-xl sm:text-2xl md:text-3xl hover:scale-105 transition-all duration-300 ease-in-out ${status === "active" ? "" : "opacity-30 pointer-events-none cursor-not-allowed"}`,
    },
    {
      component: <SiZoom />,
      link: zoomLink,
      name: "Zoom",
      className: `text-blue-500 text-3xl mobileM:text-4xl sm:text-5xl md:text-6xl hover:scale-105 transition-all duration-300 ease-in-out ${status === "active" ? "" : "opacity-30 pointer-events-none cursor-not-allowed"}`,
    },
    {
      component: <FaBullhorn />,
      link: "/",
      name: "Announcements",
      className: `text-gray-800 text-base mobileM:text-xl sm:text-2xl md:text-3xl hover:scale-105 transition-all duration-300 ease-in-out ${status === "active" ? "" : "opacity-30 pointer-events-none cursor-not-allowed"}`,
    },
    {
      component: <RiRobot2Line />,
      link: "/",
      name: "Student Bot",
      className: `text-gray-300 text-base mobileM:text-xl sm:text-2xl md:text-3xl pointer-events-none cursor-not-allowed`,
    },
  ];

  return (
    <TooltipProvider>
      {icons.map((icon, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Link
              href={icon.link}
              target="_blank"
              className={icon.className}
            >
              {icon.component}
            </Link>
          </TooltipTrigger>
          <TooltipContent
            className={cn(
              "mb-2 font-medium",
              status === "active" ? "" : "hidden"
            )}
          >
            {icon.name}
          </TooltipContent>
        </Tooltip>
      ))}
    </TooltipProvider>
  );
};

export default CourseIcons;
