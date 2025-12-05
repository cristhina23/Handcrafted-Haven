import Meta from '@/components/Meta';
import { CarouselPlugin } from './LargeScreenCarousel';
import AsideSeller  from '@/components/Seller/Aside'; 
import BestArtisansByMonth from '@/components/Seller/MonthlyHonourSection';

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
                <div className='grid grid-cols-3 gap-3'>
                    <AsideSeller />
                    <div className="col-span-2 mr-10 ml-0 mb-20">
                        <BestArtisansByMonth/>
                    </div>
                </div>
            </div>
        </>
    );
}