import Image from 'next/image';

export default function HeroBanner({ banner }: { banner: string }) {
  return (
    <div className="w-full h-56 md:h-70 overflow-hidden">
      <Image
        src={banner}
        alt="Seller banner"
        className="w-full h-full object-contain"
        width={800}
        height={600}
      />
    </div>
  );
}
