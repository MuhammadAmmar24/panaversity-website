
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import Link from "next/link";


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
  export const TeamMemberItem = ({ member }: { member: TeamMember }) => (
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
          blurDataURL="data:..."
          placeholder="blur"
       
  />
        <Image
          src={member.picture}
          alt={member.fullName}
          width={500}
          height={500}
          priority
          className="relative z-10 w-4/5 h-auto rounded-lg "
          blurDataURL="data:..."
          placeholder="blur"
          
        />
      </div>
  
      <div className="bg-background dark:bg-slate-800 shadow-xl rounded-xl p-4 text-center mt-4 h-[180px] overflow-y-hidden">
        <h4 className="text-lg font-medium mb-1">{member.fullName}</h4>
        <h6 className="text-sm font-medium opacity-75">{member.designation}</h6>
        <p className="text-sm mt-1">{member.bio}</p>
  
        {/* Social Links */}
        <div className="flex justify-center items-center space-x-3 mt-3">
          {member.socialLinks.map((link: SocialLink, index: number) => (
           
            <Link key={index} href={link.href} className="text-gray-500 hover:text-gray-900">
              <FontAwesomeIcon icon={link.icon} />
            </Link>
          
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
  