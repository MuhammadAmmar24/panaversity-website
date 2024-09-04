import {
	faLinkedinIn,
	faGithub,
  } from "@fortawesome/free-brands-svg-icons";
  
  // Merged list of all members
  const allTeamMembers = [
	// Executives
	{
	  picture: "/Zia khan.png",
	  fullName: "Zia Khan",
	  designation: "CEO Panacloud / COO PIAIC",
	  bio: "Driving Pakistan’s tech revolution through PIAIC.",
	  socialLinks: [
		{ icon: faLinkedinIn, href: "https://www.linkedin.com/in/ziaukhan/" },
		{ icon: faGithub, href: "https://github.com/ziaukhan" },
	  ],
	},
	{
	  picture: "/Daniyal.png",
	  fullName: "Daniyal Nagori",
	  designation: "CEO of PIAIC / CEO GIAIC",
	  bio: "Shaping Pakistan’s tech future with AI and Web 3.0 education.",
	  socialLinks: [
		{ icon: faLinkedinIn, href: "https://www.linkedin.com/in/daniyalnagori/" },
		{ icon: faGithub, href: "https://github.com/daniyalnagori" },
	  ],
	},
	{
	  picture: "/Qasim.png",
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
	  picture: "/Azeem.png",
	  fullName: "Ameen Alam",
	  designation: "Multi-Cloud Solutions Architect",
	  bio: "Designing scalable cloud architectures for PIAIC.",
	  socialLinks: [
		{ icon: faLinkedinIn, href: "https://www.linkedin.com/in/ameen-alam/" },
		{ icon: faGithub, href: "https://github.com/Ameen-Alam" },
	  ],
	},
	{
	  picture: "/Imran.png",
	  fullName: "Imran Ali",
	  designation: "Management Head PIAIC / GIAIC",
	  bio: "Specializing in AI-driven software development and training.",
	  socialLinks: [
		{ icon: faLinkedinIn, href: "#" },
		{ icon: faGithub, href: "#" },
	  ],
	},
	// Trainers
	{
	  picture: "/Khubaib.png",
	  fullName: "Muhammad Khubaib",
	  designation: "Trainer PIAIC, Freelancer",
	  bio: "Specializing in AI-driven software development and training.",
	  socialLinks: [
		{ icon: faLinkedinIn, href: "https://www.linkedin.com/in/mk-software-engineer/" },
		{ icon: faGithub, href: "https://github.com/mkdeveloper" },
	  ],
	},
	{
	  picture: "/Junaid.png",
	  fullName: "M. Junaid Shaukat",
	  designation: "Trainer PIAIC, Freelancer",
	  bio: "Expert in full-stack development and MERN stack.",
	  socialLinks: [
		{ icon: faLinkedinIn, href: "https://www.linkedin.com/in/mrjunaid/" },
		{ icon: faGithub, href: "https://github.com/mjunaidca" },
	  ],
	},
	{
	  picture: "/Wania_kazmi.png",
	  fullName: "Wania Kazmi",
	  designation: "Trainer PIAIC, Freelancer",
	  bio: "Modern web developer specializing in JavaScript and Python.",
	  socialLinks: [
		{ icon: faLinkedinIn, href: "https://www.linkedin.com/in/waniakazmi/" },
		{ icon: faGithub, href: "https://github.com/Wania-Kazmi" },
	  ],
	},
	{
	  picture: "/Hamza_syed.png",
	  fullName: "Hamza Syed",
	  designation: "Trainer PIAIC, Freelancer",
	  bio: "Crafting seamless and interactive user experiences.",
	  socialLinks: [
		{ icon: faLinkedinIn, href: "#" },
		{ icon: faGithub, href: "#" },
	  ],
	},
	{
	  picture: "/Usman.png",
	  fullName: "Usman Ashraf",
	  designation: "Trainer PIAIC, Freelancer",
	  bio: "Creating clean, scalable applications with modern technologies.",
	  socialLinks: [
		{ icon: faLinkedinIn, href: "https://www.linkedin.com/in/usman-ashraf-127b70185/" },
		{ icon: faGithub, href: "https://github.com/usmanashrf" },
	  ],
	},
	{
	  picture: "/Ibtisam.png",
	  fullName: "Ibtisam Anwar",
	  designation: "Trainer PIAIC, Freelancer",
	  bio: "Full-stack developer with a focus on MERN stack.",
	  socialLinks: [
		{ icon: faLinkedinIn, href: "https://www.linkedin.com/in/ibtisamanwar32/" },
		{ icon: faGithub, href: "https://github.com/ICODER32" },
	  ],
	},
	{
	  picture: "/Rehan.png",
	  fullName: "Muhammad Rehan ul Haq",
	  designation: "Trainer PIAIC, Freelancer",
	  bio: "Mentoring aspiring developers in modern web technologies.",
	  socialLinks: [
		{ icon: faLinkedinIn, href: "https://www.linkedin.com/in/muhammad-rehan-ul-haq-b60a4b2a/" },
		{ icon: faGithub, href: "https://github.com/Em-Aar" },
	  ],
	},
	{
	  picture: "/Jahanzeb.png",
	  fullName: "Jahanzaib Tayyab",
	  designation: "Trainer PIAIC, Freelancer",
	  bio: "Specializing in MERN stack and modern web development.",
	  socialLinks: [
		{ icon: faLinkedinIn, href: "https://www.linkedin.com/in/jahanzaib-tayyab/" },
		{ icon: faGithub, href: "https://github.com/JahanzaibTayyab" },
	  ],
	},
	{
	  picture: "/Girl_avatar.png",
	  fullName: "Mubarra Naz",
	  designation: "Trainer PIAIC, Freelancer",
	  bio: "Building seamless web applications with React and Next.js.",
	  socialLinks: [
		{ icon: faLinkedinIn, href: "https://www.linkedin.com/in/mubarra-naz/" },
		{ icon: faGithub, href: "https://github.com/Mubarra-naz" },
	  ],
	},
	{
	  picture: "/Hassan_ali_khan.png",
	  fullName: "Hassan Ali Khan",
	  designation: "Trainer PIAIC, Freelancer",
	  bio: "Crafting seamless and interactive user experiences.",
	  socialLinks: [
		{ icon: faLinkedinIn, href: "https://www.linkedin.com/in/hassanak92/" },
		{ icon: faGithub, href: "https://github.com/hassan-ak" },
	  ],
	},
	{
	  picture: "/Zeeshan_aziz.png",
	  fullName: "Zeeshan Aziz",
	  designation: "Trainer PIAIC, Freelancer",
	  bio: "Focusing on web development and blockchain technologies.",
	  socialLinks: [
		{ icon: faLinkedinIn, href: "https://www.linkedin.com/in/zeeshanazizz/" },
		{ icon: faGithub, href: "https://github.com/zeeshan080" },
	  ],
	},
	// Team Leads
	{
	  picture: "/Sajid_khan.png",
	  fullName: "Sajid Khan",
	  designation: "Team Lead",
	  bio: "Crafting seamless and interactive user experiences.",
	  socialLinks: [
		{ icon: faLinkedinIn, href: "#" },
		{ icon: faGithub, href: "#" },
	  ],
	},
	{
	  picture: "/Girl_avatar.png",
	  fullName: "Humera Aslam",
	  designation: "Team Lead",
	  bio: "Building seamless web applications with React and Next.js.",
	  socialLinks: [
		{ icon: faLinkedinIn, href: "https://www.linkedin.com/in/humera-aslam/" },
		{ icon: faGithub, href: "#" },
	  ],
	},
	{
	  picture: "/Girl_avatar.png",
	  fullName: "Ayesha Nazish",
	  designation: "Team Lead",
	  bio: "Building seamless web applications with React and Next.js.",
	  socialLinks: [
		{ icon: faLinkedinIn, href: "https://www.linkedin.com/in/ayesha-nazish-hussain-gen-ai/" },
		{ icon: faGithub, href: "#" },
	  ],
	},
	{
	  picture: "/Girl_avatar.png",
	  fullName: "Bushra Hussain",
	  designation: "Team Lead",
	  bio: "Building seamless web applications with React and Next.js.",
	  socialLinks: [
		{ icon: faLinkedinIn, href: "#" },
		{ icon: faGithub, href: "#" },
	  ],
	},
  ];
  
  export { allTeamMembers };
  