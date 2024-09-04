import React from "react";

interface FooterColumnProps {
  title: string;
  links: { name: string; href: string }[];
  className?: string; // Optional className prop
}

const FooterColumn: React.FC<FooterColumnProps> = ({
  title,
  links,
  className,
}) => {
  return (
    <div className={className}>
      <h3 className="font-semibold mb-4 text-white text-lg">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href} className="hover:text-gray-300 text-gray-400">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
