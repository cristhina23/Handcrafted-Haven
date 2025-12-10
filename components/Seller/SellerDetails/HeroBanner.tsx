import Image from "next/image";

export default function HeroBanner({ banner }: { banner: string }) {
  return (
    <div className="w-full h-40 sm:h-56 md:h-72 overflow-hidden rounded-xl shadow-lg mb-6 border-4 border-[var(--brand-light-blue)]">
      <Image
        src={banner}
        alt="Seller banner"
        className="w-full h-full object-cover"
        width={1200}
        height={400}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
      />
    </div>
  );
}
