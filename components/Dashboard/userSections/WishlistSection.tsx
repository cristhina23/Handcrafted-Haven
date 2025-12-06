"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function WishlistSection() {
  const { data, error, isLoading } = useSWR("/api/wishlist/user", fetcher);

  if (isLoading) return <div>Loading wishlist...</div>;
  if (error) return <div>Error loading wishlist</div>;

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Your Wishlist</h3>

      {(!data || data.length === 0) && (
        <p className="text-sm">Your wishlist is empty.</p>
      )}

      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.map((item: any) => (
          <li key={item._id} className="p-3 border rounded-md">
            <img src={item.images?.[0]} alt="" className="rounded-md mb-2" />
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm">${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
