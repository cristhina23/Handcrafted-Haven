import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="flex w-full max-w-sm items-center">
      <Input type="text" placeholder="Looking for something?" className="rounded-r-none"/>
      <Button type="button" className="bg-sky-300 rounded-l-none transition-all-500 hover:bg-sky-400 hover:text-slate-800 cursor-pointer ">
        <FaSearch size={20}/>
      </Button>
    </div>
  )
}




