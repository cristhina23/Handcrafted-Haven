"use client";

import { CarouselOrientation } from "./TesimonyCaraousel";
import Link from "next/link";

export default function CustomerReview() {
    return (
        <section className="bg-(--brand-dark) text-(--brand-primary) w-full Py-16" data-aos="fade-down" data-aos-delay="300">
            <div className=" px-10 py-16 ">
                <div className="mb-10">
                    <h2 className="text-3xl font-semibold">Crafted Joy, Delivered</h2>
                </div>
                <div className="w-full flex flex-col">
                    <CarouselOrientation />
                    <Link
                    href="#"
                    className="bg-(--brand-pale) text-(--brand-dark) font-semibold text-center xs:w-full md:self-end mb-5 mx-2 mt-10 rounded-full px-6 py-2 hover:bg-(--brand-light-gray)"
                    >
                    See More
                    </Link>
                </div>
            </div>
        </section>
    )
}