import UserOrderDetailsPage from "@/components/UserDashboard/UserOrderDetailsPage";


export default async function Page(props: { params: Promise<{ id: string }> }) {
  return <UserOrderDetailsPage orderId={(await props.params).id} />;
}
