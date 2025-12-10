import Link from "next/link";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

export default function HeaderMiddle() {
  return (
    <div className="w-full flex items-center justify-between px-6 py-2 lg:py-0 gap-4">
      <div className="flex justify-center items-center">
        <Link href="/"><Logo /></Link>
        <h2 className=" text-xl md:text-2xl  text-slate-900">HandCraft</h2>
      </div>
      <SearchBar />
      <div className="hidden md:flex">
        <UserActions />
      </div>
    </div>
  );
}
