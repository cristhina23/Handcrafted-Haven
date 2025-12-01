
import DashboardPage from '@/components/Dashboard/DashboardPage'

interface Props {
  params: Promise<{ id: string }>; 
}

function page({ params }: Props) {
   

  return (
    
      <DashboardPage clerkId={resolvedParams.} />
    
  )
}

export default page