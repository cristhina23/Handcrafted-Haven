import HeroBanner from "@/components/Seller/SellerDetails/HeroBanner";
import SellerProfile from "@/components/Seller/SellerDetails/SellerProfile";
import SellerTabs from "@/components/Seller/SellerDetails/SellerTabs";
import { getSellerById } from "@/lib/db/sellers";
import { notFound } from "next/navigation";

export default async function SellerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sellerDoc = await getSellerById(id);
  const seller = JSON.parse(JSON.stringify(sellerDoc));

  if (!seller || seller.length === 0) {
    notFound();
  }
  console.log("Seller:", seller);
  return (
    <div className="w-full flex flex-col">
      <HeroBanner banner={seller.profileImage} />
      <SellerProfile
        name={seller.shopName}
        bio={seller.bio}
        rating={seller.rating}
        reviews={seller.reviews}
        image={seller.userId.image}
      />

      <SellerTabs id={seller._id} />
    </div>
  );
}
