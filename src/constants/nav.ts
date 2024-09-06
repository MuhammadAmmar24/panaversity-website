export interface NavbarProps {
  bg: string;
  navlinks_color: string;
  image_url: string;
}

export const navItems = [
  { name: "Home", link: "/" },
  { name: "Our Team", link: "/team" },
  { name: "Results", link: "/results" },
  { name: "Course Content", link: "/about" },
  { name: "Announcements", link: "/announcements" },
];