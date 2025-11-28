"use client";

import React from "react";

interface Props {
  countries: string[];
  selectedCountry?: string | null;
  onChange?: (country: string | null) => void;
}

const FilterByCountry: React.FC<Props> = ({ countries, selectedCountry, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
      <h3 className="font-semibold text-xl text-slate-800 mb-2">Filter by Country</h3>
      <ul className="space-y-2 text-sm text-slate-600">
        <li className="flex items-center">
          <input
            type="radio"
            name="country"
            checked={selectedCountry === null}
            onChange={() => onChange?.(null)}
            className="w-4 h-4 text-slate-800 border-slate-400 focus:ring-2 focus:ring-slate-500"
          />
          <span className="ml-2">Any Country</span>
        </li>
        {countries.map((country, index) => (
          <li key={index} className="flex items-center">
            <input
              type="radio"
              name="country"
              checked={selectedCountry === country}
              onChange={() => onChange?.(country)}
              className="w-4 h-4 text-slate-800 border-slate-400 focus:ring-2 focus:ring-slate-500"
            />
            <span className="ml-2">{country}</span>
          </li>
        ))}
        
      </ul>
    </div>
  );
};

export default FilterByCountry;
