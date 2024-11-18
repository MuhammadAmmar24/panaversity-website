import { BreadcrumbProps } from "@/src/types/breadCrumbs";
import { ChevronRight } from "lucide-react"; // Assuming this is your ChevronRight component
import Link from "next/link";
import React from "react";

const Breadcrumbs: React.FC<BreadcrumbProps> = ({
  items,
  separator = <ChevronRight className="mx-1 h-4 w-4" />,
}) => {
  return (
    <nav className="my-4">
      <ol className="flex flex-wrap items-center space-x-[1px] text-xs font-medium text-white sm:text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link
                href={item.href}
                aria-label={`${item.label}`}
                className="hover:underline"
              >
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
