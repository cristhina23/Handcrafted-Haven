import * as React from "react"
/*import { faker } from '@faker-js/faker';*/
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getSellers } from "@/lib/db/sellers";


const sellers = await getSellers()
export function CarouselSpacing() {
  const imageSource = seller.userId.image
  return (
    <Carousel className="w-full justify-self-center my-16 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
      <CarouselContent className="-ml-1 ">
        {sellers.map((seller) => (
          <CarouselItem key={seller._id} className="pl-1 rounded-full  basis-1/1 sm:basis-1/3 md:basis-1/5 lg:basis-1/5 xl:basis-1/5">
            <div className="p-1 ">
              <Card className="rounded-full p-0 ">
                <CardContent className="aspect-2/2 w-full rounded-full p-0 ">
                  <Image
                    src={i}
                    alt="seller"
                    width={300}
                    height={300}
                    className="aspect-2/2 object-cover rounded-full w-full h-full"></Image>
                </CardContent>
              </Card>
            </div>
            <p className="text-center font-sembold text-lg mt-3 ">{seller.userId.fullName}</p>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
