import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";

// Merged list of all members
const allTeamMembers = [
  // Executives
  {
    picture: "/team/Zia khan.webp",
    fullName: "Zia Khan",
    designation: "CEO Panacloud / COO PIAIC",
    bio: "Driving Pakistan’s tech revolution through PIAIC.",
    socialLinks: [
      { icon: faLinkedinIn, href: "https://www.linkedin.com/in/ziaukhan/" },
      { icon: faGithub, href: "https://github.com/ziaukhan" },
    ],
  },
  {
    picture: "/team/Daniyal.webp",
    fullName: "Daniyal Nagori",
    designation: "CEO of PIAIC / CEO GIAIC",
    bio: "Shaping Pakistan’s tech future with AI and Web 3.0 education.",
    socialLinks: [
      {
        icon: faLinkedinIn,
        href: "https://www.linkedin.com/in/daniyalnagori/",
      },
      { icon: faGithub, href: "https://github.com/daniyalnagori" },
    ],
  },
  {
    picture: "/team/Qasim.webp",
    fullName: "Muhammad Qasim",
    designation: "Chief Gen AI Officer at PIAIC & GIAIC",
    bio: "Pioneering Generative AI in Pakistan’s tech landscape.",
    socialLinks: [
      { icon: faLinkedinIn, href: "https://www.linkedin.com/in/sirqasim/" },
      { icon: faGithub, href: "https://github.com/EnggQasim" },
    ],
  },
  // Professionals
  {
    picture: "/team/Imran.webp",
    fullName: "Imran Ali",
    designation: "Management Head PIAIC / GIAIC",
    bio: "Specializing in AI software development and training.",
    socialLinks: [
      { icon: faLinkedinIn, href: "#" },
      { icon: faGithub, href: "#" },
    ],
  },
  {
    picture: "/team/Azeem.webp",
    fullName: "Ameen Alam",
    designation: "Multi-Cloud Solutions Architect",
    bio: "Designing scalable cloud native architectures for PIAIC and GIAIC.",
    socialLinks: [
      { icon: faLinkedinIn, href: "https://www.linkedin.com/in/ameen-alam/" },
      { icon: faGithub, href: "https://github.com/Ameen-Alam" },
    ],
  },

  // Trainers
  {
    picture: "/team/Junaid.webp",
    fullName: "M. Junaid Shaukat",
    designation: "Trainer PIAIC, Freelancer",
    bio: "Expert in full-stack development and MERN stack.",
    socialLinks: [
      { icon: faLinkedinIn, href: "https://www.linkedin.com/in/mrjunaid/" },
      { icon: faGithub, href: "https://github.com/mjunaidca" },
    ],
  },
  {
    picture: "/team/Wania_kazmi.webp",
    fullName: "Wania Kazmi",
    designation: "Trainer PIAIC, Freelancer",
    bio: "Modern web developer specializing in JavaScript and Python.",
    socialLinks: [
      { icon: faLinkedinIn, href: "https://www.linkedin.com/in/waniakazmi/" },
      { icon: faGithub, href: "https://github.com/Wania-Kazmi" },
    ],
  },

  {
    picture: "/team/Usman.webp",
    fullName: "Usman Ashraf",
    designation: "Trainer PIAIC, Freelancer",
    bio: "Creating clean, scalable applications with modern technologies.",
    socialLinks: [
      {
        icon: faLinkedinIn,
        href: "https://www.linkedin.com/in/usman-ashraf-127b70185/",
      },
      { icon: faGithub, href: "https://github.com/usmanashrf" },
    ],
  },
  {
    picture: "/team/Khubaib.webp",
    fullName: "Muhammad Khubaib",
    designation: "Trainer PIAIC, Freelancer",
    bio: "Specializing in AI-driven software development and training.",
    socialLinks: [
      {
        icon: faLinkedinIn,
        href: "https://www.linkedin.com/in/mk-software-engineer/",
      },
      { icon: faGithub, href: "https://github.com/mkdeveloper" },
    ],
  },
  {
    picture: "/team/Jahanzeb.webp",
    fullName: "Jahanzaib Tayyab",
    designation: "Trainer PIAIC, Freelancer",
    bio: "Specializing in MERN stack and modern web development.",
    socialLinks: [
      {
        icon: faLinkedinIn,
        href: "https://www.linkedin.com/in/jahanzaib-tayyab/",
      },
      { icon: faGithub, href: "https://github.com/JahanzaibTayyab" },
    ],
  },
  {
    picture: "/team/Ibtisam.webp",
    fullName: "Ibtisam Anwar",
    designation: "Trainer PIAIC, Freelancer",
    bio: "Full-stack developer with a focus on MERN stack.",
    socialLinks: [
      {
        icon: faLinkedinIn,
        href: "https://www.linkedin.com/in/ibtisamanwar32/",
      },
      { icon: faGithub, href: "https://github.com/ICODER32" },
    ],
  },
  {
    picture: "/team/Rehan.webp",
    fullName: "M. Rehan ul Haq",
    designation: "Trainer PIAIC, Freelancer",
    bio: "Mentoring aspiring developers in modern web technologies.",
    socialLinks: [
      {
        icon: faLinkedinIn,
        href: "https://www.linkedin.com/in/muhammad-rehan-ul-haq-b60a4b2a/",
      },
      { icon: faGithub, href: "https://github.com/Em-Aar" },
    ],
  },
  {
    picture: "/team/Sajid_khan.webp",
    fullName: "Sajid Khan",
    designation: "Team Lead",
    bio: "Crafting seamless and interactive user experiences.",
    socialLinks: [
      { icon: faLinkedinIn, href: "#" },
      { icon: faGithub, href: "#" },
    ],
  },

  {
    picture: "/team/Zeeshan_aziz.webp",
    fullName: "Zeeshan Aziz",
    designation: "Trainer PIAIC, Freelancer",
    bio: "Focusing on web development and blockchain technologies.",
    socialLinks: [
      { icon: faLinkedinIn, href: "https://www.linkedin.com/in/zeeshanazizz/" },
      { icon: faGithub, href: "https://github.com/zeeshan080" },
    ],
  },
  {
    picture: "/team/Girl_avatar.webp",
    fullName: "Bushra Hussain",
    designation: "Team Lead",
    bio: "Building seamless web applications with Next.js.",
    socialLinks: [
      { icon: faLinkedinIn, href: "#" },
      { icon: faGithub, href: "#" },
    ],
  },


  {
    picture: "/team/Hamza_syed.webp",
    fullName: "Hamza Syed",
    designation: "Trainer PIAIC, Freelancer",
    bio: "Crafting seamless and interactive user experiences with Nextjs.",
    socialLinks: [
      { icon: faLinkedinIn, href: "#" },
      { icon: faGithub, href: "#" },
    ],
  },

  {
    picture: "/team/Girl_avatar.webp",
    fullName: "Mubarra Naz",
    designation: "Trainer PIAIC, Freelancer",
    bio: "Building seamless web applications with React.",
    socialLinks: [
      { icon: faLinkedinIn, href: "https://www.linkedin.com/in/mubarra-naz/" },
      { icon: faGithub, href: "https://github.com/Mubarra-naz" },
    ],
  },
  {
    picture: "/team/Hassan_ali_khan.webp",
    fullName: "Hassan Ali Khan",
    designation: "Trainer PIAIC, Freelancer",
    bio: "Crafting seamless and interactive user experiences.",
    socialLinks: [
      { icon: faLinkedinIn, href: "https://www.linkedin.com/in/hassanak92/" },
      { icon: faGithub, href: "https://github.com/hassan-ak" },
    ],
  },

  // Team Leads

  {
    picture: "/team/Girl_avatar.webp",
    fullName: "Humera Aslam",
    designation: "Team Lead",
    bio: "Building seamless web applications with React.",
    socialLinks: [
      { icon: faLinkedinIn, href: "https://www.linkedin.com/in/humera-aslam/" },
      { icon: faGithub, href: "#" },
    ],
  },
  {
    picture: "/team/Girl_avatar.webp",
    fullName: "Ayesha Nazish",
    designation: "Team Lead",
    bio: "Building seamless web applications with React.",
    socialLinks: [
      {
        icon: faLinkedinIn,
        href: "https://www.linkedin.com/in/ayesha-nazish-hussain-gen-ai/",
      },
      { icon: faGithub, href: "#" },
    ],
  },
  {
    picture: "/team/Girl_avatar.webp",
    fullName: "Aiman Zaidi",
    designation: "UI/UX designer",
    bio: "Design mobile and web applications with a strong focus on user experience.",
    socialLinks: [
      {
        icon: faLinkedinIn,
        href: "https://www.linkedin.com/in/aiman-zaidi999/",
      },
      { icon: faGithub, href: "https://github.com/aimanzaidi110" },
    ],
  },{
    picture: "/team/Ammar.webp",
    fullName: "Muhammad Ammar Masood",
    designation: "AI Web Developer",
    bio: "Building seamless web applications with React.",
    socialLinks: [
      {
        icon: faLinkedinIn,
        href: "https://www.linkedin.com/in/muhammadammar24/",
      },
      { icon: faGithub, href: "https://github.com/MuhammadAmmar24" },
    ],
  },{
    picture: "/team/Shayan.webp",
    fullName: "Muhammad Shayan Khan",
    designation: "AI Web Developer",
    bio: "Building seamless web applications with React.",
    socialLinks: [
      {
        icon: faLinkedinIn,
        href: "https://www.linkedin.com/in/shayanxkhan/",
      },
      { icon: faGithub, href: "https://github.com/dev-shayan" },
    ],
  },
  {
    picture: "/team/Hasnain.png",
    fullName: "Syed Husnain Khalid",
    designation: "AI Web Developer",
    bio: "Building seamless web applications with React.",
    socialLinks: [
      {
        icon: faLinkedinIn,
        href: "https://www.linkedin.com/in/syed-hussnain/",
      },
      { icon: faGithub, href: "https://github.com/DevHusnainAi" },
    ],
  },

];

export { allTeamMembers };