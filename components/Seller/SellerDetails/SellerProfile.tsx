import Image from "next/image";
import StarsRating from "@/components/ProductPage/StarsRating";

interface Props {
  name: string;
  bio: string;
  rating: number;
  reviews: number;
  image: string;
}

export default function SellerProfile({
  name,
  bio,
  rating,
  reviews,
  image,
}: Props) {
  return (
    <div className="bg-sky-100 sm:bg-sky-200 border-t-4 border-[var(--brand-light-blue)] sm:border-none text-sky-900 sm:text-sky-900 p-4 sm:p-6 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 rounded-xl shadow-md w-full max-w-4xl mx-auto">
      <Image
        src={image}
        alt={name}
        className="w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40 rounded-full border-4 border-[var(--brand-light-blue)] shadow-lg object-cover mx-auto md:mx-0"
        width={200}
        height={200}
      />
      <div className="w-full">
        <h2 className="text-lg sm:text-2xl font-bold text-sky-900 mb-2 text-center md:text-left">
          {name}
        </h2>
        <p className="text-sm sm:text-base opacity-90 max-w-full sm:max-w-[550px] text-sky-900 mb-2 text-center md:text-left">
          {bio}
        </p>
        <div className="flex gap-2 mt-2 items-center justify-center md:justify-start">
          <StarsRating rating={rating} />
          <span className="font-semibold">{rating}</span>
          <span className="text-sm opacity-80">({reviews} Reviews)</span>
        </div>
      </div>
    </div>
  );
}
