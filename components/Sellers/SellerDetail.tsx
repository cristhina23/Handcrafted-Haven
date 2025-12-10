import { useEffect, useState } from "react";
import CardsContainer from "@/components/ProductPage/CardsContainer";

export default function SellerDetail({ sellerId }: { sellerId: string }) {
  const [seller, setSeller] = useState<any>(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/seller/${sellerId}`).then((r) => r.json()),
      fetch(`/api/products?sellerId=${sellerId}`).then((r) => r.json()),
    ]).then(([sellerData, productsData]) => {
      setSeller(sellerData.seller);
      setProducts(productsData.products || []);
      setLoading(false);
    });
  }, [sellerId]);

  if (loading)
    return <div className="text-center py-10">Cargando seller...</div>;
  if (!seller)
    return <div className="text-center py-10">Seller no encontrado</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{seller.shopName}</h1>
      <p className="text-gray-700 mb-4">
        {seller.story || "Sin historia disponible."}
      </p>
      <h2 className="text-xl font-semibold mb-2">Productos publicados</h2>
      <CardsContainer products={products} />
    </div>
  );
}
