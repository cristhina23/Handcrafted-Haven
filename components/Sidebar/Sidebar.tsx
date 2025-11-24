import { getCategories } from "@/lib/getCategories";

export default async function Sidebar() {
  const categories = await getCategories();

  return (
    <aside className="hidden lg:block w-64 bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-8">

      {/* Shop by Categories */}
      <section>
        <h3 className="font-semibold text-slate-700 mb-4">
          Shop by Categories
        </h3>

        <ul className="space-y-2 text-sm text-slate-600">
          {categories.map((cat) => (
            <li
              key={String(cat.name)}
              className="cursor-pointer hover:text-slate-900"
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </section>

      {/* Filter By Price */}
      <section>
        <h3 className="font-semibold text-slate-700 mb-4">Filter By</h3>
        <p className="text-sm text-slate-500 mb-2 font-medium">Price</p>
        <ul className="space-y-2 text-sm text-slate-600">
          <li><input type="checkbox" /> <span className="ml-2">Any Price</span></li>
          <li><input type="checkbox" /> <span className="ml-2">0 USD to 100</span></li>
          <li><input type="checkbox" /> <span className="ml-2">100 USD to 200</span></li>
          <li><input type="checkbox" /> <span className="ml-2">200 USD to 300</span></li>
        </ul>
      </section>

      {/* Colors */}
      <section>
        <h3 className="font-semibold text-slate-700 mb-4">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {["#000000", "#F44336", "#4CAF50", "#2196F3", "#9C27B0", "#FFEB3B", "#795548"].map(color => (
            <div
              key={color}
              className="w-6 h-6 rounded-full cursor-pointer border border-slate-300"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </section>

      {/* Shipped From */}
      <section>
        <h3 className="font-semibold text-slate-700 mb-4">Shipped From</h3>
        <select className="w-full border rounded-md px-3 py-2 text-sm text-slate-600">
          <option>Anywhere</option>
          <option>USA</option>
          <option>EU</option>
          <option>Asia</option>
        </select>
      </section>

      {/* Random Products */}
      <section>
        <h3 className="font-semibold text-slate-700 mb-4">Random Products</h3>

        <div className="space-y-4">
          {/* Aquí van tarjetas mini */}
          <div className="flex gap-3">
            <div className="w-14 h-14 rounded-md bg-slate-200"></div>
            <div>
              <p className="text-sm font-medium text-slate-700">Product Name</p>
              <p className="text-xs text-yellow-500">⭐⭐⭐⭐⭐</p>
              <p className="text-xs text-slate-600">$15.00</p>
            </div>
          </div>
        </div>
      </section>

    </aside>
  );
}
