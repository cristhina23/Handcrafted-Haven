import { useEffect, useState } from "react";
import ProductCard from "../Shop/Products/ProductCard";
import { div } from "framer-motion/client";


interface Props {
  
  grid: number;
}

function PopularProducts({ grid }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [topProducts, setTopProducts] = useState<any[]>([]);
 

  useEffect(() => {
    async function loadTopProducts() {
      try {
        const res = await fetch("/api/products/top-rated");
        const data = await res.json();
        setTopProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading top products:", error);
      }
    }
    loadTopProducts();
  }, []);

 
  if (!topProducts || topProducts.length === 0) {
    return (
      <p className="text-center text-slate-500 italic">
        Loading top products...
      </p>
    );
  }

  return (
    <div className="text-lg bg-white border border-slate-200
        text-slate-800 shadow-sm p-9 rounded-xl hover:shadow-lg transition-all duration-200 ease-out
      ">
      <h2 className="text-xl text-slate-800 px-2 font-bold mb-4">Popular Products</h2>
      <div className= {`grid gap-6
         grid-cols-1           
        ${grid === 2 ? "sm:grid-cols-2" : ""}
        ${grid === 3 ? "sm:grid-cols-3" : ""}
        ${grid === 4 ? "sm:grid-cols-4" : ""}
      `}>
      {topProducts.map((product, index) => (
        <ProductCard key={product._id + index} product={product} grid={grid} />
      ))}
    </div>
    </div>
  );
}

export default PopularProducts;
