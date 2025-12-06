"use client"
import { useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const params = useSearchParams();
  const tab = params.get("tab");

  return (
    <div>
      {tab === "categories" && <Categories />}
      {tab === "add" && <AddProduct />}
      {!tab && <AllProducts />}
    </div>
  );
}
