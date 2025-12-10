"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateShopPage() {
  const router = useRouter();

  const [shopName, setShopName] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [specialties, setSpecialties] = useState("");

  const [tempSellerImage, setTempSellerImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  
  const handleLocalImage = (file: File) => {
    setTempSellerImage(file);
  };

  const removeSellerImage = () => {
    setTempSellerImage(null);
  };

  
  const uploadImageOnSubmit = async () => {
    if (!tempSellerImage) return "";

    const formData = new FormData();
    formData.append("file", tempSellerImage);

    const res = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url || "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    
    const uploadedImageUrl = await uploadImageOnSubmit();

    
    const specialtiesArray = specialties
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    
    const body = {
      shopName,
      bio,
      country,
      specialties: specialtiesArray,
      profileImage: uploadedImageUrl, 
    };

    const res = await fetch({`/api/seller/`}, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Error creating seller profile.");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto md:my-8 py-10 px-4 text-slate-900 bg-white rounded-xl md:px-8 border border-gray-200 shadow-2xl">
      <h1 className="text-3xl font-bold mb-4">Create Your Shop</h1>
      <p className="mb-6 text-slate-700">Share your story and start selling your handmade creations.</p>

      <form onSubmit={handleSubmit} className="space-y-6">

        
        <div className="flex flex-col items-center gap-3 ">
          <div className="relative w-40 h-40">
            <label className="w-40 h-40 border border-dashed rounded-full flex items-center justify-center cursor-pointer border-slate-400 hover:bg-slate-200 transition">
              {tempSellerImage ? (
                <Image
                  src={URL.createObjectURL(tempSellerImage)}
                  alt="Preview"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full rounded-full"
                />
              ) : (
                <Plus size={32} className="text-slate-600" />
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleLocalImage(e.target.files[0]);
                  }
                }}
              />
            </label>

            {tempSellerImage && (
              <div
                onClick={removeSellerImage}
                className="absolute top-1 right-1 rounded-full bg-black w-8 h-8 flex items-center justify-center cursor-pointer"
              >
                <X size={20} className="text-white" />
              </div>
            )}
          </div>

          <p className="text-sm text-slate-700">
            Upload your profile picture
          </p>
        </div>

        
        <div>
          <label className="block text-sm font-medium mb-1">Shop Name</label>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-full border p-2 rounded bg-white"
            required
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium mb-1">Your Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full border p-2 rounded bg-white"
            placeholder="Tell buyers about your story and crafting journey..."
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border p-2 rounded bg-white"
          />
        </div>

     
        <div>
          <label className="block text-sm font-medium mb-1">Specialties</label>
          <input
            type="text"
            value={specialties}
            onChange={(e) => setSpecialties(e.target.value)}
            className="w-full border p-2 rounded bg-white"
            placeholder="wood carving, pottery, jewelry..."
          />
        </div>

        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white py-3 rounded hover:bg-slate-800 transition"
        >
          {loading ? "Creating Shop..." : "Create My Shop"}
        </button>
      </form>
    </div>
  );
}
