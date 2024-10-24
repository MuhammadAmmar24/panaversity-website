import { BreadcrumbProps } from "@/src/types/breadCrumbs";
import { ChevronRight } from "lucide-react"; // Assuming this is your ChevronRight component
import Link from "next/link";
import React from "react";

const Breadcrumbs: React.FC<BreadcrumbProps> = ({
  items,
  separator = <ChevronRight className="w-4 h-4 mx-1" />,
}) => {
  return (
    <nav className="my-4">
      <ol className="flex flex-wrap items-center space-x-[1px] text-xs sm:text-sm font-medium text-white">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
            {/* Render separator only if it's not the last item */}
            {index < items.length - 1 && separator}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
