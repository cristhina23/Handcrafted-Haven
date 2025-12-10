import SellerAvatar from './SingleSellerAvatar';
import { aggregateSellerData } from '@/types';


interface DataProps{
    data: aggregateSellerData[],
}

export default function MostSellers({data}: DataProps) {
    return (
        <div className='flex flex-row justify-center items-center gap-3 w-full'>
            {data.map((seller) => (
               <SellerAvatar key={seller._id} seller={seller} /> 
            ))}
        </div>
    )
}