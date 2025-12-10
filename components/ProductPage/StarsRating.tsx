import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface Props {
  rating: number; 
}

export default function StarsRating({ rating }: Props) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <span className="flex items-center gap-1">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <FaStar key={i} className="text-yellow-400 text-lg" />
        ))}

      {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 text-lg" />}

      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <FaRegStar key={i} className="text-gray-400 text-lg" />
        ))}
    </span>
  );
}
