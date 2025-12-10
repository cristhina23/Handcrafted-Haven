import { SellerType } from "@/types";
import { Card, CardTitle } from "../ui/card";
import Image from "next/image";
import StarsRating from "../ProductPage/StarsRating";
import Link from "next/link";

interface DataProps {
    data: SellerType[];
    viewMode: "grid" | "list";
}

export default function SellerCardList({ data, viewMode }: DataProps) {
    const listContainerClasses =
        viewMode === "list"
            ? "space-y-2"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5";

    return (
        <div className="py-4 mt-5 mb-10">
            <ul className={listContainerClasses}>
                {data.map(seller => (
                    <li key={seller._id}>
                        <Card
                            className={
                                viewMode === "list"
                                    ? "max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl xl:max-w-4xl grid grid-cols-[auto_1fr_auto] items-center p-3 overflow-x-auto"
                                    : "flex flex-col h-full items-center text-center p-4"
                            }
                        >
                            <div
                                className={
                                    viewMode === "list"
                                        ? "flex flex-col items-center gap-3 min-w-[200px]"
                                        : "flex flex-col justify-center items-center"
                                }
                            >
                                <Image
                                    src={seller.profileImage || "/placeholder.jpg"}
                                    alt={seller.shopName}
                                    width={viewMode === "list" ? 60 : 200}
                                    height={viewMode === "list" ? 60 : 200}
                                    className={`object-cover rounded-full aspect-square ${
                                        viewMode === "list" ? "max-h-15 max-w-15" : "mb-2"
                                    }`}
                                />
                                <CardTitle
                                    className={
                                        viewMode === "list"
                                            ? "text-base font-semibold"
                                            : "text-lg font-bold"
                                    }
                                >
                                    {seller.shopName}
                                </CardTitle>
                            </div>

                            <div
                                className={
                                    viewMode === "list"
                                        ? "flex flex-row items-center justify-center gap-4 text-sm font-bold"
                                        : "flex flex-col gap-1 justify-center items-center mt-1 text-lg font-bold"
                                }
                            >
                                <p>{seller.country}</p>
                                <p className="text-center">
                                    {seller.specialties.join(", ")}
                                </p>

                                <div className="flex flex-row gap-2 items-center">
                                    <StarsRating rating={seller.rating} />
                                    <p className="text-sm">({seller.rating})</p>
                                </div>
                            </div>

                            <div
                                className={`order-3 ${
                                    viewMode === "list"
                                        ? "min-w-[200px] text-right"
                                        : "w-full mt-3"
                                }`}
                            >
                                <Link
                                    href={`/sellers/${seller._id}`}
                                    className="font-semibold bg-(--brand-dark) text-(--brand-light) py-2 px-3 rounded-md"
                                >
                                    View Profile
                                </Link>
                            </div>
                        </Card>
                    </li>
                ))}
            </ul>
        </div>
    );
}
