
"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { allTeamMembers } from "@/constants/teams";

// Define types for the social link and team member
type SocialLink = {
  href: string;
  icon: any;
};

type TeamMember = {
  picture: string;
  fullName: string;
  designation: string;
  bio: string;
  socialLinks: SocialLink[];
};

// Component to display individual team member
const TeamMemberItem = ({ member }: { member: TeamMember }) => (
  <div className="w-[280px] mt-5">
    {/* Team Member Picture with Background Shape */}
    <div className="relative flex justify-center items-center">
      {/* Background shape (decorative) */}
      <img
        alt=""
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full object-cover"
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTI4IiBoZWlnaHQ9IjQzNiIgdmlld0JveD0iMCAwIDUyOCA0MzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQxIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzFjZDk4ZTtzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojM2ZlMGE0O3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZDIiIHgxPSIwJSIgeTE9IjEwMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMWNkOThlO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMxNmE2NzM7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KCiAgPHBhdGggZD0iTTI1MS44ODYgMjMuODQ2NEMyNjMuNzc4IDIuOTc2NDkgMjkzLjg2MyAyLjk3NjUyIDMwNS43NTUgMjMuODQ2NUw1MTQuMzgzIDM4OS45ODFDNTI2LjE1OSA0MTAuNjQ3IDUxMS4yMzUgNDM2LjMyOCA0ODcuNDQ5IDQzNi4zMjhINzAuMTkxNEM0Ni40MDU2IDQzNi4zMjggMzEuNDgxMyA0MTAuNjQ3IDQzLjI1NzIgMzg5Ljk4MUwyNTEuODg2IDIzLjg0NjRaIiBmaWxsPSJ1cmwoI2dyYWQxKSIgLz4KICA8cGF0aCBkPSJNNDI2LjI4IDY4LjUwNDVDNDQ4Ljg2NiA2MC4zMTU0IDQ3MS43OCA3OS44MjA5IDQ2Ny4zMDMgMTAzLjQyNUwzODguODA5IDUxNy4yNThDMzg0LjM3NiA1NDAuNjI1IDM1Ni4zNjggNTUwLjUwMyAzMzguMjU4IDUzNS4wODdMMjAuNzY0NSAyNjQuODI3QzIuNjU0IDI0OS40MSA3LjkzMjc5IDIyMC4xODQgMzAuMjkyIDIxMi4wNzdMNDI2LjI4IDY4LjUwNDVaIiBmaWxsPSJ1cmwoI2dyYWQyKSIgLz4KPC9zdmc+Cg=="
      />
      <Image
        src={member.picture}
        alt={member.fullName}
        width={500}
        height={500}
        className="relative z-10 w-4/5 h-auto rounded-lg"
      />
    </div>

    {/* Team Member Info */}
    <div className="bg-background dark:bg-slate-800 shadow-xl rounded-xl p-4 text-center mt-4 h-[180px] overflow-y-auto">
      <h4 className="text-lg font-medium mb-1">{member.fullName}</h4>
      <h6 className="text-sm font-medium opacity-75">{member.designation}</h6>
      <p className="text-sm mt-1">{member.bio}</p>

      {/* Social Links */}
      <div className="flex justify-center items-center space-x-3 mt-3">
        {member.socialLinks.map((link: SocialLink, index: number) => (
          <a key={index} href={link.href} className="text-gray-500 hover:text-gray-900">
            <FontAwesomeIcon icon={link.icon} />
          </a>
        ))}
      </div>
    </div>
  </div>
);

// Define prop types for validation
TeamMemberItem.propTypes = {
  member: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    socialLinks: PropTypes.arrayOf(
      PropTypes.shape({
        href: PropTypes.string.isRequired,
        icon: PropTypes.object.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const TeamMember = () => {
  // State to handle visible team members
  const [visibleMembers, setVisibleMembers] = useState(9);

  // Function to load more team members
  const handleLoadMore = () => {
    setVisibleMembers((prev) => prev + 9);
  };

  return (
    <section className=" light bg-background dark:bg-[#0b1727] text-zinc-900 dark:text-white">
      <div className="w-full mb-32">
        {/* Header */}
        <div className="flex justify-center items-center bg-teamBg bg-center ">
          <div className="text-center w-full backdrop-brightness-75 backdrop-opacity-100 bg-blur-[1px] py-[7rem]">
            <h2 className="text-[1.7rem] sm:text-[2rem] md:text-[3.6rem] text-background font-bold font-poppins tracking-tighter">
              Meet the Visionaries Behind Panaversity
            </h2>
            <p className="text-background mb-2">
              Discover the Experts Shaping the Future of AI Education
            </p>
          </div>
        </div>

        {/* Team Members */}
        <div className="container mx-auto px-4 sm:px-6 md:px-7 lg:px-1 xl:px-32 mt-8">
          <div className="flex flex-wrap justify-center -mx-4">
            {allTeamMembers.slice(0, visibleMembers).map((member: TeamMember, i: number) => (
              <div key={i} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8 flex justify-center">
                <TeamMemberItem member={member} />
              </div>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        {visibleMembers < allTeamMembers.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="bg-accent text-white px-6 py-2 rounded hover:bg-accent/90 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamMember;
