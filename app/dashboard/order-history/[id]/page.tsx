import UserOrderDetailsPage from "@/components/UserDashboard/UserOrderDetailsPage";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 

  return <UserOrderDetailsPage orderId={id} />;
}
