// ConfirmDeleteModal.tsx
"use client";

import React from "react";
import { X, Trash2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  productName,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-[90%] max-w-md shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            Delete Product
          </h2>
          <button
            onClick={onClose}
            className="text-slate-600 dark:text-slate-300 hover:text-red-500"
          >
            <X size={22} />
          </button>
        </div>

        <p className="mb-6 text-slate-700 dark:text-slate-300">
          Are you sure you want to delete <span className="font-bold">{productName}</span>? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex items-center gap-2 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
