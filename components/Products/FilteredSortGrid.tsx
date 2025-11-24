import Image from "next/image";
import DynamicSortSelector, { SortOption } from "./DynamicSortSelector";
import Gr4 from "@/public/gr4.svg";
import Gr3 from "@/public/gr3.svg";
import Gr2 from "@/public/gr2.svg";
import Gr from "@/public/gr.svg";


interface FilterSortGridProps {
  totalProducts: number;
  onGridChange: (value: number) => void;
  onSortChange?: (value: SortOption) => void; // nuevo
}

export const FilterSortGrid: React.FC<FilterSortGridProps> = ({
  totalProducts,
  onGridChange,
  onSortChange,
}) => {
  return (
    <div className="mb-6 bg-white p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center">
        {/* SORT */}
        <div className="flex items-center gap-4">
          <p className="w-24 font-medium text-slate-700">Sort By:</p>
          <DynamicSortSelector onChange={onSortChange} />
        </div>

        {/* GRID BUTTONS */}
        <div className="flex items-center gap-4">
          <p className="text-sm">{totalProducts} products</p>
          <div className="flex gap-3">
            <Image onClick={() => onGridChange(4)} src={Gr4} alt="grid" className="cursor-pointer" />
            <Image onClick={() => onGridChange(3)} src={Gr3} alt="grid" className="cursor-pointer" />
            <Image onClick={() => onGridChange(2)} src={Gr2} alt="grid" className="cursor-pointer" />
            <Image onClick={() => onGridChange(1)} src={Gr} alt="grid" className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};
