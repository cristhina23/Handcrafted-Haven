'use client'

import HeaderTop from "./header-top/HeaderTop";
import HeaderMiddle from "./header-middle/HeaderMiddle";
import HeaderBoton from "./header-botton/HeaderBoton";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="flex items-center flex-col">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBoton />
      </div>
    </header>
  );
}
