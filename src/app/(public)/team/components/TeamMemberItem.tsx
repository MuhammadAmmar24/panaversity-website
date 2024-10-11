import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { TeamMember, SocialLink } from "../../../../types/team";

const TeamMemberItem = ({ member }: { member: TeamMember }) => (
  <div className="w-[280px] mt-5">
    <div className="relative flex justify-center items-center">
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
      <div className="flex justify-center items-center space-x-3 mt-3">
        {member.socialLinks.map((link: SocialLink, index: number) => (
          <Link key={index} href={link.href} target="_blank" className="text-gray-500 hover:text-gray-900">
            <FontAwesomeIcon icon={link.icon} />
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default TeamMemberItem;
