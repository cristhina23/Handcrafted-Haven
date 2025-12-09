"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Review {
  _id: string;
  comment: string;
  userId?: {
    fullName?: string;
  };
}

export function CarouselOrientation() {
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    fetch("/api/reviews/featured")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching featured reviews:", err));
  }, []);
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      orientation="vertical"
      className="w-full max-w-xs self-center"
    >
      <CarouselContent className="-mt-1  h-[200px] ">
        {reviews.map((review) => (
          <CarouselItem key={review._id} className="pt-1 md:basis-1/1">
            <div className="p-1">
              <Card className="bg-transparent py-3 border-(--brand-light-gray) text-(--brand-pale)">
                <CardContent className="flex flex-col p-5">
                  <q>{review.comment}</q>
                  <p className="font-semibold mt-3 ">
                    {review.userId?.fullName ?? "anonymous user"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
