import Image from 'next/image';

export default function Logo() {
    return (
        <div className="flex flex-col justify-center items-center ">
            <Image
                src="/logo.svg"
                alt="Brand logo"
                width={200}
                height={200}
                className=" rounded-full"
            />
            <h3 className=" text-(--brand-primary) my-2 text-center text-lg font-semibold">HandCrafted Haven</h3>
            <p className="text-base mt-2 max-w-md text-(--brand-primary) text-center">
                Celebrating artisans and intentional craft. Every piece is made with care, creativity, and love.
            </p>
        </div>
    )
}