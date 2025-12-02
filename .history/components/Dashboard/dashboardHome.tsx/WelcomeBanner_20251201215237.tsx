import Image from 'next/image' 
import { useUser } from '@clerk/nextjs'; 
import { useSeller } from '@/contexts/SellerContext'; 

function WelcomeBanner() { 
  const {user } = useUser(); 
  const { seller, loading, error } = useSeller(); 
  
  return ( 
    <div className='w-full bg-linear-to-r from-indigo-500 from-10% via-sky-500 via-30% to-purple-500 to-90% p-6 rounded-md flex items-center gap-6'> 
      <Image 
        src={ seller?.profileImage ||user?.imageUrl || ''} 
        alt="User Image" 
        width={100} 
        height={100} className='rounded-lg overflow-hidden' /> 
      <div className='bg-white/45 backdrop-blur-lg p-'> 
        <h1 className='text-lg font-bold '>Welcome {user?.firstName}</h1> 
        <p>{seller?.shopName} is ready for another great day of growth.</p> 
      </div>
    </div> 
          
  ) 
} 

export default WelcomeBanner