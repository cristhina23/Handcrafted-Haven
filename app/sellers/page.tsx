import Meta from '@/components/Meta';
import { CarouselPlugin } from './LargeScreenCarousel';
import AsideSeller  from '@/components/Seller/Aside'; 
import BestArtisansByMonth from '@/components/Seller/MonthlyHonourSection';
import { NewArrivalCarousel } from '@/components/Seller/newArrivals';
import SellersList from '@/components/Seller/AllSellersSection';

export default function Page() {
    return (
        <>
            < Meta title="Sellers" />
            <div className='p-0 my-0'>
                <section className="relative w-full my-15 min-h-100 hero-section">
                <div className='absolute top-18 bg-(--brand-pale) h-56 w-full mt-0'>
                </div>
                 <div className="w-full flex flex-col justify-center items-center absolute top-0 left-1/2 -translate-x-1/2">
                    <CarouselPlugin />
                </div>
                </section>
                <div className='grid sm:grid-col md:grid-cols-3 gap-3'>
                    <AsideSeller />
                    <div className="col-span-2 mx-10 ml-0 mb-20 md:col-span-2 sm:col-span-3 sm:mx-10 mr-0 ">
                        <BestArtisansByMonth />
                        <NewArrivalCarousel />
                        <SellersList/>
                    </div>
                </div>
            </div>
        </>
    );
}