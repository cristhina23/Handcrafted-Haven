"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import MostSellers from './sellersAvatar';
import SellerAvatar from './SingleSellerAvatar';
import { aggregateSellerData } from '@/types';

function MostRatedSection() {
    const [rated, setRated] = useState<aggregateSellerData[]>([]);

    useEffect(() => {
        fetch('/api/sellers?type=most-rated')
            .then(res => res.json())
            .then(value => setRated(value));
    }, [])
    return (
        <Card className="hidden bg-(--brand-dark) w-full lg:block lg:max-w-5xl">
            <CardContent className="grid grid-cols-3 gap-6 justify-center items-center h-[300px] p-8 w-full">
                
                <div className="col-span-1 flex flex-col justify-center w-full">
                <h2 className="font-merriweather text-(--brand-pale) text-4xl mb-6">
                    Most Rated Artisans
                </h2>

                <Link
                    href=""
                    className="px-8 py-3 text-lg text-center font-semibold bg-(--brand-pale) rounded-sm"
                >
                    See More
                </Link>
                </div>

                <div className="col-span-2 flex flex-row items-center justify-center ">
                    <MostSellers data={rated} />
                </div>

            </CardContent>

        </Card>
    )
}

function ActiveSellerSection() {
    const [activeSeller, setActive] = useState<aggregateSellerData[]>([]);

    useEffect(() => {
        fetch('/api/sellers?type=active')
            .then(res => res.json())
            .then(value => setActive(value));
    }, []);
    
    return (
        <Card className="hidden bg-(--brand-dark) w-full lg:block lg:max-w-5xl">
            <CardContent className="flex flex-col justify-center items-center h-[300px] p-6 ">
                
                <div className=" text-center text-(--brand-pale)">
                <h2 className="font-merriweather text-3xl mb-6">
                    Most Active Artisans
                </h2>
                </div>

                <div className='flex flex-row justify-center items-center gap-2 w-full'>
                    {activeSeller.map((seller) => (
                       <SellerAvatar key={seller._id} seller={seller} /> 
                    ))}

                </div>
            </CardContent>

        </Card>
    )
}

function TopSellersByCategory() {
    const [data, setData] = useState<aggregateSellerData[]>([]);
    console.log("Trending", data);
    useEffect(() => {
        fetch('/api/sellers?type=trending')
        .then(res => res.json())
        .then(value => setData(value))
    }, []);
    return (
        <Card className="hidden bg-(--brand-dark) w-full lg:block lg:max-w-5xl">
            <CardContent className="flex flex-col justify-center items-center h-[300px] p-6 ">
                
                <div className=" text-center text-(--brand-pale)">
                <h2 className="font-merriweather text-3xl mb-6">
                    Trending Artisans By Category
                </h2>
                </div>

                <div className='flex flex-row justify-center items-center gap-2 w-full'>
                    {data.map((seller) => (
                       <SellerAvatar key={seller._id} seller={seller} /> 
                    ))}
                </div>
            </CardContent>

        </Card>
    )
}


export const cards = [MostRatedSection,TopSellersByCategory,ActiveSellerSection]