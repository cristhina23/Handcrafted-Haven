import Link from 'next/link'
import { FaArrowRight } from "react-icons/fa";

export default function OurMission() {
    return (
        <section data-aos="fade-up" data-aos-delay="300">
            <div className="p-16">
                <h2 className="text-4xl font-semibold my-5">Our Mission</h2>
                <div>
                    <article className="text-xl p-2 mb-6">
                        We can connect artisans and conscious buyers who value authenticity,craftmanship,sustainability.
                    </article>
                    <Link
                     href="#"
                     className="text-(--brand-light) bg-(--brand-dark) mb-5 mx-2 mt-10 rounded-full px-6 py-2 hover:bg-[#555]"
                    >
                        Learn our story 
                        <FaArrowRight className="inline-grid ml-2" />
                    </Link>
                </div>
            </div>
        </section>
    )
}