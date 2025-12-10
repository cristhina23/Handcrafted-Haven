import UserOrderDetailsPage from "@/components/UserDashboard/UserOrderDetailsPage";

export default function Page({ params }: { params: { id: string } }) {
  return <UserOrderDetailsPage orderId={params.id} />;
}
