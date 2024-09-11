"use client";
import React, { useState, useCallback, memo, lazy, Suspense } from "react";
import Image from "next/image";
import { allTeamMembers } from "@/constants/teams";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

// Correctly lazy load FontAwesomeIcon
const FontAwesomeIcon = lazy(() => import('@fortawesome/react-fontawesome').then(mod => ({ default: mod.FontAwesomeIcon })));

type SocialLink = {
  href: string;
  icon: FontAwesomeIconProps['icon'];
};

type TeamMember = {
  picture: string;
  fullName: string;
  designation: string;
  bio: string;
  socialLinks: SocialLink[];
};

const SocialLinks = memo(({ links }: { links: SocialLink[] }) => (
  <div className="flex justify-center items-center space-x-3 mt-3">
    <Suspense fallback={<div>Loading...</div>}>
      {links.map((link: SocialLink, index: number) => (
        <a key={index} href={link.href} className="text-gray-500 hover:text-gray-900">
          <FontAwesomeIcon icon={link.icon} />
        </a>
      ))}
    </Suspense>
  </div>
));

SocialLinks.displayName = 'SocialLinks';

const TeamMemberItem = memo(({ member }: { member: TeamMember }) => (
  <div className="w-full sm:w-[280px] mt-5">
    <div className="relative flex justify-center items-center">
      <Image
        alt="picbg"
        src="/team/picbg.svg"
        width={280}
        height={280}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-auto"
      />
      <Image
        src={member.picture}
        alt={member.fullName}
        width={224}
        height={224}
        className="relative z-10 w-4/5 h-auto rounded-lg"
        loading="lazy"
      />
    </div>

    <div className="bg-background dark:bg-slate-800 shadow-xl rounded-xl p-4 text-center mt-4 h-[180px] overflow-y-hidden">
      <h4 className="text-lg font-medium mb-1">{member.fullName}</h4>
      <h6 className="text-sm font-medium opacity-75">{member.designation}</h6>
      <p className="text-sm mt-1">{member.bio}</p>
      <SocialLinks links={member.socialLinks} />
    </div>
  </div>
));

TeamMemberItem.displayName = 'TeamMemberItem';

const TeamMember = () => {
  const [visibleMembers, setVisibleMembers] = useState(9);

  const handleLoadMore = useCallback(() => {
    setVisibleMembers((prev) => prev + 9);
  }, []);

  return (
    <section className="bg-background dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-x-hidden">
      <div className="w-full mb-32">
        <div className="flex justify-center items-center bg-teamBg bg-cover">
          <div className="text-center w-full backdrop-brightness-75 backdrop-opacity-100 bg-blur-[1px] py-16 sm:py-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-background font-bold font-poppins tracking-tighter" style={{ wordSpacing: '0.2em' }}>
              Meet The Visionaries Behind 
              <br />
              Panaversity
            </h2>
            <p className="text-background/60 mb-2 px-4 mt-4 text-sm sm:text-base">
              Discover the Experts Shaping the Future of AI Education
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTeamMembers.slice(0, visibleMembers).map((member: TeamMember, i: number) => (
              <TeamMemberItem key={i} member={member} />
            ))}
          </div>
        </div>

        {visibleMembers < allTeamMembers.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="bg-accent text-white px-6 py-2 rounded hover:bg-accent/90 transition-colors"
              aria-label="Load more team members"
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