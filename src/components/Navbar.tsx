// "use client";
// import Link from 'next/link';
// import { useState } from "react";
// import { Dialog, DialogPanel } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";


// export default function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <>
//       <header className="absolute inset-x-0 top-4 z-50 ">
//         <nav
//           aria-label="Global"
//           className="flex items-center justify-between p-[1rem] mx-4  lg:px-8"
//         >
//           <div className="flex lg:flex-1">
//             <a href="/" className="-m-1.5 p-1.5 cursor-pointer mt-[-1.7rem]">
//               <img alt="" src={"logo.png"} className="h-[6rem] w-auto   " />
//             </a>
//           </div>
//           <div className="flex lg:hidden ">
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(true)}
//               className="-m-2.5 inline-flex items-center justify-center rounded-[40px] p-2.5 text-gray-700"
//             >
//               <span className="sr-only">Open main menu</span>
//               <Bars3Icon aria-hidden="true" className="h-6 w-6" />
//             </button>
//           </div>
//           <div className="hidden lg:flex lg:gap-x-12 mt-[1.2rem]">
//             {nav.map((item: any) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className="text-0.9rem  hover:text-accent transition-all duration-400 ease-in-out font-poppins font-semibold leading-6 text-textPrimary"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//           <div className="hidden lg:flex lg:flex-1 lg:justify-end mt-[1.2rem]">
//             <a
//               href="#_"
//               className="relative  items-center justify-start inline-block p3x-5 py- overflow-hidden font-bold rounded-full group"
//             >
//               <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-accent opacity-[3%]"></span>
//               <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-accent opacity-100 group-hover:-translate-x-8"></span>
//               <span className="relative w-full text-left text-textPrimary transition-colors duration-200 ease-in-out group-hover:text-textPrimary font-poppins font-semibold">
//                 Enroll Now
//               </span>
//               <span className="absolute inset-0 border-2 border-accent rounded-full"></span>
//             </a>
//           </div>
//         </nav>
//         <Dialog
//           open={mobileMenuOpen}
//           onClose={setMobileMenuOpen}
//           className="lg:hidden"
//         >
//           <div className="fixed  inset-0 z-50" />
//           <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transition-all duration-500 ease-in-out">
//             <div className="flex items-center justify-between">
//               <a href="#" className="-m-1.5 p-1.5 mt-[-1.7rem]" >
//                 <span className="sr-only">Panaversity</span>
//                 <img alt="" src={"logo.png"} className="h-[6rem] w-auto" />
//               </a>
//               <button
//                 type="button"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="-m-2.5 rounded-md p-2.5 text-gray-700"
//               >
//                 <span className="sr-only">Close menu</span>
//                 <XMarkIcon aria-hidden="true" className="h-6 w-6" />
//               </button>
//             </div>
//             <div className="mt-6 flow-root transition-all duration-500 ease-in-out">
//               <div className="-my-6 divide-y divide-gray-500/10">
//                 <div className="space-y-2 py-6">
//                   {nav.map((item: any) => (
//                     <a
//                       key={item.name}
//                       href={item.href}
//                       className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:text-accent transition-all duration-400 ease-in-out  font-poppins  text-textPrimary "
//                     >
//                       {item.name}
//                     </a>
//                   ))}
//                 </div>
//                 <div className="py-6">
//                 <a
//               href="#_"
//               className="relative  items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group"
//             >
//               <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-accent opacity-[3%]"></span>
//               <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-accent opacity-100 group-hover:-translate-x-8"></span>
//               <span className="relative w-full text-left text-textPrimary transition-colors duration-200 ease-in-out group-hover:text-textPrimary font-poppins font-semibold">
//                 Enroll Now
//               </span>
//               <span className="absolute inset-0 border-2 border-accent rounded-full"></span>
//             </a>
//                 </div>
//               </div>
//             </div>
//           </DialogPanel>
//         </Dialog>
//       </header>
//     </>
//   );
// }



"use client";
import React from "react";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react";
import { nav } from "@/constants/nav"; // Import the nav data from the nav.ts file


export default function Navbarr() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname(); // Get the current pathname

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className=" py-4  xl:py-4 ">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
        <a href="/" className=" cursor-pointer ">
              <img alt="" src={"/logos/logo.png"} className="h-[5rem] sm:h-[3rem] md:h-[4rem] lg:h-[4.5rem]  w-auto   " />
             </a>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 md:gap-8 mt-4 " justify="center">
        {nav.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              color={pathname === item.href ? "primary" : "foreground"}
              href={item.href}
              className={`text-[0.8rem] lg:text-[0.89rem] font-semibold font-poppins  hover:text-accent transition-all duration-400 ease-in-out`}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <a
            href="#_"
            className="relative items-center justify-start inline-block px-3 py-2 md:px-4 lg:px-5 lg:py-3  mt-4    overflow-hidden font-bold rounded-full group"
          >
            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-accent opacity-[3%]"></span>
            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-accent opacity-100 group-hover:-translate-x-8"></span>
            <span className="relative w-full text-left text-[0.8rem] lg:text-[0.9rem] text-textPrimary transition-colors duration-200 ease-in-out group-hover:text-textPrimary font-poppins font-semibold">
              Enroll Now
            </span>
            <span className="absolute inset-0 border-2 border-accent rounded-full"></span>
          </a>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="pt-[5rem]">
        {nav.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link
              color={pathname === item.href ? "primary" : "foreground"}
              className="w-full text-lg font-poppins font-medium hover:text-accent transition-all duration-400 ease-in-out "
              href={item.href}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
