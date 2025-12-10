"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/contexts/SellerProductsContext";

export default function AddProductForm() {
  const { createProduct } = useProducts();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Crear objeto con los datos del producto
    const productData: any = {
      title,
      description,
    };

    // Aquí podrías manejar la subida de imágenes a tu servidor o S3
    // Por simplicidad, asumimos que puedes enviar solo nombres de archivos
    if (mainImage) productData.mainImage = mainImage.name;
    if (galleryImages.length > 0) productData.gallery = galleryImages.map(f => f.name);

    await createProduct(productData);

    // Limpiar formulario
    setTitle("");
    setDescription("");
    setMainImage(null);
    setGalleryImages([]);
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

      {/* Product Gallery */}
      <div className="space-y-4">
        <label className="block mb-1 text-gray-300">Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && setMainImage(e.target.files[0])}
          className="block w-full text-gray-200"
        />

        <label className="block mb-1 text-gray-300">Product Gallery</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => e.target.files && setGalleryImages(Array.from(e.target.files))}
          className="block w-full text-gray-200"
        />

        {galleryImages.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {galleryImages.map((file, idx) => (
              <span key={idx} className="bg-gray-700 px-2 py-1 rounded-md text-sm">
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
