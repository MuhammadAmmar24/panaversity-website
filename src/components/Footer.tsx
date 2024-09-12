import React from "react";
import FooterColumn from "./ui/FooterColumn";
import Newsletter from "./ui/Newsletter";
import Image from "next/image";
import Logo from "../../public/logos/logo2.png";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#031811] text-white pt-[2.1rem]">
      <div className=" flex w-full justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-6 md:mx-16 lg:max-w-[950px] xl:max-w-6xl items-start gap-8">
          {/* Left section: Logo & Newsletter */}
          <div className="">
            <div className="mb-6">
              {/* Logo */}
              <Image
                src={Logo}
                alt="Power AI Logo"
                className="h-20 w-auto mb-2 transition-transform duration-300 ease-in-out hover:scale-105"
              />
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Panaversity is a cloud-native platform offering personalized
                learning through generative AI.
              </p>
              <div className="flex gap-4 py-2">
                <FaFacebook className="w-[1.5rem] h-[1.5rem] cursor-pointer hover:text-green-400 transition-all duration-150" />
                <FaDiscord className="w-[1.5rem] h-[1.5rem] cursor-pointer hover:text-green-400 transition-all duration-150" />
                <FaTwitter className="w-[1.5rem] h-[1.5rem] cursor-pointer hover:text-green-400 transition-all duration-150" />
                <BiLogoInstagramAlt className="w-[1.5rem] h-[1.5rem] cursor-pointer hover:text-green-400 transition-all duration-150" />
                <FaLinkedinIn className="w-[1.5rem] h-[1.5rem] cursor-pointer hover:text-green-400 transition-all duration-150" />
              </div>
            </div>
          </div>

          {/* Column Sections */}
          <FooterColumn
            title="Company"
            links={[
              { name: "About Us", href: "#" },
              { name: "Our Mission", href: "#" },
              { name: "Company History", href: "#" },
              { name: "Testimonials", href: "#" },
              { name: "Careers", href: "#" },
            ]}
            className="lg:ml-20"
          />

          <FooterColumn
            title="Support"
            links={[
              { name: "Contact Us", href: "#" },
              { name: "Privacy Policy", href: "#" },
              { name: "Terms Conditions", href: "#" },
              { name: "Cookies", href: "#" },
              { name: "FAQ", href: "#" },
            ]}
            className="lg:ml-20"
          />

          {/* Newsletter section placed in the rightmost column */}
          <div className=" w-full">
            <Newsletter />
          </div>
        </div>
      </div>

      {/* Bottom copyright section */}
      <div className="bg-[#041F16] mt-14 h-16 text-center flex items-center justify-center text-sm text-gray-400">
        © Copyright 2024 Panaversity, Inc.
      </div>
    </footer>
  );
};

export default Footer;