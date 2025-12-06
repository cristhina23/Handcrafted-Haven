"use client"
import { useSearchParams } from "next/navigation";
import AllProducts from "./allProducts/AllProducts";

export default function ProductsPage() {
  const params = useSearchParams();
  const tab = params.get("tab");

  return (
    <div>
      {tab === "all" && <AllProducts />}
      {tab === "add" && <AddProducts />}
      {!tab && <AllProducts />}
    </div>
  );
}
