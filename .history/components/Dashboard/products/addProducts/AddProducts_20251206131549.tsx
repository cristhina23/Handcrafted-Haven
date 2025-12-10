"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useProducts } from "@/contexts/SellerProductsContext";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {  Plus, Trash, X } from "lucide-react";
import DynamicSortSelector from "@/components/DynamicSortSelector";
import toast from "react-hot-toast";

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
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
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
    let mainImageUrl = "";
    if (mainImage) {
      const formData = new FormData();
      formData.append("file", mainImage);

      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      mainImageUrl = data.url;
    }

    // 2. Subir galleryImages
    const galleryUrls: string[] = [];

    for (const file of galleryImages) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      galleryUrls.push(data.url);
    }

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
      images: [
      ...(mainImageUrl ? [mainImageUrl] : []),
      ...galleryUrls
    ],
    };

    await createProduct(productData);

    // Reset form
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

    toast.success("Product created successfully!");
  };

  const categoryOptions = categories.reduce((acc, cat) => {
  acc[cat.id] = cat.name;
  return acc;
}, {} as Record<string, string>);


  return (
    <form className="max-w-3xl mx-auto p-2 md:p-6 bg-white dark:bg-slate-900 rounded-lg text-slate-900 dark:text-slate-300 space-y-4 " onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold">Add Product</h2>

      {/* TITLE */}
      <Input
        placeholder="Product Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="py-6 px-4 text-lg"
      />

      {/* DESCRIPTION */}
      <Textarea
        placeholder="Product Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="h-32"
      />

      {/* PRICE & QUANTITY */}
      <div className="flex gap-4">
        <Input
          type="number"
          placeholder="Price"
          value={price}
          min={0}
          onChange={e => setPrice(Number(e.target.value))}
          className="py-6 px-4 text-lg"
        />
        <Input
          type="number"
          placeholder="Quantity"
          value={quantity}
          min={0}
          onChange={e => setQuantity(Number(e.target.value))}
          className="py-6 px-4 text-lg"
        />
      </div>

      {/* CATEGORY */}
      <DynamicSortSelector
          options={categoryOptions}
          defaultValue={categories[0].id}
          onChange={(value) => setCategoryId(value)}

        />

      {/* DIMENSIONS */}
      <Input
        placeholder="Dimensions"
        value={dimensions}
        onChange={e => setDimensions(e.target.value)}
        className="py-6 px-4 text-lg"
      />

      {/* IS CUSTOM ORDER */}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isCustomOrder}
          onCheckedChange={(checked) => setIsCustomOrder(checked === true)}
          className="w-5 h-5"
        />
        <Label className="text-md font-normal">Is Custom Order</Label>
      </div>

      {/* SHIPPING METHODS */}
      <div>
        <p className="mb-2 font-medium">Shipping Methods:</p>
        <div className="flex flex-col md:flex-row gap-4">
          {["Standard", "Express", "Overnight"].map(method => (
            <div key={method} className="flex  items-center gap-2">
              <Checkbox
                checked={shippingMethods.includes(method)}
                onCheckedChange={() => toggleShippingMethod(method)}
                className="w-5 h-5"
              />
              <Label className="text-lg font-normal">{method}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* VARIANTS */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="font-medium text-lg">Variants</p>
          <Button type="button" variant="secondary" onClick={addVariant}>+ Add</Button>
        </div>
        {variants.map((v, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <Input placeholder="Color" value={v.color} onChange={e => updateVariant(i, "color", e.target.value)} className="py-6 px-4 text-lg" />
            <Input placeholder="Size" value={v.size} onChange={e => updateVariant(i, "size", e.target.value)} className="py-6 px-4 text-lg" />
            <Input placeholder="Material" value={v.material} onChange={e => updateVariant(i, "material", e.target.value)} className="py-6 px-4 text-lg" />
            <Button type="button" variant="destructive" onClick={() => removeVariant(i)} className="py-6 px-4 text-lg"><Trash /></Button>
          </div>
        ))}
      </div>

      {/* MAIN IMAGE */}
      <div className="border border-dashed ">
        <div className="space-y-2  p-4">
        <label className="block text-lg mb-4" >Main Image</label>
        <div className="space-y-2 ">
          <div className="relative w-40 h-40">
            <label className="w-40 h-40 border border-dashed rounded flex items-center justify-center cursor-pointer border-slate-400 dark:border-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            {mainImage ? (
              <Image
                width={100}
                height={100}
                src={URL.createObjectURL(mainImage)}
                alt="Preview"
                className="object-cover w-full h-full rounded"
              />
            ) : (
              <Plus size={26} className="text-slate-600 dark:text-slate-300" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={e => e.target.files && setMainImage(e.target.files[0])}
              className="hidden"
            />
          </label>
          {mainImage && (
            <div
              onClick={removeMainImage}
              className="  absolute top-0 right-0 rounded-full bg-black w-6 h-6 flex items-center justify-center  cursor-pointer"
            >
              <X size={20} className="text-white " />
            </div>
          )}
          </div>
        </div>
      </div>

      {/* GALLERY IMAGES */}
      <div className="space-y-2  p-4">
        <label className="block text-lg mb-4 " > Gallery Images</label>
      <div className="flex gap-5 flex-wrap">
      
      {galleryImages.map((file, idx) => (
        <div key={idx} className="relative w-40 h-40 border rounded overflow-hidden">
          <Image
            src={URL.createObjectURL(file)}
            alt="Preview"
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
          <div
            onClick={() => removeGalleryImage(idx)}
            className="absolute top-1 right-1 rounded-full bg-black w-6 h-6 flex items-center justify-center cursor-pointer"
          >
            <X size={16} className="text-white" />
          </div>
        </div>
      ))}

      {/* Botón para agregar nuevas imágenes */}
      {galleryImages.length < 5 && (
        <label className="w-40 h-40 border border-dashed rounded flex items-center justify-center cursor-pointer border-slate-400 dark:border-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
          <Plus size={26} className="text-slate-600 dark:text-slate-300" />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={ e => {
              if (e.target.files) {
                const newFiles = Array.from(e.target.files).slice(0, 5 - galleryImages.length); 
                setGalleryImages(prev => [...prev, ...newFiles]);
              }
            } }
            className="hidden"
          />
        </label>
      )}
    </div>
      </div>
      </div>


      <Button 
        type="submit" 
        onClick={handleSubmit}
        className="w-full bg-slate-900 dark:bg-slate-600">
          Add Product
      </Button>
    </form>
  );
}
