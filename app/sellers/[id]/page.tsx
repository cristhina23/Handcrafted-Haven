import HeroBanner from "@/components/Seller/SellerDetails/HeroBanner";
import SellerProfile from "@/components/Seller/SellerDetails/SellerProfile";
import SellerTabs from "@/components/Seller/SellerDetails/SellerTabs";
import { getSellerById } from "@/lib/db/sellers";
import { notFound } from "next/navigation";

export default async function SellerPage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  return <SellerPageContent id={resolved.id} />;
}

// ⬇️ Componente asincrónico separado (Next 16 lo permite)
async function SellerPageContent({ id }: { id: string }) {
  const sellerDoc = await getSellerById(id);

  if (!sellerDoc) {
    notFound();
  }

  const seller = JSON.parse(JSON.stringify(sellerDoc));

  const sellerImage =
    "https://res.cloudinary.com/dttbqvomc/image/upload/v1765426095/banner2_l1fkbm.jpg";

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
