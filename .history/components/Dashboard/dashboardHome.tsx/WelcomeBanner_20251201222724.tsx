import Image from 'next/image' 
import { useUser } from '@clerk/nextjs'; 
import { useSeller } from '@/contexts/SellerContext'; 

function WelcomeBanner() { 
  const {user } = useUser(); 
  const { seller, loading, error } = useSeller(); 
  
  return ( 
    <div className='w-full bg-slate-900 text-slate-900 p-6 rounded-md flex items-center gap-6'> 
      <Image 
        src={ seller?.profileImage ||user?.imageUrl || ''} 
        alt="User Image" 
        width={100} 
        height={100} className='rounded-lg overflow-hidden' /> 
      <div className='bg-white/25 backdrop-blur-lg p-4 rounded-lg'> 
        <h1 className='text-lg font-bold dark:text-slate-800 '>
          Welcome {user?.firstName}
        </h1> 
        <p className='dark:text-slate-800'><span className='font-bold'>
          {seller?.shopName}</span> is ready for another great day of growth.
        </p> 
      </div>
    </div> 
          
  ) 
} 

export default WelcomeBanner