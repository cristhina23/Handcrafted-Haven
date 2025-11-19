import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Shop", path: "/shop" },
  { name: "Contact Us", path: "/contact" },
  { name: "Sellers", path: "/sellers" },
  { name: "Blog", path: "/blog" },
];

export default function CategoryMenu() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex w-2/4">
      <ul className="flex gap-8 overflow-x-auto whitespace-nowrap text-lg font-medium text-slate-700">
        {categories.map((cat) => {
          const isActive = pathname === cat.path;

          return (
            <li key={cat.name}>
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
