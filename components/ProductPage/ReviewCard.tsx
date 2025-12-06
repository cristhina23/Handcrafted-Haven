"use client";
import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

interface Review {
  _id: string;
  userId: {
    _id: string;
    fullName?: string;
    image?: string;
  } | string;
  rating: number;
  comment: string;
  createdAt: string;
  images?: string[];
}

interface Props {
  review: Review;
  currentUserId: string | null;
  onEdit: (review: Review) => void;
  onDelete: (reviewId: string) => void;
}

export default function ReviewCard({
  review,
  currentUserId,
  onEdit,
  onDelete,
}: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { user } = useUser();
  
  // Handle both populated and unpopulated userId
  const userId = typeof review.userId === 'string' ? review.userId : review.userId._id;
  const userName = typeof review.userId === 'object' ? review.userId.fullName : 'Anonymous';
  let userImage = typeof review.userId === 'object' ? review.userId.image : null;
  
  // If this is the current user's review and we have Clerk user data, use Clerk's image
  const isOwner = currentUserId && userId === currentUserId;
  if (isOwner && user?.imageUrl) {
    userImage = user.imageUrl;
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    setIsDeleting(true);
    try {
      await onDelete(review._id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4 border border-slate-100 rounded-lg hover:shadow-md transition-all duration-200 ease-out relative">
      {/* User Avatar and Name */}
      <div className="flex items-center gap-3 mb-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
          {userImage && !imageError ? (
            <Image
              src={userImage}
              alt={userName || 'User'}
              fill
              className="object-cover"
              onError={() => {
                console.error('Failed to load image:', userImage);
                setImageError(true);
              }}
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold text-sm">
              {userName ? userName.charAt(0).toUpperCase() : 'A'}
            </div>
          )}
        </div>
        <div>
          <p className="font-medium text-slate-800">{userName || 'Anonymous'}</p>
          <p className="text-xs text-slate-400">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Action buttons - only show for owner */}
      {isOwner && (
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => onEdit(review)}
            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit review"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            title="Delete review"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      {/* Rating */}
      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < review.rating ? "text-yellow-500" : "text-slate-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Comment */}
      <p className="text-slate-700 pr-16">{review.comment}</p>

      {/* Images if any */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mt-3">
          {review.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Review image ${idx + 1}`}
              className="w-20 h-20 object-cover rounded-lg"
            />
          ))}
        </div>
      )}
    </div>
  );
}
