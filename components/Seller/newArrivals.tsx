"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface seller {
  _id: string,
  fullName: string,
  image: string
}

export function NewArrivalCarousel() {
    const [newArrivals, setNewArrivals] = useState([]);
    useEffect(() => {
        fetch('/api/sellers?type=new-arrival')
        .then(res => res.json())
        .then(data => setNewArrivals(data))
    })
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full grid justify-center items-center my-16 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl"
      //onMouseEnter={plugin.current.stop}
      //onMouseLeave={plugin.current.reset}
      >
            <div className="text-2xl font-bold mb-10">
                <h2>New Arrivals</h2>      
            </div>
      <CarouselContent className="w-full">
        {newArrivals.map((seller : seller) => (
          <CarouselItem key={seller._id} className=" sm:basis-1/3 md:basis-1/3 lg:basis-1/5">
            <div className="py-1 pr-1 pl-0">
              <Card className='rounded-full aspect-2/2 p-0 max-h-35'>
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <Image
                    src={seller.image}
                    alt={seller.fullName}
                    width={300}
                    height={300}
                    className="aspect-2/2 object-cover rounded-full w-full h-full">
                    </Image>
                </CardContent>
              </Card>
              <div className="text-lg text-(--brand-dark)">
              
                <h2>{seller.fullName}</h2>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
