"use client";

import { useEffect, useState } from "react";
import CategoryNames from "./categoryButton"
import HorizontalCard from "./SellerCardList";



export default function SellersList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/sellers')
            .then(res => res.json())
            .then(result => setData(result))
    });
    return (
        <section>
            <div className="my-10 font-merriweather">
                <h2 className="text-3xl font-semibold">Our Artisans</h2>
                <p className="text-base">Meet the best of the best</p>
            </div>
            <CategoryNames />
            <HorizontalCard data={data} />
        </section>
    )
}