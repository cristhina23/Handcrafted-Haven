"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function OrdersSection() {
  const { data, error, isLoading } = useSWR("/api/orders/user", fetcher);

  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Error loading orders</div>;

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Your Orders</h3>

      {(!data || data.length === 0) && (
        <p className="text-sm">You have no orders yet.</p>
      )}

      <ul className="flex flex-col gap-3">
        {data?.map((o: any) => (
          <li key={o._id} className="border p-3 rounded-md">
            <p><strong>ID:</strong> {o._id}</p>
            <p><strong>Status:</strong> {o.status}</p>
            <p><strong>Total:</strong> ${o.total}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
