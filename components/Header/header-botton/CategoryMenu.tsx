import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Shop", path: "/shop" },
  { name: "Sellers", path: "/sellers" },
  { name: "Blog", path: "/blog" },
  { name: "Contact Us", path: "/contact" },
];

export default function CategoryMenu() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex flex-1 items-end">
      <ul
        className="
          flex items-center 
          gap-4 lg:gap-8 
          whitespace-nowrap 
          text-base  
          font-medium text-slate-700
          overflow-x-hidden
        "
      >
        {categories.map((cat) => {
          const isActive = pathname === cat.path;

          return (
            <li key={cat.name} className="shrink-0">
              <Link
                href={cat.path}
                className={`
                  inline-block px-2 transition-colors transition-transform duration-300
                  leading-none will-change-transform origin-center
                  ${isActive 
                    ? "font-semibold underline hover:scale-110 hover:text-sky-800"
                    : "hover:scale-110 hover:text-sky-800"
                  }
                `}
              >
                {cat.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

