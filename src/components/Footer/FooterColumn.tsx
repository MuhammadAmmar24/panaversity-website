import { FooterColumnProps } from "@/src/types/footer";
import Link from "next/link";

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
            <Link href={link.href} aria-label={`${link.name}`} className="hover:text-gray-300 text-gray-400">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
