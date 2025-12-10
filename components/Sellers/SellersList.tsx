import { useEffect, useState } from "react";
import SellerCard from "./SellerCard";

export default function SellersList() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sellers")
      .then((res) => res.json())
      .then((data) => {
        setSellers(data.sellers || []);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-center py-10">Cargando sellers...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {sellers.map((seller: any) => (
        <SellerCard key={seller._id} seller={seller} />
      ))}
    </div>
  );
}
