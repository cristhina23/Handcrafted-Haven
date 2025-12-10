import Link from "next/link";

export default function SellerCard({ seller }: { seller: any }) {
  return (
    <Link href={`/sellers/${seller._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
        <div className="font-bold text-lg mb-2">{seller.shopName}</div>
        <div className="text-gray-600 mb-2">{seller.ownerName}</div>
        <div className="text-xs text-gray-400">{seller.email}</div>
        {/* Puedes agregar imagen/logo si existe: <img src={seller.logoUrl} /> */}
      </div>
    </Link>
  );
}
