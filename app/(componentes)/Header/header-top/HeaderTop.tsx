import React from "react";
import LanguageSelector from "./LanguageSelector";

function HeaderTop() {
  return (
    <div
      className="
        hidden md:flex
        w-full bg-sky-300 text-slate-800 text-sm px-4 py-2
        flex-col md:flex-row md:justify-between md:items-center gap-1
      "
    >
      <p>Every purchase helps an artisan thrive</p>

      <p>Together we’ve supported 250+ small creators</p>

      <div className="text-right">
        <LanguageSelector />
      </div>
    </div>
  );
}

export default HeaderTop;
