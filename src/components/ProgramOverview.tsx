// ProgramOverview.tsx

import Image from 'next/image';
import { programOverviewContent } from '@/constants/programOverview'; // Import the array object
import React from 'react';

export default function ProgramOverview() {
  return (
    <section className="w-full bg-[#fffbfb] py-12 md:py-24 lg:py-32 bg-muted ">
      <div className=" w-full grid gap-6 md:gap-8 px-4 md:px-6 ">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block bg-secondary mb-1 rounded-[40px]  px-3 py-1 text-[0.6rem] md:text-[0.8rem] text-primary ">Program Overview</div>
            <h2 className="text-[1.7rem] sm:text-[2rem] md:text-[2.8rem] text-textPrimary font-semibold font-poppins tracking-tighter">
              Become a Certified<br />  Cloud Native Applied Generative AI Engineering
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center ">
          {programOverviewContent.map((item:any) => (
            <div key={item.id} className="flex flex-col text-center items-center h-full gap-4 p-6 rounded-lg bg-secondary border-b-4 border-accent  shadow-sm">
              <div className={`bg-${item.icon.toLowerCase()} rounded-full p-3 bg-background text-${item.icon.toLowerCase()}-foreground`}>
                {React.createElement(getIconComponent(item.icon), { className: 'w-6 h-6' })}
              </div>
              <h3 className="text-[1.2rem] md:text-[1.3rem] font-semibold font-poppins text-textPrimary">{item.title}</h3>
              <p className="text-muted-foreground  text-[0.9rem] text-center font-inter text-textSecondary">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Function to return the icon component based on the string name
function getIconComponent(iconName: string) {
  switch (iconName) {
    case 'BookIcon':
      return BookIcon;
    case 'BriefcaseIcon':
      return BriefcaseIcon;
    case 'BadgeIcon':
      return BadgeIcon;
    case 'ClockIcon':
      return ClockIcon;
    default:
      return () => null; // Return a default empty component if the icon name doesn't match
  }
}

function BadgeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#1cd98e"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    </svg>
  );
}

function BookIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#1cd98e"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function BriefcaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#1cd98e"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#1cd98e"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
