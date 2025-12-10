import Meta from '@/components/Meta';
import { CarouselPlugin } from './LargeScreenCarousel';
import { SmallCarouselPlugin } from './smallScreenCarousel';
import AsideSeller  from '@/components/Seller/Aside'; 
import BestArtisansByMonth from '@/components/Seller/MonthlyHonourSection';
import { NewArrivalCarousel } from '@/components/Seller/newArrivals';
import SellersList from '@/components/Seller/AllSellersSection';

export default function Page() {
    return (
        <>
            < Meta title="Sellers" />
            <div className='p-0 my-0 '>
                <section className=" sm:relative w-full my-15 min-h-100 hero-section">
                <div className='hidden sm:block sm:absolute top-18 bg-(--brand-pale) h-56 w-full mt-0'>
                </div>
                 <div className="hidden sm:flex w-full flex-col justify-center items-center absolute top-0 left-1/2 -translate-x-1/2">
                    <CarouselPlugin />
                </div>
                <div className="W-full flex flex-col justify-center items-center sm:hidden md:hidden lg:hidden">
                    <div className='w-full text-center py-4 px-6 bg-(--brand-dark) mb-10'>
                        <h1 className='text-(--brand-light-blue) text-2xl font-semibold font-merriweather'> Hall of Fame</h1>
                    </div>
                    <SmallCarouselPlugin/>
                </div>
                </section>
                <div className='grid sm:grid-col md:grid-cols-3 gap-2'>
                    <AsideSeller />
                    <div className="grid justify-center items-center mx-0 ml-0 mb-20 md:col-span-2  sm:mx-5 mr-0 ">
                        <BestArtisansByMonth />
                        <NewArrivalCarousel />
                        <SellersList/>
                    </div>
                </div>
            </div>
        </>
    );
}