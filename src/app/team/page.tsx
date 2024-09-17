
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
      <Image
        alt="picbg"
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full object-cover"
        src="/team/picbg.svg"
        width={500}
        height={500}
/>
      <Image
        src={member.picture}
        alt={member.fullName}
        width={500}
        height={500}
        priority
        className="relative z-10 w-4/5 h-auto rounded-lg "
      />
    </div>

    <div className="bg-background dark:bg-slate-800 shadow-xl rounded-xl p-4 text-center mt-4 h-[180px] overflow-y-hidden">
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
    <section className=" light bg-background dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-x-hidden">
      <div className="w-full mb-32">
        {/* Header */}
        <div className="flex justify-center items-center bg-teamBg bg-cover">
          <div className="text-center w-full backdrop-brightness-75 backdrop-opacity-100 bg-blur-[1px] py-[7rem]">
            <h2 className="text-[1.8rem] sm:text-[2rem] md:text-[3.6rem] text-background font-bold font-poppins tracking-tighter"style={{ wordSpacing: '0.2em' }}>
              Meet The Visionaries Behind 
              <br />
              Panaversity
            </h2>
            <p className="text-background/60 mb-2 px-4 mt-4">
              Discover the Experts Shaping the Future of AI Education
            </p>
          </div>
        </div>

        {/* Team Members */}
        <div className="container mx-auto px-4 sm:px-6 md:px-7 lg:px-1 xl:px-32 mt-8 ">
          <div className="flex flex-wrap justify-center -mx-4 ">
            {allTeamMembers.slice(0, visibleMembers).map((member: TeamMember, i: number) => (
              <div key={i} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8 flex justify-center ">
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