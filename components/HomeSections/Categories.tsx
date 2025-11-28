import { Card } from "@/components/ui/card"
import Image from 'next/image';
import ViewAll from "./ViewButton";
import { getCategories } from "@/lib/db/data";

const categories = await getCategories();

export default function CategorySection() {
    return (
        <section className="bg-(--brand-primary)">
            <div className="w-full py-15 px-5 ">
                <div className="max-w-7x1 mx-5 mt-5 mb-10 flex justify-between">
                    <h2 className="text-2xl font-semibold ">Find what speaks for you</h2>
                    <ViewAll/>
                </div>
                <div className="bg-(--brand-primary) my-10 grid justify-center sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
                    
                    {categories.map((category) => ( 
                        <figure key={category._id}>
                            <Card className="max-w-xm bg-(--brand-dark) p-0  aspect-2/2 rounded-full">
                                <Image
                                    src={`data:${category.mimeType};base64,${category.image}`}
                                    alt={category.name}
                                    width={150}
                                    height={200}
                                    className="aspect-2/2 object-cover rounded-full w-full h-full"
                                />
                            </Card>
                            <figcaption className="my-5">
                                <h3 className="text-xl text-center ">{category.name}</h3>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    )
}