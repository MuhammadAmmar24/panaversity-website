export type SocialLink = {
    href: string;
    icon: any;
  };
  
  export type TeamMember = {
    picture: string;
    fullName: string;
    designation: string;
    bio: string;
    socialLinks: SocialLink[];
  };