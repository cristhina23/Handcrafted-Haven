"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/contexts/SellerProductsContext";
import Image from "next/image";
import { Checkbox } from "@radix-ui/react-checkbox";

const categories = [
  { id: "6920e4c01eef40052ea9de9c", name: "Jewelry" },
  { id: "6920e4c01eef40052ea9de9d", name: "Home-Decor" },
  { id: "6920e4c01eef40052ea9de9e", name: "Textile" },
  { id: "6920e4c01eef40052ea9de9f", name: "Accessories" },
  { id: "6920e4c01eef40052ea9dea0", name: "Art" },
];

interface Variant {
  color?: string;
  size?: string;
  material?: string;
}

export default function AddProductFormExtended() {
  const { createProduct } = useProducts();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [categoryId, setCategoryId] = useState(categories[0].id);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const mainImageRef = useRef<HTMLInputElement>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const galleryImagesRef = useRef<HTMLInputElement>(null);
  const [isCustomOrder, setIsCustomOrder] = useState(false);
  const [dimensions, setDimensions] = useState("");
  const [shippingMethods, setShippingMethods] = useState<string[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);


  const addVariant = () => setVariants([...variants, { color: "", size: "", material: "" }]);
  const removeVariant = (index: number) => setVariants(variants.filter((_, i) => i !== index));
  const updateVariant = (index: number, key: keyof Variant, value: string) => {
    const updated = [...variants];
    updated[index][key] = value;
    setVariants(updated);
  };

  // Shipping Methods
  const toggleShippingMethod = (method: string) => {
    setShippingMethods(prev =>
      prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]
    );
  };

  
  const removeMainImage = () => {
    setMainImage(null);
    if (mainImageRef.current) mainImageRef.current.value = "";
  };

  
  const removeGalleryImage = (index: number) => {
    const newGallery = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(newGallery);
    if (galleryImagesRef.current && newGallery.length === 0) galleryImagesRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      title,
      description,
      price,
      quantity,
      categoryId,
      isCustomOrder,
      dimensions,
      shippingMethods,
      variants,
      images: mainImage ? [mainImage.name] : [],
      gallery: galleryImages.map(f => f.name),
    };

    await createProduct(productData);

    
    setTitle("");
    setDescription("");
    setPrice(0);
    setQuantity(1);
    setCategoryId(categories[0].id);
    removeMainImage();
    setGalleryImages([]);
    setIsCustomOrder(false);
    setDimensions("");
    setShippingMethods([]);
    setVariants([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "isCustomOrder") setIsCustomOrder(e.target.checked)
    }
  };

  return (
    <form className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg text-white space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold">Add Product</h2>

      {/* TITLE */}
      <input
        type="text"
        placeholder="Product Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* DESCRIPTION */}
      <textarea
        placeholder="Product Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
      />

      {/* PRICE & QUANTITY */}
      <div className="flex gap-4">
        <input
          type="number"
          placeholder="Price"
          value={price}
          min={0}
          onChange={e => setPrice(Number(e.target.value))}
          className="flex-1 p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          min={0}
          onChange={e => setQuantity(Number(e.target.value))}
          className="flex-1 p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* CATEGORY */}
      <select
        value={categoryId}
        onChange={e => setCategoryId(e.target.value)}
        className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      {/* DIMENSIONS */}
      <input
        type="text"
        placeholder="Dimensions"
        value={dimensions}
        onChange={e => setDimensions(e.target.value)}
        className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* IS CUSTOM ORDER */}
      <div className="flex items-center gap-2">
      <Checkbox
        checked={isCustomOrder}
        onCheckedChange={(checked) => setIsCustomOrder(checked === true)}
        className="w-5 h-5 border border-gray-400 rounded"
      />
      <label className="select-none">Is Custom Order</label>
    </div>

      
      <div>
        <p>Shipping Methods:</p>
        {["Standard", "Express", "Overnight"].map(method => (
          <label key={method} className="flex items-center gap-2">
            <input type="checkbox" checked={shippingMethods.includes(method)} onChange={() => toggleShippingMethod(method)} />
            {method}
          </label>
        ))}
      </div>

      {/* VARIANTS */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p>Variants</p>
          <button type="button" onClick={addVariant} className="bg-blue-600 px-2 py-1 rounded">+ Add</button>
        </div>
        {variants.map((v, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input placeholder="Color" value={v.color} onChange={e => updateVariant(i, "color", e.target.value)} className="p-2 rounded-md bg-gray-800 border border-gray-700 flex-1" />
            <input placeholder="Size" value={v.size} onChange={e => updateVariant(i, "size", e.target.value)} className="p-2 rounded-md bg-gray-800 border border-gray-700 flex-1" />
            <input placeholder="Material" value={v.material} onChange={e => updateVariant(i, "material", e.target.value)} className="p-2 rounded-md bg-gray-800 border border-gray-700 flex-1" />
            <button type="button" onClick={() => removeVariant(i)} className="bg-red-600 px-2 rounded">✕</button>
          </div>
        ))}
      </div>

      {/* MAIN IMAGE */}
      <div className="space-y-2 border border-dashed p-4 rounded">
        <label>Main Image</label>
        <input ref={mainImageRef} type="file" accept="image/*" onChange={e => e.target.files && setMainImage(e.target.files[0])} />
        {mainImage && (
          <div className="flex items-center gap-2 mt-2 relative">
            <Image src={URL.createObjectURL(mainImage)} alt="Preview" width={50} height={50} className="rounded-md" />
            <button type="button" onClick={removeMainImage} className="absolute top-0 right-0 bg-red-600 rounded-full p-1 text-white">✕</button>
          </div>
        )}
      </div>

      {/* GALLERY IMAGES */}
      <div className="space-y-2 border border-dashed p-4 rounded">
        <label>Gallery Images</label>
        <input ref={galleryImagesRef} type="file" accept="image/*" multiple onChange={e => e.target.files && setGalleryImages(Array.from(e.target.files))} />
        <div className="flex flex-wrap gap-2 mt-2">
          {galleryImages.map((file, idx) => (
            <div key={idx} className="relative">
              <span className="bg-gray-700 px-2 py-1 rounded">{file.name}</span>
              <button type="button" onClick={() => removeGalleryImage(idx)} className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1 text-white text-xs">✕</button>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Add Product</Button>
    </form>
  );
}
