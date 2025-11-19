import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/logo.svg"
        alt="Brand Logo"
        width={200}
        height={200}
        className="
          h-6 w-auto        
          sm:h-8            
          md:h-10           
          lg:h-12           
          xl:h-14           
        "
        priority
      />
    </div>
  );
}
