"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Plus } from "lucide-react";
import Image from "next/image";

interface Seller {
  shopName: string;
  bio: string;
  country: string;
  specialties: string[];
  profileImage?: string;
}

interface Props {
  seller: Seller;
  onSave: (updated: Seller, file?: File) => void;
}

export default function EditSellerProfile({ seller, onSave }: Props) {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<Seller>({
    shopName: "",
    bio: "",
    country: "",
    specialties: [],
    profileImage: "",
  });

  const [localImage, setLocalImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (seller) {
      setForm({
        ...seller,
        specialties: seller.specialties || [],
        profileImage: seller.profileImage || "",
      });
    }
  }, [seller]);

  // -------------------- FUNCIONES --------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setLocalImage(e.target.files[0]);
  };

  const removeImage = () => {
    setLocalImage(null);
    setForm({ ...form, profileImage: seller.profileImage || "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = () => {
    onSave(form, localImage || undefined);
    setEdit(false);
    setLocalImage(null);
  };

  // -------------------- RENDER --------------------
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white dark:bg-slate-900 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Store Profile</h2>

      {/* PROFILE IMAGE */}
      <div className="relative w-28 h-28 mb-4">
        {localImage ? (
          <Image
            fill
            src={URL.createObjectURL(localImage)}
            alt="Preview"
            className="object-cover w-full h-full rounded"
          />
        ) : (
          <Image
            src={form.profileImage || "/placeholder.png"}
            alt="Profile"
            fill
            className="object-cover rounded"
          />
        )}

        {edit && (
          <div className="absolute top-1 right-1 flex gap-1">
            {localImage ? (
              <button
                onClick={removeImage}
                className="bg-black/70 text-white rounded-full p-1"
              >
                <X size={16} />
              </button>
            ) : (
              <label className="cursor-pointer bg-gray-200 dark:bg-gray-700 p-1 rounded">
                <Plus size={16} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        )}
      </div>

      {/* FORM FIELDS */}
      <div className="space-y-3">
        <label className="block">
          Shop Name
          <input
            className="w-full p-2 border rounded dark:bg-slate-700 dark:text-slate-200"
            name="shopName"
            value={form.shopName}
            onChange={handleChange}
            disabled={!edit}
          />
        </label>
        <label className="block">
          Bio
          <textarea
            className="w-full p-2 border rounded dark:bg-slate-700 dark:text-slate-200"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            disabled={!edit}
          />
        </label>
        <label className="block">
          Country
          <input
            className="w-full p-2 border rounded dark:bg-slate-700 dark:text-slate-200"
            name="country"
            value={form.country}
            onChange={handleChange}
            disabled={!edit}
          />
        </label>
      </div>

      {/* BOTONES */}
      <div className="flex gap-3 mt-4">
        {!edit ? (
          <button
            onClick={() => setEdit(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setEdit(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
