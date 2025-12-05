"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import Date from "@/components/ui/Date";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

export default function AsideSeller() {
    const [CategoryNameList, setName] = useState([]);
    
    return (
        <aside className="col-span-1 m-10">
            <section>
                <Card className="bg-(--brand-light-gray)">
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-xl font-merriweather font-bold text-center">Blog & Events</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul>
                            <Link href="#" className="flex gap-3 justify-center items-center text-xs border-b-1 m-0  py-3 rounded-xs">
                                <Image
                                 src="/images/events/International-handcraft-trade-fair.webp"
                                 alt="National Hand Craft Conference Day"
                                 width={50}
                                 height={50}
                                 className="rounded-full border h-12"
                                >
                                </Image>
                                <div className="border-l-2 border-black pl-2 rounded-sm">
                                    <h3>National Hand Craft Conference Day</h3>
                                    <Date fixedDate='December 21, 2025' />
                                </div>
                            </Link>
                            <Link href="#" className="flex gap-3 justify-center items-center text-xs border-b-1 m-0  py-3 rounded-xs">
                                <Image
                                 src="/images/events/india-handcraft-carnival-mobile.webp"
                                 alt="India Hand Craft display and Carnival"
                                 width={50}
                                 height={50}
                                 className="rounded-full border h-12"
                                >
                                </Image>
                                <div className="border-l-2 border-black pl-2 rounded-sm">
                                    <h3>India Hand Craft display and Carnival</h3>
                                    <Date fixedDate='January 5, 2026'/>
                                </div>
                            </Link>
                            <Link href="#" className="flex gap-3 justify-center items-center text-xs m-0  py-3 rounded-xs">
                                <Image
                                 src="/images/events/international-handcrat-trade-fair-mobile.webp"
                                 alt="International Hand Craft Trade Fair"
                                 width={50}
                                 height={50}
                                 className="rounded-full border h-12"
                                >
                                </Image>
                                <div className="border-l-2 border-black pl-2 rounded-sm">
                                    <h3>International HandCraft Trade Fair Day</h3>
                                    <Date fixedDate='Febuary 23, 2026' />
                                </div>
                            </Link>
                        </ul>
                    </CardContent>
                </Card>
            </section>
        </aside>
    )
}