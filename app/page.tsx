import { ProductDashboard } from "@/app/components/ProductDashboard";
import { Product, IProduct } from "@/lib/models/Product";
import { connectDB } from "@/lib/db/db";

export default async function Home() {
  await connectDB();

  const products: IProduct[] = await Product.find().lean<IProduct>();

  const categories = Array.from(
    new Set(products.map((p) => p.categoryId.toString()))
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">
        Handcrafted Haven
      </h1>

      <div className="flex gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {cat}
          </button>
        ))}
      </div>

      <ProductDashboard products={products} />
    </div>
  );
}