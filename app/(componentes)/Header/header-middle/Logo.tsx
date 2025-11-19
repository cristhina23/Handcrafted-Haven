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
        width={100}
        height={100}
        className="
          w-[70px]       
          md:w-[60px]   
          h-auto
        "
        priority
      />
    </div>
  );
}
