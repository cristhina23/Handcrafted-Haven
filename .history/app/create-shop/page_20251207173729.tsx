"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateShopPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const [loading, setLoading] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);

  const [form, setForm] = useState({
    shopName: "",
    bio: "",
    country: "",
    specialties: "",
    profileImage: "",
  });

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-800 text-xl">
        You must be logged in to create your shop.
      </div>
    );
  }

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImg(true);

    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Upload failed");
        setUploadingImg(false);
        return;
      }

      setForm((prev) => ({ ...prev, profileImage: data.url }));
    } catch (error) {
      console.error("Upload error:", error);
    }

    setUploadingImg(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/seller", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          specialties: form.specialties
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      router.push("/dashboard/seller");
    } catch (error) {
      console.error("Submit error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-20">
      <div className="bg-white shadow-xl border border-slate-200 p-10 rounded-xl max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">
          Create Your Shop
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Shop Name */}
          <div>
            <label className="text-slate-700 font-semibold">Shop Name</label>
            <input
              type="text"
              name="shopName"
              value={form.shopName}
              onChange={handleTextChange}
              required
              className="w-full p-3 rounded-md border border-slate-300 mt-1"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-slate-700 font-semibold">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleTextChange}
              rows={3}
              className="w-full p-3 rounded-md border border-slate-300 mt-1"
            />
          </div>

          {/* Country */}
          <div>
            <label className="text-slate-700 font-semibold">Country</label>
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleTextChange}
              required
              className="w-full p-3 rounded-md border border-slate-300 mt-1"
            />
          </div>

          {/* Specialties */}
          <div>
            <label className="text-slate-700 font-semibold">
              Specialties (comma separated)
            </label>
            <input
              type="text"
              name="specialties"
              value={form.specialties}
              onChange={handleTextChange}
              className="w-full p-3 rounded-md border border-slate-300 mt-1"
              placeholder="pottery, weaving, jewelry..."
            />
          </div>

          {/* Profile Image Upload */}
          <div>
            <label className="text-slate-700 font-semibold">
              Profile Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2"
            />

            {uploadingImg && (
              <p className="text-sm text-slate-600 mt-2">Uploading...</p>
            )}

            {form.profileImage && (
              <Image
                width={200}
                height={200}
                src={form.profileImage}
                alt="Preview"
                className="mt-3 w-32 h-32 object-cover rounded-md border"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className="
              bg-slate-900 text-white py-3 rounded-md mt-4 
              hover:bg-slate-800 transition font-semibold
              disabled:bg-slate-500
            "
          >
            {loading ? "Creating..." : "Create Shop"}
          </button>
        </form>
      </div>
    </div>
  );
}
