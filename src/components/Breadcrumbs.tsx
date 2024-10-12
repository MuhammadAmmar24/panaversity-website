import Link from 'next/link';
import React from 'react';
import { ChevronRight } from 'lucide-react'; // Assuming this is your ChevronRight component

type BreadcrumbItem = {
  label: string;
  href?: string; // href is optional for the last item (current page)
};

type BreadcrumbProps = {
  items: BreadcrumbItem[]; // Array of breadcrumb items
  separator?: React.ReactNode; // Optional custom separator (default: ChevronRight)
};

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items, separator = <ChevronRight className="w-4 h-4 mx-1" /> }) => {
  return (
    <nav className="mb-8">
      <ol className="flex flex-wrap items-center space-x-[1px] text-xs mt-8 sm:text-sm font-medium text-white">
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
