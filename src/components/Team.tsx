"use client";
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image"; // Importing next/image
import {
  executives,
  professionals,
  trainers,
  teamLeads,
} from "@/constants/teams";

const TeamMemberItem = ({ member }: any) => (
  <div className="relative w-full max-w-xs mt-5">
    <div className="relative flex items-center justify-center">
      {/* Background Shape */}
      <img
        alt=""
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full object-cover ezy__team6-shape"
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTI4IiBoZWlnaHQ9IjQzNiIgdmlld0JveD0iMCAwIDUyOCA0MzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQxIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzFjZDk4ZTtzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojM2ZlMGE0O3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZDIiIHgxPSIwJSIgeTE9IjEwMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMWNkOThlO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMxNmE2NzM7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KCiAgPHBhdGggZD0iTTI1MS44ODYgMjMuODQ2NEMyNjMuNzc4IDIuOTc2NDkgMjkzLjg2MyAyLjk3NjUyIDMwNS43NTUgMjMuODQ2NUw1MTQuMzgzIDM4OS45ODFDNTI2LjE1OSA0MTAuNjQ3IDUxMS4yMzUgNDM2LjMyOCA0ODcuNDQ5IDQzNi4zMjhINzAuMTkxNEM0Ni40MDU2IDQzNi4zMjggMzEuNDgxMyA0MTAuNjQ3IDQzLjI1NzIgMzg5Ljk4MUwyNTEuODg2IDIzLjg0NjRaIiBmaWxsPSJ1cmwoI2dyYWQxKSIgLz4KICA8cGF0aCBkPSJNNDI2LjI4IDY4LjUwNDVDNDQ4Ljg2NiA2MC4zMTU0IDQ3MS43OCA3OS44MjA5IDQ2Ny4zMDMgMTAzLjQyNUwzODguODA5IDUxNy4yNThDMzg0LjM3NiA1NDAuNjI1IDM1Ni4zNjggNTUwLjUwMyAzMzguMjU4IDUzNS4wODdMMjAuNzY0NSAyNjQuODI3QzIuNjU0IDI0OS40MSA3LjkzMjc5IDIyMC4xODQgMzAuMjkyIDIxMi4wNzdMNDI2LjI4IDY4LjUwNDVaIiBmaWxsPSJ1cmwoI2dyYWQyKSIgLz4KPC9zdmc+Cg=="
      />

      {/* Team Member Picture */}
      <Image
        src={member.picture}
        alt={member.fullName}
        width={240} // Adjust width as necessary
        height={240} // Adjust height as necessary
        unoptimized
        layout="intrinsic"
        className="relative z-10 w-3/4 h-auto mx-auto rounded-lg"
      />
    </div>
    <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 text-center mt-4 ezy__team6-content">
      <h4 className="text-lg font-medium mb-1">{member.fullName}</h4>
      <h6 className="text-sm font-medium opacity-75">{member.designation}</h6>
      <p className="text-sm mt-1">{member.bio}</p>
      <div className="flex justify-center space-x-3 mt-3">
        {member.socialLinks.map((link: any, index: any) => (
          <a
            key={index}
            href={link.href}
            className="text-gray-500 hover:text-gray-900"
          >
            <FontAwesomeIcon icon={link.icon} />
          </a>
        ))}
      </div>
    </div>
  </div>
);

TeamMemberItem.propTypes = {
  member: PropTypes.object.isRequired,
};

const TeamMember6 = () => {
  return (
    <section className="ezy__team6 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
      <div className="container px-4 mx-auto">
        <div className="flex justify-center items-center mb-6 md:mb-12">
          <div className="max-w-lg text-center">
            <h1 className="inline-block mb-5 rounded-[20px] bg-muted px-3 py-1 text-[0.6rem] md:text-[0.8rem] text-primary">
              Our Team
            </h1>
            <h2 className="ezy__team6-heading text-[1.7rem] sm:text-[2rem] md:text-[2.8rem] text-textPrimary font-semibold font-poppins tracking-tighter">
              Meet the Visionaries Behind Panaversity
            </h2>
            <p className="ezy__team6-sub-heading">
              Driven by Passion, Powered by Innovation – Discover the Experts
              Shaping the Future of AI Education
            </p>
          </div>
        </div>

        {/* Executives Section */}
        <div className="mb-12">
          <h3 className="text-[1.7rem] sm:text-[2rem] md:text-[2.5rem] text-primary font-semibold font-poppins tracking-tighter text-start underline decoration-primary">
            Executives
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 justify-center md:justify-start">
            {executives.map((member, i) => (
              <div className="flex justify-center w-full md:w-auto" key={i}>
                <TeamMemberItem member={member} />
              </div>
            ))}
          </div>
        </div>

        {/* Professionals Section */}
        <div className="mb-12">
          <h3 className="text-[1.7rem] sm:text-[2rem] md:text-[2.5rem] text-primary font-semibold font-poppins tracking-tighter text-start underline decoration-primary">
            Professionals
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 justify-center md:justify-start">
            {professionals.map((member, i) => (
              <div className="flex justify-center w-full md:w-auto" key={i}>
                <TeamMemberItem member={member} />
              </div>
            ))}
          </div>
        </div>

        {/* Trainers Section */}
        <div className="mb-12">
          <h3 className="text-[1.7rem] sm:text-[2rem] md:text-[2.5rem] text-primary font-semibold font-poppins tracking-tighter text-start underline decoration-primary">
            Trainers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 justify-center md:justify-start">
            {trainers.map((member, i) => (
              <div className="flex justify-center w-full md:w-auto" key={i}>
                <TeamMemberItem member={member} />
              </div>
            ))}
          </div>
        </div>

        {/* Team Leads Section */}
        <div>
          <h3 className="text-[1.7rem] sm:text-[2rem] md:text-[2.5rem] text-primary font-semibold font-poppins tracking-tighter text-start underline decoration-primary">
            Team Leads
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 justify-center md:justify-start">
            {teamLeads.map((member, i) => (
              <div className="flex justify-center w-full md:w-auto" key={i}>
                <TeamMemberItem member={member} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamMember6;
