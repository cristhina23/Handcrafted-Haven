"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Review {
  _id: string;
  userId:
    | {
        _id: string;
        fullName?: string;
        image?: string;
      }
    | string;
  rating: number;
  comment: string;
  createdAt: string;
  images?: string[];
}

interface Props {
  productId: string;
  sellerId: string;
  initialReviews: Review[];
}

function ProductReviews({ productId, sellerId, initialReviews }: Props) {
  const { user, isSignedIn } = useUser();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showAll, setShowAll] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [currentUserDbId, setCurrentUserDbId] = useState<string | null>(null);
  const [userHasReviewed, setUserHasReviewed] = useState(false);
  const [allReviewsLoaded, setAllReviewsLoaded] = useState(
    initialReviews.length < 3
  );

  // Get user's database ID
  useEffect(() => {
    const fetchUserDbId = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(`/api/user/check-profile?clerkId=${user.id}`);
        const data = await res.json();
        if (data.exists && data.user) {
          // We need the MongoDB _id, not just checking profile
          const userRes = await fetch(`/api/user/${user.id}`);
          const userData = await userRes.json();
          setCurrentUserDbId(userData._id);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserDbId();
  }, [user?.id]);

  // Check if user has already reviewed
  useEffect(() => {
    if (currentUserDbId) {
      const hasReviewed = reviews.some((review) => {
        const reviewUserId =
          typeof review.userId === "string" ? review.userId : review.userId._id;
        return reviewUserId === currentUserDbId;
      });
      setUserHasReviewed(hasReviewed);
    }
  }, [currentUserDbId, reviews]);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  const handleCreateReview = async (reviewData: {
    rating: number;
    comment: string;
    images?: string[];
  }) => {
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          sellerId,
          ...reviewData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error creating review");
        return;
      }

      // Add new review to the list
      setReviews([data.review, ...reviews]);
      setShowForm(false);
      setUserHasReviewed(true);
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Error creating review:", error);
      alert("Error creating review. Please try again.");
    }
  };

  const handleUpdateReview = async (reviewData: {
    rating: number;
    comment: string;
    images?: string[];
  }) => {
    if (!editingReview) return;

    try {
      const res = await fetch(`/api/reviews/${editingReview._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error updating review");
        return;
      }

      // Update review in the list
      setReviews(
        reviews.map((r) => (r._id === editingReview._id ? data.review : r))
      );
      setEditingReview(null);
      setShowForm(false);
      alert("Review updated successfully!");
    } catch (error) {
      console.error("Error updating review:", error);
      alert("Error updating review. Please try again.");
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Error deleting review");
        return;
      }

      // Remove review from the list
      setReviews(reviews.filter((r) => r._id !== reviewId));
      setUserHasReviewed(false);
      alert("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Error deleting review. Please try again.");
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingReview(null);
  };

  const handleWriteReview = () => {
    if (!isSignedIn) {
      alert("Please sign in to write a review");
      return;
    }
    setShowForm(true);
  };

  return (
    <div className="text-lg bg-white border border-slate-200 text-slate-800 shadow-sm p-9 rounded-xl hover:shadow-lg transition-all duration-200 ease-out">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-slate-800 font-bold">Customer Reviews</h2>

        {/* Write Review button - only show if user hasn't reviewed yet */}
        {isSignedIn && !userHasReviewed && !showForm && (
          <button
            onClick={handleWriteReview}
            className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors"
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="mb-6">
          <ReviewForm
            productId={productId}
            sellerId={sellerId}
            existingReview={editingReview}
            onSubmit={editingReview ? handleUpdateReview : handleCreateReview}
            onCancel={handleCancelForm}
          />
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 && (
        <p className="text-slate-500 italic">No reviews yet. Be the first!</p>
      )}

      <div className="flex flex-col gap-4">
        {displayedReviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            currentUserId={currentUserDbId}
            onEdit={handleEdit}
            onDelete={handleDeleteReview}
          />
        ))}
      </div>

      {/* Show More/Less Button */}
      {(reviews.length === 3 || reviews.length > 3) && (
        <button
          onClick={async () => {
            // Si no hemos cargado todas las reviews y queremos mostrar todas
            if (!allReviewsLoaded && !showAll) {
              try {
                const res = await fetch(`/api/reviews?productId=${productId}`);
                const data = await res.json();
                if (data.reviews && data.reviews.length > 0) {
                  setReviews(data.reviews);
                  setAllReviewsLoaded(true);
                }
              } catch (error) {
                console.error("Error fetching all reviews:", error);
              }
            }
            setShowAll(!showAll);
          }}
          className="mt-6 w-full py-3 px-4 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
        >
          {showAll ? (
            <>
              Show Less <ChevronUp size={20} />
            </>
          ) : (
            <>
              Show All Reviews {allReviewsLoaded && `(${reviews.length})`}{" "}
              <ChevronDown size={20} />
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default ProductReviews;
