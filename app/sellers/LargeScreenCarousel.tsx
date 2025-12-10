"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { cards } from '../../components/Seller/MostRatedSeller';

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl"
      //onMouseEnter={plugin.current.stop}
      //onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="justify-center items-center">
        {cards.map((CardComponent, index) => (
          <CarouselItem key={index}className="justify-center items-center">
            <div className="p-1">
              <CardComponent/>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}