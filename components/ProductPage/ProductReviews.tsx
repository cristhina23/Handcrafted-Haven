import React from "react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reviews: any[];
}

function ProductReviews({ reviews }: Props) {
  return (
    <div
      className="text-lg bg-white border border-slate-200
        text-slate-800 shadow-sm p-9 rounded-xl hover:shadow-lg transition-all duration-200 ease-out
      "
    >
      <h2 className="text-xl text-slate-800  font-bold mb-4">Customer Reviews</h2>

      {reviews.length === 0 && (
        <p className="text-slate-500 italic">No reviews yet. Be the first!</p>
      )}

      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="p-4 border border-slate-100 rounded-lg hover:shadow-md transition-all duration-200 ease-out"
          >
            {/* ⭐ Rating */}
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
            <p className="text-slate-700">{review.comment}</p>

            {/* Created at */}
            <p className="text-sm text-slate-400 mt-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductReviews;
