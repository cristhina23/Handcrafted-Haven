"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
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
    }, []);
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full grid justify-center items-center mx-0 my-16 "
      //onMouseEnter={plugin.current.stop}
      //onMouseLeave={plugin.current.reset}
      >
            <div className="text-2xl font-bold mb-10">
                <h2>New Arrivals</h2>      
            </div>
      <CarouselContent className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl p-0 ">
        {newArrivals.map((seller : seller) => (
          <CarouselItem key={seller._id} className="basis-1/3 sm:basis-1/5 md:basis-1/5 lg:basis-1/5">
            <div className="py-1 pr-1 pl-0 ">
              <Card className='flex justify-self-center rounded-full aspect-2/2 p-0 max-h-25 sm:max-h-40'>
                <Link href="#" className="flex aspect-square items-center justify-center p-0">
                  <Image
                    src={seller.image}
                    alt={seller.fullName}
                    width={300}
                    height={300}
                    className="aspect-2/2 object-cover  rounded-full w-full h-full">
                    </Image>
                </Link>
              </Card>
              <div className="text-base text-(--brand-dark)">
                <h2 className="text-center text-(--brand-dark)">{seller.fullName}</h2>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
