import Image from 'next/image';
import { Card } from "@/components/ui/card";
import Link  from 'next/link';
import { SellerAvatarProps } from '@/types';
import StarsRating from '@/components/ProductPage/StarsRating';


export default function SellerAvatar({ seller }: SellerAvatarProps) {
    return (
        <Link href="" className='max-h-50 flex flex-col items-center  '>
            <Card className='rounded-full aspect-2/2 p-0 max-h-35'>
                <Image
                    src={seller.image}
                    alt={seller.shopName}
                    width={100}
                    height={100} 
                    className='aspect-2/2  object-cover rounded-full w-full h-full'
                />
            </Card>
            <div className='text-(--brand-pale) text-base text-center'>
                <p className='text-base'>{seller.fullName}</p>
                <p className='text-sm'>{seller.shopName}</p>
                {seller.specialties && (
                    <p className='text-sm'>
                        Specialty: {seller.specialties}
                    </p>
                )}
                {seller.rating && (
                    <p className='flex gap-2 justify-center items-center '>
                     <StarsRating rating={seller.rating} /> {seller.rating}
                    </p>
                )}
                {seller.totalSales && (
                    <p className='text-sm font-bold'>
                        Sales: {seller.totalSales}
                    </p>
                )}
                {seller.totalReviews && (
                    <p className='text-sm text-(--brand-pale'>
                        Reviews: ({seller.totalReviews})
                    </p>
                )}
            </div>
        </Link>
    )
}