import React from "react";
import FooterColumn from "./ui/FooterColumn";
import Newsletter from "./ui/Newsletter";
import Image from "next/image";
import Logo from "../../public/logos/logo2.png"; 


const Footer: React.FC = () => {
  return (
    <footer className="bg-[#031811] text-white pt-[2.1rem]">
      <div className="min-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 min-w-7xl max-w-7xl lg:mx-44 items-center md:grid-cols-6 gap-8">
          {/* Left section: Logo & Newsletter */}
          <div className="md:col-span-2 col-span-2">
            <div className="mb-6">
              {/* Logo */}
              <Image
                src={Logo}
                alt="Power AI Logo"
                className="h-20 w-auto mb-2 l transition-transform duration-300 ease-in-out hover:scale-105"
              />
              <p className="text-sm text-gray-400 mt-1 ml-1 leading-relaxed">
                Panaversity is a cloud-native platform offering <br />
                personalized learning through generative AI.
              </p>
            </div>
            <div className="max-w-80">
              <Newsletter />
            </div>{" "}
            {/* Call to Newsletter component */}
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
            className="order-2 lg:mt-7 md:mt-7 w-full md:order-2 lg:ml-20"
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
            className="order-3 lg:mt-7 md:mt-7 md:order-3 lg:ml-20 w-full "
          />
          <FooterColumn
            title="Product"
            links={[
              { name: "Recent", href: "#" },
              { name: "Upcoming", href: "#" },
              { name: "Builder", href: "#" },
              { name: "On Sale", href: "#" },
              { name: "Live Demo", href: "#" },
            ]}
            className="order-4 lg:mt-7 md:mt-3 md:order-4 lg:ml-20"
          />
          <FooterColumn
            title="Follow Us"
            links={[
              { name: "Instagram", href: "#" },
              { name: "Telegram", href: "#" },
              { name: "Facebook", href: "#" },
              { name: "Dribbble", href: "#" },
              { name: "LinkedIn", href: "#" },
            ]}
            className="order-5 lg:mt-7 md:mt-3 md:order-5 lg:ml-20"
          />
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
