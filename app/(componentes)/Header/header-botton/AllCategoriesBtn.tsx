import { BiCategoryAlt } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function AllCategoriesBtn() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-sky-300 rounded-md hover:bg-sky-400">
        <BiCategoryAlt />
        All Categories
        <IoIosArrowDown />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-2 w-60">
        {/* LABEL */}
        <DropdownMenuItem className="flex items-center justify-between gap-8 text-lg 
                     hover:bg-sky-200/70 hover:text-sky-700 cursor-pointer rounded-md p-2 hover:font-semibold">
          Jewelry
          <Image
            src="/jewelry.jpg"
            alt="jewelry"
            width={50}
            height={50}
            className="rounded-full object-contain"
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {/* ITEMS */}
        <DropdownMenuItem
          className="flex items-center justify-between gap-8 text-lg 
                     hover:bg-sky-200/70 hover:text-sky-700 cursor-pointer rounded-md p-2 hover:font-semibold"
        >
          Home-Decor
          <Image
            src="/home-decor.jpg"
            alt="home decor"
            width={50}
            height={50}
            className="rounded-full object-contain"
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center justify-between gap-8 text-lg 
                     hover:bg-sky-200/70 hover:text-sky-700 cursor-pointer rounded-md p-2 hover:font-semibold"
        >
          Textile
          <Image
            src="/textile.jpg"
            alt="textile"
            width={50}
            height={50}
            className="rounded-full object-contain"
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center justify-between gap-8 text-lg 
                     hover:bg-sky-200/70 hover:text-sky-700 cursor-pointer rounded-md p-2 hover:font-semibold"
        >
          Accessories
          <Image
            src="/accesories.jpg"
            alt="accessories"
            width={50}
            height={50}
            className="rounded-full object-contain"
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center justify-between gap-8 text-lg 
                     hover:bg-sky-200/70 hover:text-sky-700 cursor-pointer rounded-md p-2 hover:font-semibold"
        >
          Art
          <Image
            src="/art.jpg"
            alt="art"
            width={50}
            height={50}
            className="rounded-full object-contain"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
