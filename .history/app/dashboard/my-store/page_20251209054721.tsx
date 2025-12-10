"use client";

import { useSeller } from "@/contexts/SellerContext";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function MyStorePage() {
  const { seller, loading, error } = useSeller();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    shopName: seller?.shopName || "",
    bio: seller?.bio || "",
    country: seller?.country || "",
    specialties: seller?.specialties?.join(", ") || "",
    profileImage: seller?.profileImage || "",
  });

  if (loading) return <p>Loading store...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!seller) return <p>No store found.</p>;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    try {
      const res = await fetch("/api/seller/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          specialties: form.specialties.split(",").map(s => s.trim()),
        }),
      });

      if (!res.ok) throw new Error("Failed to update store");

      setEdit(false);
      // Opcional: refrescar página
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">My Store</h1>

    
      {/* PROFILE IMAGE UPLOAD */}
<div className="flex flex-col items-center justify-center gap-4 mb-6">
  <div className="relative w-28 h-28 rounded-full overflow-hidden border shadow">
    <Image
      src={form.profileImage || "/placeholder.png"}
      alt="Profile"
      fill
      className="object-cover"
    />
  </div>

  {edit && (
    <div className="flex flex-col items-center gap-2">
      <label className="cursor-pointer bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-md text-sm hover:bg-slate-300 dark:hover:bg-slate-600 transition">
        Upload Image
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            if (!e.target.files) return;

            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "the_new_one");

            try {
              const res = await fetch(
                "https://api.cloudinary.com/v1_1/dttbqvomc/image/upload",
                { method: "POST", body: formData }
              );
              const data = await res.json();

              setForm((prev) => ({
                ...prev,
                profileImage: data.secure_url, // reemplaza la imagen
              }));
            } catch (err) {
              console.error("Error uploading image:", err);
            }
          }}
        />
      </label>

      <Input
        name="profileImage"
        value={form.profileImage}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, profileImage: e.target.value }))
        }
        placeholder="Or paste image URL"
        className="max-w-xs"
      />
    </div>
  )}
</div>


      {/* Shop name */}
      <div className="mb-4">
        <label className="font-semibold">Shop Name</label>
        {edit ? (
          <Input name="shopName" value={form.shopName} onChange={handleChange} />
        ) : (
          <p>{seller.shopName}</p>
        )}
      </div>

      {/* Bio */}
      <div className="mb-4">
        <label className="font-semibold">Bio</label>
        {edit ? (
          <Textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={3}
          />
        ) : (
          <p>{seller.bio || "No bio yet."}</p>
        )}
      </div>

      {/* Country */}
      <div className="mb-4">
        <label className="font-semibold">Country</label>
        {edit ? (
          <Input name="country" value={form.country} onChange={handleChange} />
        ) : (
          <p>{seller.country}</p>
        )}
      </div>

      {/* Specialties */}
      <div className="mb-4">
        <label className="font-semibold">Specialties</label>
        {edit ? (
          <Input
            name="specialties"
            value={form.specialties}
            onChange={handleChange}
            placeholder="e.g. shirts, handmade items"
          />
        ) : (
          <p>{seller.specialties.join(", ")}</p>
        )}
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-6 bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
        <div>
          <p className="text-sm text-gray-500">Rating</p>
          <p className="text-xl font-bold">{seller.rating.toFixed(1)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Sales</p>
          <p className="text-xl font-bold">{seller.totalSales}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        {!edit ? (
          <Button onClick={() => setEdit(true)}>Edit Store</Button>
        ) : (
          <>
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={() => setEdit(false)}>
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
