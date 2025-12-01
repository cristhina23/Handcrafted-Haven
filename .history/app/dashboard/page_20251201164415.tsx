import DashboardPage from '@/components/Dashboard/DashboardPage'

interface Props {
  params: Promise<{ id: string }>; 
}

async function page({ params }: Props) {
  const resolvedParams = await params;

  return (
    <DashboardPage clerkId={resolvedParams.id} />
  )
}

export default page;
