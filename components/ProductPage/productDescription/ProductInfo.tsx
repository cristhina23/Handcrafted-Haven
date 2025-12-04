"use client";
import { LiaShippingFastSolid } from "react-icons/lia";
import StarsRating from "../StarsRating";
import { formatDate, getDeliveryRange } from "@/lib/scripts/utils";
import { FaCheck } from "react-icons/fa6";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  price: number;
  rating?: number;
  ratingCount?: number;
  location?: string;
  seller: string;
  category?: string;
  stock: number;
  colors: string[];
  dimensions?: string;
  onAddToCart: () => void;
  onPayNow?: () => void;
}

export default function ProductInfo({
  title,
  description,
  price,
  rating,
  ratingCount,
  seller,
  category,
  stock,
  colors,
  dimensions,
  onAddToCart,
  onPayNow,
}: Props) {
  const { min, max } = getDeliveryRange(5);
  return (
    <div className="flex-1 flex flex-col gap-4 bg-white p-9 rounded-xl shadow-sm border border-slate-200">
      <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
      <div className="flex justify-between">
        <p className="font-semibold text-xl text-slate-800">Price: ${price}</p>
        <span className="flex items-center gap-2 text-green-600 text-semibold">
          <LiaShippingFastSolid size={20} /> Free Shipping!{" "}
        </span>
      </div>
      <div className="flex">
        <div className="flex gap-2">
          <StarsRating rating={rating ?? 4.3} />
          <p className="text-slate-600">({rating})</p>
          <p className="text-slate-600 px-2">Based on {ratingCount} Reviews</p>
        </div>
      </div>
      <div>
        <p className="flex items-center gap-2 text-slate-800">
          <FaCheck className="text-green-600" /> Arrives soon! Get it by{" "}
          <span className="font-semibold">
            {formatDate(min)} – {formatDate(max)}
          </span>{" "}
          if you order today!
        </p>
        <p className="flex items-center gap-2 text-slate-800">
          <FaCheck className="text-green-600" /> Returns & exchanges accepted
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-slate-700">
          <span className="font-semibold">Seller:</span> {seller}
        </p>
        <p className="text-slate-700">
          <span className="font-semibold">Category:</span> {category}
        </p>
        <p className="text-slate-700">
          <span className="font-semibold">Stock: </span>
          {stock}
        </p>
        <p className="text-slate-700">
          <span className="font-semibold">Colors:</span>{" "}
          {colors && colors.join(", ")}
        </p>
        <p className="text-slate-700">
          <span className="font-semibold">Dimensions:</span> {dimensions}
        </p>
        <div className="flex gap-4">
          <p className="text-slate-700 font-semibold">Payment Methos:</p>
          <div className="flex gap-2">
            <Image src="/mastercard.svg" alt="payment" width={35} height={35} />
            <Image src="/visa.svg" alt="payment" width={40} height={40} />
            <Image
              src="/american-express.svg"
              alt="payment"
              width={25}
              height={25}
            />
          </div>
        </div>
      </div>

      <div className=" w-full flex gap-4 mt-4">
        <button
          className="flex-1 bg-slate-800 text-white font-semibold py-2 px-4 rounded shadow-md hover:bg-slate-700 hover:shadow-xl hover:scale-[1.03] transition-all duration-200 ease-out  "
          onClick={onAddToCart}
        >
          Add to Cart
        </button>

        <button
          className="flex-1 border-4 border-slate-800  text-slate-800 font-semibold py-2 px-4 rounded shadow-md hover:bg-slate-800 hover:text-white hover:shadow-xl hover:scale-[1.03] transition-scale duration-200 ease-out"
          onClick={onPayNow || onAddToCart}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
