"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';


import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";


interface categoryProps{
    _id: string,
    name: string,
    image: string
    description: string
}

export default function AllFilters() {
    const [categoryNameList, setName] = useState([]);

    useEffect(() => {
        fetch('/api/categories')
        .then(res => res.json())
        .then(data => setName(data))
    }, []);
    
    return (
       <section>
            <Card className="bg-(--brand-light-gray)">
                <CardHeader>
                    <CardTitle>
                        <h2 className="text-xl font-merriweather font-bold text-center">Filter By</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <div>
                            <h2>Category</h2>
                        </div>
                    <ul>
                        {categoryNameList.map((category : categoryProps) => (
                        <li key={category._id}>
                            <Link href="#" className="gap-3 text-base border-b-1 m-0  py-3 rounded-xs">
                                { category.name}
                            </Link>
                         </li>
                    ))}       
                    </ul>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}