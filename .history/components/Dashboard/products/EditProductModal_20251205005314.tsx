"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { Variant } from "@/types";

interface Product {
  _id: string;
  title: string;
  price: number;
  quantity?: number;
  description: string;
  images?: string[];
  variants?: Variant[];
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
    quantity: 0,
    description: "",
    images: [],
    variants: [],
  });

  // Inicializa el formulario cuando cambia el producto seleccionado
  useEffect(() => {
    if (product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        ...product,
        images: product.images || [],
        variants: product.variants || [],
        quantity: product.quantity ?? 0,
      });
    }
  }, [product]);

  if (!isOpen) return null;

  // ---------------- IMAGES ----------------

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "the_new_one");

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dttbqvomc/image/upload`,
          { method: "POST", body: formData }
        );
        const data = await res.json();
        uploadedUrls.push(data.secure_url);
      } catch (err) {
        console.error("Error uploading image:", err);
      }
    }

    setForm((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...uploadedUrls],
    }));
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
  };

  // ---------------- VARIANTS ----------------

  const addVariant = () => {
    setForm((prev) => ({
      ...prev,
      variants: [...(prev.variants || []), { color: "", size: "", material: "" }],
    }));
  };

  const updateVariant = (index: number, key: keyof Variant, value: string) => {
    const updated = [...(form.variants || [])];
    updated[index][key] = value;
    setForm((prev) => ({ ...prev, variants: updated }));
  };

  const removeVariant = (index: number) => {
    setForm((prev) => ({
      ...prev,
      variants: (prev.variants || []).filter((_, i) => i !== index),
    }));
  };

  // ---------------- RENDER ----------------

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">

        {/* HEADER */}
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

        {/* IMAGES */}
        <div className="mb-4">
          <p className="font-medium mb-2 text-slate-900 dark:text-slate-100">
            Product Images
          </p>

          <div className="flex flex-wrap gap-3">
            {(form.images || []).map((img, index) => (
              <div
                key={index}
                className="relative w-20 h-20 rounded border border-slate-300 overflow-hidden"
              >
                {img ? (
                  <Image src={img} alt={`Product ${index}`} fill className="object-cover" />
                ) : (
                  <span className="text-gray-400 flex items-center justify-center h-full">N/A</span>
                )}
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            {/* Botón para agregar nuevas imágenes */}
            <label className="w-20 h-20 border border-dashed rounded flex items-center justify-center cursor-pointer hover:bg-slate-200 transition">
              <Plus size={26} />
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

        {/* FORM FIELDS */}
        <div className="space-y-3">
          <input
            className="w-full p-2 border rounded dark:bg-slate-700 dark:text-slate-200"
            placeholder="Product name"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          />
          <input
            type="number"
            className="w-full p-2 border rounded dark:bg-slate-700 dark:text-slate-200"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))}
          />
          <input
            type="number"
            className="w-full p-2 border rounded dark:bg-slate-700 dark:text-slate-200"
            placeholder="Stock"
            value={form.quantity}
            onChange={(e) => setForm((p) => ({ ...p, quantity: Number(e.target.value) }))}
          />
          <textarea
            className="w-full p-2 border rounded dark:bg-slate-700 dark:text-slate-200"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          />
        </div>

        {/* VARIANTS */}
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <p className="font-medium text-slate-900 dark:text-slate-100">Variants</p>
            <button
              onClick={addVariant}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Plus size={18} /> Add Variant
            </button>
          </div>

          <div className="mt-3 space-y-3">
            {(form.variants || []).map((v, index) => (
              <div key={index} className="p-3 border rounded-lg dark:border-slate-600 space-y-2">
                <div className="flex gap-3">
                  <input
                    className="w-full p-2 border rounded dark:bg-slate-700 dark:text-slate-200"
                    placeholder="Color"
                    value={v.color}
                    onChange={(e) => updateVariant(index, "color", e.target.value)}
                  />
                  <input
                    className="w-full p-2 border rounded dark:bg-slate-700 dark:text-slate-200"
                    placeholder="Size"
                    value={v.size}
                    onChange={(e) => updateVariant(index, "size", e.target.value)}
                  />
                  <input
                    className="w-full p-2 border rounded dark:bg-slate-700 dark:text-slate-200"
                    placeholder="Material"
                    value={v.material}
                    onChange={(e) => updateVariant(index, "material", e.target.value)}
                  />
                </div>
                <button
                  onClick={() => removeVariant(index)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700"
                >
                  <Trash size={16} /> Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SAVE BUTTON */}
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
