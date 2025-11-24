import { Product } from "@/types";
import Image from "next/image";

interface Props {
  product: Product;
  grid: number;
}

export default function ProductCard({ product, grid }: Props) {
  const isHorizontal = grid === 1;

  return (
     <div
      className={`
        bg-white p-4 rounded-xl shadow 
        transition border hover:shadow-lg cursor-pointer
        ${isHorizontal ? "flex gap-4 items-center" : "flex flex-col"}
      `}
    >
      {/* IMG */}
      <div
        className={`
          relative rounded-lg overflow-hidden
          ${isHorizontal ? "w-[40%] h-40" : "w-full h-64"}
        `}
      >
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      {/* TEXT */}
      <div className={`${isHorizontal ? "w-[60%]" : "w-full mt-3"}`}>
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-sm text-slate-600 mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-3 font-bold text-slate-900">
          ${product.price}
        </div>
      </div>
    </div>
  );
}
