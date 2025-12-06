"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrderContext } from '@/contexts/OrderContext';
import React, { useState, useMemo } from 'react';
import DynamicSortSelector from '@/components/DynamicSortSelector'; 


export type SortOption = 'quantity-desc' | 'quantity-asc' | 'title-asc' | 'title-desc';

const OPTIONS: Record<SortOption, string> = {
  'quantity-desc': 'Most Sold → Least Sold',
  'quantity-asc': 'Least Sold → Most Sold',
  'title-asc': 'Alphabetically A-Z',
  'title-desc': 'Alphabetically Z-A',
};


export default function BestSellers() {
  const { bestSellers } = useOrderContext();

  const [sortOption, setSortOption] = useState<SortOption>('quantity-desc');

  // Convertimos bestSellers en array y aplicamos el orden
  const sortedData = useMemo(() => {
    const arr = Object.entries(bestSellers).map(([name, quantity]) => ({ name, quantity }));

    switch (sortOption) {
      case 'quantity-desc':
        return arr.sort((a, b) => b.quantity - a.quantity);
      case 'quantity-asc':
        return arr.sort((a, b) => a.quantity - b.quantity);
      case 'title-asc':
        return arr.sort((a, b) => a.name.localeCompare(b.name));
      case 'title-desc':
        return arr.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return arr;
    }
  }, [bestSellers, sortOption]);


  const topData = sortedData.slice(0, 10);

  return (
    <Card className="p-4">
      <CardHeader >
       <div className='flex items-center justify-center gap-8'>
         <CardTitle className="font-bold text-lg">Best Sellers</CardTitle>
        <CardDescription>Last 6 months</CardDescription>
       </div>
        <CardDescription>Top 10</CardDescription>

        
        <div className="my-2 w-48">
          <DynamicSortSelector<SortOption>
            options={OPTIONS}
            defaultValue="quantity-desc"
            onChange={(value) => setSortOption(value)}
          />
        </div>
      </CardHeader>

      <CardContent>
        <ul className="text-sm text-slate-600 mt-4">
          {topData.map((item) => (
            <li key={item.name} className="flex justify-between py-1">
              <span>{item.name}</span>
              <span className="font-medium">{item.quantity}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
