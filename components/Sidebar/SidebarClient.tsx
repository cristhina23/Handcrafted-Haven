"use client";

import ShopBy from "./ShopBy";
import FilterBy from "./FilterBy";
import RandomProducts from "./RandomProducts";

interface Category {
  _id: string;
  name: string;
}

interface SidebarClientProps {
  categories: Category[];
}

export default function SidebarClient({ categories }: SidebarClientProps) {
  const handleCategorySelect = (cat: Category) => {
    console.log("Selected category:", cat.name);
    // Aquí puedes agregar lógica de filtrado de productos
  };

  const handlePriceChange = (range: { label: string; min?: number; max?: number }, checked: boolean) => {
    console.log("Selected price range:", range, checked);
    // Aquí puedes agregar lógica de filtrado de productos por precio
  };

  return (
    <aside className="hidden lg:block w-64 space-y-8">
      <ShopBy categories={categories} onSelect={handleCategorySelect} />
      <FilterBy onChange={handlePriceChange} />

     
      {/* Random Products */}
      <section>
        <RandomProducts />
      </section>
    </aside>
  );
}
