"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface Review {
  _id?: string;
  rating: number;
  comment: string;
  images?: string[];
}

interface Props {
  productId: string;
  sellerId: string;
  existingReview?: Review | null;
  onSubmit: (reviewData: {
    rating: number;
    comment: string;
    images?: string[];
  }) => Promise<void>;
  onCancel: () => void;
}

export default function ReviewForm({
  existingReview,
  onSubmit,
  onCancel,
}: Props) {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setComment(existingReview.comment);
    }
  }, [existingReview]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    if (comment.trim().length < 10) {
      alert("Please write a review with at least 10 characters");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ rating, comment });
      // Reset form if it's a new review
      if (!existingReview) {
        setRating(0);
        setComment("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 border border-slate-200 rounded-lg bg-slate-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-800">
          {existingReview ? "Edit Your Review" : "Write a Review"}
        </h3>
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHoveredRating(i + 1)}
                onMouseLeave={() => setHoveredRating(0)}
                className="text-3xl transition-colors focus:outline-none"
              >
                <span
                  className={
                    i < (hoveredRating || rating)
                      ? "text-yellow-500"
                      : "text-slate-300"
                  }
                >
                  ★
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Your Review <span className="text-red-500">*</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={4}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
            minLength={10}
          />
          <p className="text-xs text-slate-500 mt-1">
            Minimum 10 characters ({comment.length}/10)
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? "Submitting..."
              : existingReview
              ? "Update Review"
              : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
}
