"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Edit } from "lucide-react";
import Image from "next/image";

interface Variant {
  color: string;
  size: string;
  material: string;
}

interface Product {
  _id: string;
  title: string;
  price: number;
  stock: number;
  description: string;
  images: string[];
  variants: Variant[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSave: (updated: Product) => void;
}

export default function EditProductModal({
  isOpen,
  onClose,
  product,
  onSave,
}: Props) {
  const [form, setForm] = useState<Product>({
    _id: "",
    title: "",
    price: 0,
    stock: 0,
    description: "",
    images: [],
    variants: [],
  });

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  if (!isOpen) return null;

  // 📌 Agregar fotos
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    let uploadedUrls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "YOUR_UPLOAD_PRESET");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      uploadedUrls.push(data.secure_url);
    }

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedUrls],
    }));
  };

  // ❌ Borrar una imagen
  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      {/* Modal */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            Edit Product
          </h2>
          <button
            onClick={onClose}
            className="text-slate-600 dark:text-slate-300 hover:text-red-500"
          >
            <X size={22} />
          </button>
        </div>

        {/* Images Section */}
        <div className="mb-4">
          <p className="font-medium mb-2 text-slate-900 dark:text-slate-100">
            Product Images
          </p>

          <div className="flex flex-wrap gap-3">
            {/* Miniaturas existentes */}
            {form.images.map((img, index) => (
              <div
                key={index}
                className="relative group w-20 h-20 rounded overflow-hidden border border-slate-300 dark:border-slate-600"
              >
                <Image src={img} alt="" fill className="object-cover" />

                {/* Capa al hacer hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <Edit className="text-white" size={20} />
                </div>

                {/* Botón eliminar */}
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            {/* Cuadro para agregar */}
            <label className="w-20 h-20 border border-dashed rounded flex items-center justify-center cursor-pointer border-slate-400 dark:border-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
              <Plus size={26} className="text-slate-600 dark:text-slate-300" />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Formulario */}
        <div className="space-y-3">
          <input
            className="w-full p-2 border rounded dark:bg-slate-700 dark:text-slate-200"
            placeholder="Product name"
            value={form.title}
            onChange={(e) =>
              setForm((p) => ({ ...p, title: e.target.value }))
            }
          />

          <input
            type="number"
            className="w-full p-2 border rounded dark:bg-slate-700 dark:text-slate-200"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm((p) => ({ ...p, price: Number(e.target.value) }))
            }
          />

          <input
            type="number"
            className="w-full p-2 border rounded dark:bg-slate-700 dark:text-slate-200"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) =>
              setForm((p) => ({ ...p, stock: Number(e.target.value) }))
            }
          />

          <textarea
            className="w-full p-2 border rounded dark:bg-slate-700 dark:text-slate-200"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm((p) => ({ ...p, description: e.target.value }))
            }
          />
        </div>

        {/* Botón guardar */}
        <button
          onClick={() => onSave(form)}
          className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
