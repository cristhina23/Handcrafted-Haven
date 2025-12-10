"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Pencil, X } from "lucide-react";

interface Props {
  originalImage: string;
  onChange: (file: File | null) => void;
}

export default function ImageSelector({ originalImage, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    onChange(null); 
  };

  return (
    <div className="relative w-[100px] h-[100px]">
      
      <Image
        src={preview || originalImage }
        alt="Profile Image"
        fill
        className="rounded-md object-cover border"
      />

      {/* Botón lapicito (solo si NO hay archivo seleccionado) */}
      {!selectedFile && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute top-1 left-1 bg-black/60 p-1 rounded-md text-white hover:bg-black/80 transition"
        >
          <Pencil size={14} />
        </button>
      )}

      {/* Botón X (solo cuando ya hay una nueva imagen seleccionada) */}
      {selectedFile && (
        <button
          type="button"
          onClick={clearSelection}
          className="absolute top-1 left-1 bg-red-600 p-1 rounded-md text-white hover:bg-red-700 transition"
        >
          <X size={14} />
        </button>
      )}

      {/* Input File oculto */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleSelectImage}
      />
    </div>
  );
}
