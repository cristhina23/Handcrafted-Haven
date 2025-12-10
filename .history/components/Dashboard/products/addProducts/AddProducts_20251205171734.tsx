"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AddProductForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (mainImage) formData.append("mainImage", mainImage);
    galleryImages.forEach((file, index) => {
      formData.append(`galleryImage${index}`, file);
    });

    // Aquí harías el POST a tu API
    console.log("Form submitted", { title, description, mainImage, galleryImages });
  };

  return (
    <form className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg text-white space-y-6" onSubmit={handleSubmit}>
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
          onChange={handleMainImageChange}
          className="block w-full text-gray-200"
        />

        <label className="block mb-1 text-gray-300">Product Gallery</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryImagesChange}
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
