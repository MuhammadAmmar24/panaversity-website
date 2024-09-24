import Link from 'next/link';
import React from 'react';
import { ChevronRight } from 'lucide-react'; // Assuming this is your ChevronRight component

type BreadcrumbProps = {
  program: string;
  courseName: string;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ program, courseName }) => {
  return (
    <nav className="mb-8">
      <ol className="flex flex-wrap items-center space-x-1 text-xs mt-8 sm:text-sm font-medium text-white">
        <li className="flex items-center ">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-1" />
        </li>
        <li className="flex items-center">
          <Link href={`/programs`} className="hover:underline">
            {program}
          </Link>
          <ChevronRight className="w-4 h-4 mx-1" />
        </li>
        <li className="">{courseName}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
