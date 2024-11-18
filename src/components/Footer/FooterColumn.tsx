import { FooterColumnProps } from "@/src/types/footer";
import Link from "next/link";

const FooterColumn: React.FC<FooterColumnProps> = ({
  title,
  links,
  className,
}) => {
  return (
    <div className={className}>
      <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              aria-label={`${link.name}`}
              className="text-gray-400 hover:text-gray-300"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
