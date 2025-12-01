
import DashboardPage from '@/components/Dashboard/DashboardPage'

interface Props {
  params: Promise<{ id: string }>; 
}

function page({ params }: Props) {async 
   const resolvedParams = await params; 

  return (
    
      <DashboardPage clerkId={resolvedParams.clerkId} />
    
  )
}

export default page