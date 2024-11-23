import Image from "next/image";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaDiscord, FaFacebook, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../../../public/logos/logo2.webp";
import Newsletter from "../ui/Newsletter";
import FooterColumn from "./FooterColumn";
import Link from "next/link";

const socialIcons = [
  {
    icon: FaFacebook,
    name: "Facebook",
    link: "https://facebook.com/panaversity/",
  },
  // { icon: FaDiscord, name: "Discord", link: "/" },
  { icon: FaXTwitter, 
    name: "Twitter", 
    link: "https://x.com/panaversity" },
  // { icon: BiLogoInstagramAlt, name: "Instagram", link: "/" },
  {
    icon: FaLinkedinIn,
    name: "LinkedIn",
    link: "https://www.linkedin.com/company/panaversity/",
  },
  {
    icon: FaWhatsapp,
    name: "Whatsapp",
    link: "https://whatsapp.com/channel/0029VanobNVHbFV2oZLXX125",
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#031811] pt-[4.5rem] text-white">
      <div className="flex w-full justify-center">
        <div className="mx-6 grid grid-cols-1 items-start gap-8 sm:grid-cols-2 md:mx-16 lg:max-w-[950px] lg:grid-cols-4 xl:max-w-6xl">
          {/* Left section: Logo & Newsletter */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <div className="mb-6 lg:-mt-9 xl:-mt-4">
              {/* Logo */}
              <Image
                src={Logo}
                alt="Panaversity logo"
                className="mb-2 h-20 w-auto"
              />
              <p className="mb-1 mt-1 text-sm leading-relaxed text-gray-400">
                Panaversity is a cloud-native platform offering personalized
                learning through generative AI.
              </p>
              <div className="flex gap-4 py-2">
                {socialIcons.map(({ icon: Icon, name, link }, index) => (
                  <Link
                    href={link}
                    key={index}
                    target="_blank"
                    aria-label={name}
                  >
                    <Icon className="h-[1.5rem] w-[1.5rem] cursor-pointer text-gray-200 transition-all duration-150 hover:text-green-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column Sections */}
          <FooterColumn
            title="Company"
            links={[
              { name: "About Us", href: "/#about" },
              { name: "Programs", href: "/programs/flagship-program" },
              { name: "Testimonials", href: "/#testimonials" },
            ]}
            className="lg:ml-20"
          />

          <FooterColumn
            title="Support"
            links={[
              { name: "Contact Us", href: "/contact" },
              { name: "Privacy Policy", href: "/privacy-policy" },
              { name: "FAQs", href: "/#faqs" },
            ]}
            className="lg:ml-20"
          />

          {/* Newsletter section placed in the rightmost column */}
          <div className="col-span-2 mt-8 w-full text-sm sm:col-span-2 md:col-span-1 md:mt-0">
            <Newsletter />
          </div>
        </div>
      </div>

      {/* Bottom copyright section */}
      <div className="mt-14 flex h-16 items-center justify-center bg-[#041F16] text-center text-sm text-gray-400">
        © Copyright 2024 Panaversity, Inc.
      </div>
    </footer>
  );
};

export default Footer;
