"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/contexts/SellerProductsContext";

// Tus categorías fijas
const categories = [
  { id: "6920e4c01eef40052ea9de9c", name: "Jewelry" },
  { id: "6920e4c01eef40052ea9de9d", name: "Home-Decor" },
  { id: "6920e4c01eef40052ea9de9e", name: "Textile" },
  { id: "6920e4c01eef40052ea9de9f", name: "Accessories" },
  { id: "6920e4c01eef40052ea9dea0", name: "Art" },
];

export default function AddProductForm() {
  const { createProduct } = useProducts();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [categoryId, setCategoryId] = useState(categories[0].id);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [isCustomOrder, setIsCustomOrder] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Objeto del producto a enviar
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const productData: any = {
      title,
      description,
      price,
      quantity,
      categoryId,
      isCustomOrder,
      images: mainImage ? [mainImage.name] : [],
      // Si hay varias imágenes
      gallery: galleryImages.map((f) => f.name),
    };

    await createProduct(productData);

    // Limpiar formulario
    setTitle("");
    setDescription("");
    setPrice(0);
    setQuantity(1);
    setCategoryId(categories[0].id);
    setMainImage(null);
    setGalleryImages([]);
    setIsCustomOrder(false);
  };

  return (
    <form
      className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg text-white space-y-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold">Add Product</h2>

      {/* Product Title */}
      <div>
        <label className="block mb-1 text-gray-300">Product Title</label>
        <input
          type="text"
          placeholder="Enter Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Product Description */}
      <div>
        <label className="block mb-1 text-gray-300">Product Description</label>
        <textarea
          placeholder="Enter Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
        />
      </div>

      {/* Price and Quantity */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 text-gray-300">Price</label>
          <input
            type="number"
            value={price}
            min={0}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1">
          <label className="block mb-1 text-gray-300">Quantity</label>
          <input
            type="number"
            value={quantity}
            min={0}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 text-gray-300">Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Custom Order */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isCustomOrder}
          onChange={(e) => setIsCustomOrder(e.target.checked)}
        />
        <label className="text-gray-300">Is Custom Order</label>
      </div>

      {/* Product Gallery */}
      <div className="space-y-4 border border-dashed border-gray-700 rounded-md p-4">
        <label className="block mb-1 text-gray-300 bg-sla">Main Image
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && setMainImage(e.target.files[0])}
          className="block w-full text-gray-200"
        />
        </label>
        <label className="block mb-1 text-gray-300">Product Gallery</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) =>
            e.target.files && setGalleryImages(Array.from(e.target.files))
          }
          className="block w-full text-gray-200"
        />

        {galleryImages.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {galleryImages.map((file, idx) => (
              <span
                key={idx}
                className="bg-gray-700 px-2 py-1 rounded-md text-sm"
              >
                {file.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
        Add Product
      </Button>
    </form>
  );
}
