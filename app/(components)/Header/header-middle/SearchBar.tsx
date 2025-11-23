import { FC } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar: FC = () => {
  return (
    <div className="w-full max-w-sm relative">
      {/* Icono dentro del input */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="text-slate-400" size={18} />
      </div>
      <input
        type="text"
        placeholder="Looking for something?"
        className="w-full pl-10 pr-3  py-1 rounded-lg border border-slate-300 focus:border-sky-400 focus:ring-1 focus:ring-sky-300 text-sm sm:text-base transition-colors duration-300"
      />
    </div>
  );
};

export default SearchBar;
