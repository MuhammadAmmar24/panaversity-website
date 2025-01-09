import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function WhatsAppIcon() {
  return (
    <Link
      href="https://whatsapp.com/channel/0029VanobNVHbFV2oZLXX125"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 lg:bottom-4 lg:left-4 flex items-center group bg-white/40 text-gray-800 backdrop-blur-md rounded-full shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:pl-3 sm:hover:pl-5 z-50"
    >
      <div className=" text-textPrimary text-xs sm:text-sm font-medium opacity-0 max-w-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:max-w-xs whitespace-nowrap order-1 group-hover:pr-2 sm:group-hover:pr-3 z-30">
        🌟  Stay updated with the latest AI news!
      </div>
      <div className="p-2 sm:p-3 order-2 z-40 bg-accent">
        <FaWhatsapp className="w-5 h-5 sm:w-8 sm:h-8" />
      </div>
    </Link>
  );
}