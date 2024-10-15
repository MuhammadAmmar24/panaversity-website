import { FaHome, FaUsers, FaBookOpen, FaBullhorn } from "react-icons/fa";
import { GrContact } from "react-icons/gr";
import { IconType } from "react-icons/lib";


type NavItem = {
  name: string;
  link: string;
  icon: IconType;
};

export const navItems: NavItem[] = [
  { name: "Home", link: "/", icon: FaHome},
  { name: "Our Team", link: "/team", icon: FaUsers },
  { name: "Programs", link: "/programs/flagship-program", icon: FaBookOpen },
  { name: "Contact Us", link: "/contact", icon: GrContact },
];

