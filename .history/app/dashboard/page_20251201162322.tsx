
import DashboardPage from '@/components/Dashboard/DashboardPage'

interface Props {
  params: Promise<{ id: string }>; 
}

function page() {
   

  return (
    
      <DashboardPage />
    
  )
}

export default page