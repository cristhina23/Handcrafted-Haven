import { Card, CardContent, CardTitle } from "../ui/card";
import Image from 'next/image';
import { getBestSellerByMonth } from "@/lib/db/orders";
import { getBestMakerByproducts } from "@/lib/db/products";
import { getBestCraftman } from "@/lib/db/sellers";

const bestSeller = await getBestSellerByMonth();
const bestMaker = await getBestMakerByproducts();
const craftsMan = await getBestCraftman();

export default function BestArtisansByMonth() {

    function formatCurrency(amount: number, locale: string = 'en-US', currency: string = 'USD'): string {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        }).format(amount);
    }

    return (
        <section>
            <div className="font-merriweather">
                <div className="mb-10">
                    <h1 className="text-3xl font-semibold  ">Featured Artisans</h1>
                    <p className="text-lg ">Discover The Best & Latest Craft Makers</p>
                </div>
                <div className="grid grid-cols-3 gap-5 ">
                    <Card className="border-0 p-0 shadow-none ">
                        <CardContent className="p-0 m-0 border-0 ">
                            <Image 
                            src={bestSeller.storeBanner}
                            alt={bestSeller.storeName}
                            width={300}
                            height={300}
                            className="object-cover w-full border-1 shadow-lg rounded-sm"   
                            />
                        </CardContent>
                        <CardTitle className="border-0 shadow-none text-center pt-0 mt-0">
                            <h2 className="text-xl pt-0 mt-0">{bestSeller.storeName}</h2>
                            <h3 className="text-lg">Best Seller of The Month</h3>
                            <p className="text-xs">(Total Revenue: {formatCurrency(bestSeller.totalRevenue )})</p>
                        </CardTitle>
                    </Card>
                    <Card className="border-0 p-0 shadow-none ">
                        <CardContent className="p-0 m-0 border-0 ">
                            <Image 
                            src={bestMaker.brandBanner}
                            alt={bestMaker.brandName}
                            width={300}
                            height={300}
                            className="object-cover w-full border-1 shadow-lg rounded-sm"   
                            />
                        </CardContent>
                        <CardTitle className="border-0 shadow-none text-center pt-0 mt-0">
                            <h2 className="text-xl pt-0 mt-0">{bestMaker.brandName}</h2>
                            <h3 className="text-lg">Best Crafting Brand</h3>
                            <p className="text-xs">(total Product:{bestMaker.totalProduct})</p>
                        </CardTitle>
                    </Card>
                    <Card className="border-0 p-0 shadow-none ">
                        <CardContent className="p-0 m-0 border-0 ">
                            <Image 
                            src={craftsMan.storeImage}
                            alt={craftsMan.storeName}
                            width={300}
                            height={300}
                            className="object-fit w-full border-1 shadow-lg rounded-sm"   
                            />
                        </CardContent>
                        <CardTitle className="border-0 shadow-none text-center pt-0 mt-0">
                            <h2 className="text-xl pt-0 mt-0">{craftsMan.sellerName}
                                <small className="text-sm">({craftsMan.storeName})</small>
                            </h2>
                            <h3 className="text-lg">Craftsmanship Spotlight
                                <p className="text-xs">(Scored Points: {Math.round(craftsMan.craftmanScore)})</p>
                            </h3>
                            
                        </CardTitle>
                    </Card>
                </div>
            </div>
        </section>
    )
}