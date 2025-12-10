"use client";

import { useSeller } from "@/contexts/SellerContext";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PenIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function MyStorePage() {
  const { seller, loading, updateSeller } = useSeller();
  const [edit, setEdit] = useState(false);
  const [localImage, setLocalImage] = useState<File | null>(null);
  const placeholderImage =
    "https://res.cloudinary.com/dttbqvomc/image/upload/v1765277755/1033311_847_c6xqta.jpg";

  const [form, setForm] = useState({
    shopName: "",
    bio: "",
    country: "",
    specialties: "",
    profileImage: "",
  });

  useEffect(() => {
    if (seller) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        shopName: seller.shopName || "",
        bio: seller.bio || "",
        country: seller.country || "",
        specialties: seller.specialties?.join(", ") || "",
        profileImage: seller.profileImage || "",
      });
    }
  }, [seller]);

  if (loading) return <p>Loading store...</p>;
  if (!seller) return <p>No store found.</p>;

  
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    try {
      let uploadedImageUrl = form.profileImage;

      
      if (localImage) {
        const formData = new FormData();
        formData.append("file", localImage);
        const res = await fetch("/api/upload-image", { method: "POST", body: formData });
        const data = await res.json();
        uploadedImageUrl = data.url;
      }

      
      await updateSeller({
        ...form,
        profileImage: uploadedImageUrl,
        specialties: form.specialties.split(",").map((s) => s.trim()), 
      });

      setLocalImage(null); 
      setEdit(false);
      toast.success("Store updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update store");
    }
  }

  function handleRemoveImage() {
    setLocalImage(null);
    setForm((prev) => ({
      ...prev,
      profileImage: seller?.profileImage || "",
    }));
  }

 
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border max-w-3xl mx-auto shado">
      <h1 className="text-2xl font-bold mb-6 text-center">My Store</h1>

      {/* PROFILE IMAGE */}
      <div className="flex flex-col items-center justify-center gap-4 mb-6 relative h-32 ">
        <div className="relative h-full rounded-md overflow-hidden  shadow">
          <Image
            width={200}
            height={200}
            src={localImage ? URL.createObjectURL(localImage) : form.profileImage || placeholderImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />

          {edit && (
            <div className="absolute top-0 right-0">
              {localImage ? (
                <button
                  onClick={handleRemoveImage}
                  className="bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-md hover:bg-red-600 transition"
                >
                  X
                </button>
              ) : (
                <label className="cursor-pointer bg-gray-200 dark:bg-gray-700 p-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center justify-center">
                  <PenIcon className="size-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (!e.target.files) return;
                      setLocalImage(e.target.files[0]);
                    }}
                  />
                </label>
              )}
            </div>
          )}
        </div>
      </div>

      {/* FORM FIELDS */}
      <div className="mb-4">
        <label className="font-semibold">Shop Name</label>
        {edit ? (
          <Input name="shopName" value={form.shopName} onChange={handleChange} />
        ) : (
          <p>{seller.shopName}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="font-semibold">Bio</label>
        {edit ? (
          <Textarea name="bio" value={form.bio} onChange={handleChange} rows={3} />
        ) : (
          <p>{seller.bio || "No bio yet."}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="font-semibold">Country</label>
        {edit ? (
          <Input name="country" value={form.country} onChange={handleChange} />
        ) : (
          <p>{seller.country}</p>
        )}
      </div>

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
