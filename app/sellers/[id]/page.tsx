import HeroBanner from "@/components/Seller/SellerDetails/HeroBanner";
import SellerProfile from "@/components/Seller/SellerDetails/SellerProfile";
import SellerTabs from "@/components/Seller/SellerDetails/SellerTabs";
import { getSellerById } from "@/lib/db/sellers";
import { notFound } from "next/navigation";



export default async function SellerPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const sellerDoc = await getSellerById(id);
    const sellerImage = 'https://res.cloudinary.com/dttbqvomc/image/upload/v1765426095/banner2_l1fkbm.jpg'

  const seller = JSON.parse(JSON.stringify(sellerDoc))

  if (!seller || seller.length === 0) {
    notFound()
  }

  return (
    <div className="w-full flex flex-col">
      <HeroBanner banner={sellerImage} />

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