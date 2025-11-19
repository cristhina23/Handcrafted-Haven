import Link from "next/link"

// components/CategoryMenu.tsx
const categories = ['Home', 'About', 'Shop', 'Contact Us', 'Sellers', 'Blog']

export default function CategoryMenu() {
  return (
    <nav className="w-2/4 flex gap-10 overflow-x-auto whitespace-nowrap text-sm font-medium text-gray-700">
      {categories.map((cat) => (
        <Link
          key={cat}
          href="#"
          className= " font-medium text-lg  hover:text-sky-500 transition-colors"
        >
          {cat}
        </Link>
      ))}
    </nav>
  )
}
