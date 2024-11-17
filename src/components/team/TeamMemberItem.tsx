import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SocialLink, TeamMember } from "../../types/team";

const TeamMemberItem = ({
  member,
  priority,
}: {
  member: TeamMember;
  priority?: boolean;
}) => (
  <div className="w-[280px]">
    <div className="relative flex justify-center items-center">
      <Image
        alt="picbg"
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full object-cover"
        src="/team/picbg.svg"
        width={500}
        height={500}
        priority={priority}
      />
      <Image
        src={member.picture}
        alt={member.fullName}
        width={500}
        height={500}
        priority={priority}
        className="relative z-10 w-4/5 h-auto rounded-lg "
      />
    </div>
    <div className="flex flex-col justify-between bg-background  shadow-xl rounded-xl p-4 text-center min-h-[180px] overflow-y-hidden">
      <div className="">
        <h2 className="text-lg font-medium leading-6">{member.fullName}</h2>
        <h3 className="text-sm font-medium opacity-75 leading-4">
          {member.designation}
        </h3>
      </div>

      <p className="text-sm leading-4">{member.bio}</p>
      <div className="flex justify-center items-center space-x-3">
        {member.socialLinks.map((link: SocialLink, index: number) => (
          <Link
            key={index}
            href={link.href}
            aria-label="Social Link of team member"
            target="_blank"
            className="text-gray-500 hover:text-gray-900"
          >
            {link.icon === "linkedin" && <FaLinkedin />}
            {link.icon === "github" && <FaGithub />}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default TeamMemberItem;
