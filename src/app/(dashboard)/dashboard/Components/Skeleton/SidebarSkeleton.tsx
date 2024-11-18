import { CiLogout } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { IoIosArrowRoundForward, IoIosHelpCircleOutline } from "react-icons/io";
import { IoLibraryOutline } from "react-icons/io5";
import { SlBookOpen } from "react-icons/sl";

const Sidebar = () => {
  const menuItems = [
    { icon: GoHome, href: "/dashboard" },
    { icon: SlBookOpen, href: "#" },
    { icon: IoLibraryOutline, href: "#" },
  ];

  const menuItemsBottom = [
    { icon: IoIosHelpCircleOutline, href: "#" },
    { icon: CiLogout, href: "#" },
  ];

  return (
    <aside className="relative flex h-screen animate-pulse">
      <div className="fixed z-40 flex h-full w-16 flex-col bg-gray-200 text-gray-700 shadow-2xl">
        <div className="mt-5 p-4">
          <IoIosArrowRoundForward className="ml-1 text-2xl text-gray-700" />
        </div>
        <nav className="mt-14 flex-1 px-5">
          {menuItems.map(({ icon: Icon, href }) => (
            <div key={href} className="block py-5">
              <Icon className="text-2xl" />
            </div>
          ))}
        </nav>
        <div className="mb-4 px-5">
          {menuItemsBottom.map(({ icon: Icon, href }) => (
            <div key={href} className="block py-4">
              <Icon className="text-2xl" />
            </div>
          ))}
        </div>
      </div>
      <main className="flex-1 p-6">{/* Placeholder for main content */}</main>
    </aside>
  );
};

export default Sidebar;
