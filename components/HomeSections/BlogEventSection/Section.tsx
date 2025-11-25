import Image from 'next/image';
import Link from 'next/link';
import { Card } from "@/components/ui/card"
import Date from "@/app/(componentes)/Date";
import { FaArrowRight } from "react-icons/fa";

export default function Events() {
    return (
        <section className="w-full flex flex-col items-center py-16">
            <div className="max-w-7xl px-6 py-5 self-center">
                <h2 className="text-2xl font-bold my-10" data-aos="slide-up">Our Blogs & Events</h2>
                <div className="w-full grid gap-5 mb-5 self-center sm:grid-cols md:grid-cols-3">
                    <Card className='py-0 my-0' data-aos="fade-right" data-aos-delay="400">
                        <Image
                        src="/images/events/national-handcraft-conference.webp"
                        alt="National Hand Craft Conference"
                        width={300}
                        height={200}
                        className='w-full p-0 m-0 h-56 rounded-t-lg'
                        />
                        <div className='px-5 pb-5'>
                            <h3 className='text-xl font-semibold'>National Hand Craft Conference Day</h3>
                            <p className='text-base my-5'> Join artisans, creators, and industry leaders
                                from across the country for a day of hands-on workshops,
                                networking, and inspiring presentations celebrating
                                the art of handcrafted design.
                            </p>
                            <Date fixedDate='December 21, 2025' />
                        </div>
                    </Card>
                    <Card className='p-0' data-aos="fade-down" data-aos-delay="400">
                        <Image
                        src="/images/events/india-handcrafted-carnival.webp"
                        alt="India hand Crafted carnival"
                        width={300}
                        height={200}
                        className='w-full p-0 m-0 h-56 rounded-t-lg'
                        />
                        <div className='px-6 pb-5'>
                            <h3 className='text-xl font-semibold'>India Hand Crafted Carnival</h3>
                            <p className='text-base my-5'> Experience live demonstrations, discover innovative crafting techniques,
                                and explore exhibits showcasing the finest handmade creations.
                                Whether you are an aspiring artisan or a passionate supporter of handcrafted artistry,
                                this event offers inspiration, community, and unforgettable creativity.
                            </p>
                            <Date
                            fixedDate='January 5, 2026'
                            />
                        </div>
                    </Card>
                    <Card className='p-0' data-aos="fade-left" data-aos-delay="400">
                        <Image
                        src="/images/events/International-handcraft-trade-fair.webp"
                        alt="International hand craft trade fair"
                        width={300}
                        height={200}
                        className='w-full p-0 m-0 h-56 rounded-t-lg'
                        />
                        <div className='px-6 pb-5'>
                            <h3 className='text-xl font-semibold'>International Hand Craft Trade Fair</h3>
                            <p className='text-base my-5'> Explore a global showcase of authentic craftsmanship,
                                where talented makers from different cultures present
                                their finest handmade creations. From traditional techniques
                                to modern artisan innovations, this fair offers a vibrant blend of creativity,
                                cultural exchange, and opportunities to connect with makers
                                shaping the future of handcrafted design.
                            </p>
                            <Date fixedDate='Febuary 23, 2026' />
                        </div>
                    </Card>
                </div>
            </div>
            <Link
                href="#"
                className="text-(--brand-light) self-end mr-10 font-semibold hover:bg-[#555555] border rounded-full py-2 px-4 bg-(--brand-dark)"
                >
                More Stories
                <FaArrowRight className="inline-grid ml-2" />
            </Link>
        </section>
    )
}