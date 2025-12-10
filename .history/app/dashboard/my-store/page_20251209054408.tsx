"use client";

import { useState } from "react";
import ImageSelector from "@/components/ImageSelector";
import { useSeller } from "@/contexts/SellerContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function MyStorePage() {
  const { seller, loading, error } = useSeller();

  const [edit, setEdit] = useState(false);

  // Form state
  const [form, setForm] = useState({
    shopName: seller?.shopName || "",
    bio: seller?.bio || "",
    country: seller?.country || "",
    profileImage: seller?.profileImage || "",
    newProfileImageFile: null as File | null,
  });

  if (loading) return <p className="p-6">Loading store...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!seller) return <p>No seller found.</p>;

  // Handle text change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleSubmit = async () => {
    const data = new FormData();

    data.append("shopName", form.shopName);
    data.append("bio", form.bio);
    data.append("country", form.country);

    if (form.newProfileImageFile) {
      data.append("image", form.newProfileImageFile);
    }

    const res = await fetch("/api/seller/update-store", {
      method: "PUT",
      body: data,
    });

    if (!res.ok) {
      alert("Error updating store");
      return;
    }

    alert("Store updated!");
    setEdit(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">My Store</h2>
        <Button onClick={() => setEdit(!edit)}>
          {edit ? "Cancel" : "Edit"}
        </Button>
      </div>

      {/* Image + selector */}
      <div className="flex items-center justify-center mb-6">
        <ImageSelector
          originalImage={form.profileImage}
          onChange={(file) => setForm({ ...form, newProfileImageFile: file })}
        />
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-6">
        <div>
          <label className="font-medium">Shop Name</label>
          <Input
            name="shopName"
            value={form.shopName}
            disabled={!edit}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="font-medium">Bio</label>
          <Textarea
            name="bio"
            value={form.bio}
            disabled={!edit}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div>
          <label className="font-medium">Country</label>
          <Input
            name="country"
            value={form.country}
            disabled={!edit}
            onChange={handleChange}
          />
        </div>

        {edit && (
          <Button className="mt-4" onClick={handleSubmit}>
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
}
