import Image from "next/image";
import Link from "next/link";
import { Facebook, X, Instagram, Linkedin } from "lucide-react";

export default function Component() {
  return (
    <footer className="bg-[#000033] text-white py-5 relative overflow-hidden">
      <div className="container flex flex-col items-center justify-start md:justify-center md:mx-auto  px-4 relative z-10">
        <div className="grid gap-8 md:grid-cols-4 mt-5 md:justify-items-center md:item-center items-start">
          {/* Company Info */}
          <div className="space-y-4 sm:-mt-10">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/Green Panaverse-03.png"
                alt=""
                width={120}
                height={50}
              />
            </Link>
            <p className="text-sm text-gray-300">
              Panaversity is an AI-powered online university offering
              cutting-edge Generative AI and Cloud Native Computing education.
              Gain real-world skills and certifications to advance your career.
              Master tomorrow’s tech today with Panaversity.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <X size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* BLOGs */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold">Blogs</h3>
            <div className="grid grid-cols-2 gap-2 mt-8 pr-4">
              {[
                { src: "/images (1).jpeg", alt: "Work 1" },
                { src: "/images (1).jpeg", alt: "Work 2" },
                { src: "/images (1).jpeg", alt: "Work 3" },
                { src: "/images (1).jpeg", alt: "Work 4" },
              ].map((work, i) => (
                <div key={i} className="bg-blue-900 rounded-lg overflow-hidden">
                  <Image
                    src={work.src}
                    alt={work.alt}
                    width={140}
                    height={100}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold">Useful Links</h3>
            <ul className="space-y-2 mt-5">
              {["Home", "About us", "Our Team", "Our Courses", "Career"].map(
                (link, i) => (
                  <li key={i}>
                    <Link
                      href="#"
                      className="text-gray-300 hover:text-white text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2 mt-5">
              <p className="text-sm">
                <span className="text-blue-400">Office Location</span>
                <br />
                124, Queens walk 2nd cross Denmark
              </p>
              <p className="text-sm">
                <span className="text-blue-400">Phone No.</span>
                <br />
                +00-888-27-240
              </p>
              <p className="text-sm">
                <span className="text-blue-400">Email Address</span>
                <br />
                support@info.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-4 border-t border-gray-700 flex flex-wrap justify-between items-center">
          <p className="text-sm text-gray-400">
            Copyright © Panaversity, All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
