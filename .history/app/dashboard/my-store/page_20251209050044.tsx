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
    <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border ">
      <h1 className="text-2xl font-bold mb-6 text-center">My Store</h1>

    
      <div className="flex items-center justify-center gap-4 mb-6">
        <Image
          src={form.profileImage || "/placeholder.png"}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-md object-cover border"
        />
        {edit && (
          <Input
            name="profileImage"
            value={form.profileImage}
            onChange={handleChange}
            placeholder="Image URL"
            className="max-w-xs"
          />
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
