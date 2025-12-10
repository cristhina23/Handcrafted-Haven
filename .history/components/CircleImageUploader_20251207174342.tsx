"use client";

import Image from "next/image";
import { Plus, X } from "lucide-react";
import { useRef } from "react";

interface Props {
  image: File | null;
  onChange: (file: File | null) => void;
}

export default function CircleImageUploader({ image, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    onChange(e.target.files[0]);
  };

  const removeImage = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="relative w-40 h-40">
      <label
        className="
          w-40 h-40 rounded-full border border-dashed 
          border-slate-400 dark:border-slate-500 
          flex items-center justify-center cursor-pointer
          hover:bg-slate-200 dark:hover:bg-slate-700 transition
          overflow-hidden
        "
      >
        {image ? (
          <Image
            src={URL.createObjectURL(image)}
            width={160}
            height={160}
            alt="Preview"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <Plus size={32} className="text-slate-600 dark:text-slate-300" />
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {image && (
        <div
          onClick={removeImage}
          className="
            absolute -top-2 -right-2 bg-black text-white 
            w-7 h-7 rounded-full flex items-center justify-center 
            cursor-pointer shadow-lg
          "
        >
          <X size={18} />
        </div>
      )}
    </div>
  );
}
