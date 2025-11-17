// components/ProductDashboard.tsx
import React from "react";
import { IProduct } from "@/lib/models/Product";

interface ProductDashboardProps {
  products: IProduct[];
}

export const ProductDashboard: React.FC<ProductDashboardProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.price.toString()}
          className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer"
        >
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4 opacity-0 hover:opacity-100 transition">
            <h2 className="font-bold text-lg">{product.title}</h2>
            <p className="mt-1">${product.price.toFixed(2)}</p>
            <button className="mt-2 px-3 py-1 bg-white text-black rounded">
              More Info
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
