import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

export default function HeaderMiddle() {
  return (
    <div className="w-full flex items-center justify-between px-6 py-3 gap-4">
      <div className="flex justify-center items-center">
        <Logo />
        <h2 className=" text-xl md:text-2xl lg:text-3xl text-slate-900">HandCraft</h2>
      </div>
      <SearchBar />
      <UserActions />
    </div>
  );
}
