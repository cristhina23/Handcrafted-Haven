// final-project/app/shop/product/[id]/page.tsx
import Image from "next/image";
import React, { Suspense } from "react";

interface Props {
  params: { id: string };
}

interface ProductType {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
}

// Función para traer el producto desde la API
async function getProduct(id: string): Promise<ProductType | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Componente skeleton para mostrar mientras se carga
function ProductSkeleton() {
  return (
    <div className="max-w-5xl mx-auto p-6 animate-pulse">
      <div className="h-8 bg-gray-300 rounded mb-4 w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-5/6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="h-64 bg-gray-300 rounded"></div>
        <div className="h-64 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

const ProductPage = async ({ params }: Props) => {
  const { id } = await params;

  // Suspense para mostrar skeleton mientras se carga
  const productPromise = getProduct(id);
  const product = await productPromise;

  if (!product) {
    return <p className="text-center mt-10 text-red-500">Product not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="mb-4">{product.description}</p>
      <p className="mb-4 font-semibold text-lg">Price: ${product.price}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {product.images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={product.title}
            width={500}
            height={500}
            className="w-full h-64 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
};

// Componente envolvente con Suspense
export default function ProductPageWrapper(props: Props) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      
      <ProductPage {...props} />
    </Suspense>
  );
}
