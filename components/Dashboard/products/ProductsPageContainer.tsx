"use client"
import { useSearchParams } from "next/navigation";
import AllProducts from "./allProducts/AllProducts";
import AddProducts from "./addProducts/AddProducts";

export default function ProductsPageContainer() {
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
