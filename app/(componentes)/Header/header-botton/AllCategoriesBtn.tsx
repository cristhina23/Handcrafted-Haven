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
      <DropdownMenuTrigger
        className="
          flex items-center gap-2
          px-2 py-2              
          
          bg-sky-300 rounded-md hover:bg-sky-400
          text-sm sm:text-base 
        "
      >
        <BiCategoryAlt className="text-base" />

       
        <span className="hidden xs:inline sm:inline text-sm ">Categories</span>

        <IoIosArrowDown className="text-base " />
      </DropdownMenuTrigger>

     <DropdownMenuContent className="p-2 w-60 rounded-lg shadow-[0_4px_6px_-1px_rgba(6,182,212,0.3),0_2px_4px_-1px_rgba(6,182,212,0.06)]">

        
        <DropdownMenuItem className="flex items-center justify-between gap-8  dropdownItem hover:bg-sky-200/70 hover:text-sky-700 cursor-pointer rounded-md py-1 hover:font-semibold">
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

        
        <DropdownMenuItem
          className="flex items-center justify-between gap-8  dropdownItem 
           hover:bg-sky-200/70 hover:text-sky-700 cursor-pointer rounded-md py-1 hover:font-semibold"
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
          className="flex items-center justify-between gap-8  dropdownItem 
         hover:bg-sky-200/70 hover:text-sky-700 cursor-pointer rounded-md py-1 hover:font-semibold"
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
          className="flex items-center justify-between gap-8 
           hover:bg-sky-200/70 hover:text-sky-700 cursor-pointer rounded-md py-1 hover:font-semibold dropdownItem"
        >
          Accessories
          <Image
            src="/accesories.jpg"
            alt="accessories"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center justify-between gap-8  dropdownItem 
           hover:bg-sky-200/70 hover:text-sky-700 cursor-pointer rounded-md py-1 hover:font-semibold"
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
