import { useRandomProducts } from "@/hooks/useRandomProducts";
import Image from "next/image";

export default function RandomProducts() {
  const { products, loading, error } = useRandomProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200  flex flex-col gap-8">
      <h3 className="font-semibold text-slate-700 mb-4">Random Products</h3>
      <div className="space-y-4 ">
        {products.map((product) => (
          <div key={product._id} className="flex gap-3 border-b border-slate-300 pb-4">
            <div className="w-14 h-14 rounded-md bg-slate-200 overflow-hidden">
              {product.images[0] && (
                <Image
                  width={60}
                  height={60}
                  src={product.images[0]}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">{product.title}</p>
              <p className="text-xs text-yellow-500">
                {"★".repeat(Math.round(product.rating ?? 0))}
                {"☆".repeat(5 - Math.round(product.rating ?? 0))}
              </p>
              <p className="text-xs text-slate-600">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
