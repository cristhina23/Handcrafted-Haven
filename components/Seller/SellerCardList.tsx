import { SellerType } from "@/types"
import { Card, CardAction, CardHeader ,CardContent ,CardTitle, CardDescription } from "../ui/card"
import Image from 'next/image'
import StarsRating from "../ProductPage/StarsRating"
import Link  from "next/link"

interface DataProps{
    data: SellerType[]
}


export default function HorizontalCard({data}: DataProps) {
    return (
        <div> 
            <div className="toggleButtond">
                <button>Grid</button>
                <button>List</button>
            </div>
            <ul>
            {data.map((seller: SellerType) => (
                    <li key={seller._id}>
                        <Card className="grid grid-cols-4 justify-center items-center max-h-25 p-2">
                        <div className="col-span-1 order-1 p-0">
                                <Image
                                    src={seller.profileImage}
                                    alt={seller.shopName}
                                    width={300}
                                    height={300}
                                    className="object-cover max-h-15 max-w-15 rounded-full aspect-2/2"
                                />
                                <CardTitle>
                                    <h3>{seller.shopName}</h3>
                                </CardTitle>
                            </div>
                            <div className="col-span-2 order-2 flex flex-row gap-3">
                                <p>{seller.country}</p>
                                <p>{seller.specialties}</p>
                                <div className="flex flex-row">
                                    <StarsRating rating={seller.rating} />
                                    <p>{seller.rating}</p>
                                </div>
                            </div>
                            <div className="col-span-1 order-3">
                            <Link href="#" className="">
                               View Profile
                            </Link>
                            </div>
                        </Card>
                    </li>
                ))}
            </ul>
        </div>
    )
}