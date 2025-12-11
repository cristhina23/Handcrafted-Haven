import Image from 'next/image';
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
  image
}: Props) {
  return (
    <div className="bg-transparent sm:bg-(--brand-dark) border-[#555] border-t-4 sm:border-none sm:border-none sm:text-(--brand-pale) p-4 flex flex-col md:flex-row items-start gap-4">
      
      <Image
        src={image}
        alt={name}
        className="w-30 h-30 object-cover rounded-full border-2 border-dark shadow-md -mt-15 ml-5 md:ml-20 md:w-40 md:h-42 "
        width={200}
        height={200}
      />

      <div>
        <h2 className="text-xl font-bold text-(--brand-dark) sm:text-(--brand-pale)">
          {name}
        </h2>
        <p className="text-sm opacity-80 max-w-[550px] text-(--brand-dark) sm:text-(--brand-pale)">
          {bio}
        </p>
        <div className="flex gap-2 mt-2 items-center">
          <StarsRating rating={rating} /><span>{rating}</span>
          <span className="text-sm opacity-80">({reviews} Reviews)</span>
        </div>
      </div>
    </div>
  );
}
