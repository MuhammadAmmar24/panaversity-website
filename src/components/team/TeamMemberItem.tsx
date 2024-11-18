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
    <div className="relative flex items-center justify-center">
      <Image
        alt="picbg"
        className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 transform object-cover"
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
        className="relative z-10 h-auto w-4/5 rounded-lg"
      />
    </div>
    <div className="flex min-h-[180px] flex-col justify-between overflow-y-hidden rounded-xl bg-background p-4 text-center shadow-xl">
      <div className="">
        <h2 className="text-lg font-medium leading-6">{member.fullName}</h2>
        <h3 className="text-sm font-medium leading-4 opacity-75">
          {member.designation}
        </h3>
      </div>

      <p className="text-sm leading-4">{member.bio}</p>
      <div className="flex items-center justify-center space-x-3">
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
