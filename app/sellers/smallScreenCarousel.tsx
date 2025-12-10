'use client';

import * as React from "react";
import { useState, useEffect } from "react";
import { FaAward } from 'react-icons/fa'; 
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";


interface Seller {
    _id: string
    shopName :string,
    profileImage?: string,
    rating?: number,
    specialties?: string,
    totalReviews?: number,
    fullName: string,
    image: string,
    userId?: string,
    totalSales?: number
}

export function SmallCarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const [Data, setData] = useState<Seller[]>([]); 

  useEffect(() => {
    async function fetchAllSellerData() {
      
      const [ratedRes, trendingRes, activeRes] = await Promise.all([
        fetch('/api/sellers?type=most-rated'),
        fetch('/api/sellers?type=trending'),
        fetch('/api/sellers?type=active')
      ]);

      if (!ratedRes.ok || !trendingRes.ok || !activeRes.ok) {
          console.error("One or more API fetches failed.");
        
          return; 
      }

      const ratedData: Seller[] = await ratedRes.json();
      const trendingData: Seller[] = await trendingRes.json();
      const activeData: Seller[] = await activeRes.json();

      const combinedList = [...ratedData, ...trendingData, ...activeData];
      
      const uniqueCombinedList = Array.from(new Set(combinedList.map(s => s._id)))
        .map(id => combinedList.find(s => s._id === id)!);
      
      setData(uniqueCombinedList);
    }

    fetchAllSellerData();
  }, []); 

  return (
    <Carousel
      plugins={[plugin.current]}
          className="w-full flex flex-col justify-center items-center max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="max-w-md">
        {Data.map((seller) => (
          <CarouselItem key={seller._id} className="basis-1/3 flex flex-col justify-center items-center">
            <div className="p-1">
              <Card className="border-2 rounded-full p-0 ">
                <CardContent className="flex aspect-square items-center justify-center p-0 ">
                    <Image
                    src={seller.image}
                    alt={seller.fullName}
                    width={150}
                    height={150}
                    className="object-cover w-full h-full rounded-full aspect-2/2"
                    />
                </CardContent>
              </Card>
            </div>
                <div className="text-center">
                    <h2>{seller.fullName}</h2>
                    {seller.rating && (
                        <div className="flex flex-row justify-center items-center font-bold gap-1">
                            <p className="text-sm font-semibold">Most Rated
                            </p>
                            <FaAward size={15} color="gold" />
                        </div>
                    )}
                    {seller.totalSales && (
                        <div className="flex flex-row justify-center items-center font-bold">
                            <p className="text-sm font-semibold">Most Active Seller
                            </p>
                            <FaAward size={15} color="dark-gray" />
                        </div>
                    )}
                    {!seller.totalSales && !seller.rating && (
                        <div className="flex flex-row justify-center items-center font-bold">
                            <p className="text-sm font-semibold">Most Trending Artisans
                            </p>
                            <FaAward size={15} color="brown" />
                        </div>
                    )}
                </div>    
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
