"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrderContext } from '@/contexts/OrderContext';
import React, { useState, useMemo } from 'react';
import DynamicSortSelector from '@/components/DynamicSortSelector'; 
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';


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

  
  const sortedData = useMemo(() => {
    const arr = Object.entries(bestSellers).map(([title, quantity]) => ({ title, quantity }));

    switch (sortOption) {
      case 'quantity-desc':
        return arr.sort((a, b) => b.quantity - a.quantity);
      case 'quantity-asc':
        return arr.sort((a, b) => a.quantity - b.quantity);
      case 'title-asc':
        return arr.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return arr.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return arr;
    }
  }, [bestSellers, sortOption]);


  const topData = sortedData.slice(0, 10);

  return (
    <Card className="md:p-6  rounded-xl shadow-lg ">
      <CardHeader >
       
         <div className="flex justify-between items-center">
          <CardTitle className="font-bold text-xl  ">Best Sellers</CardTitle>
          <Link href="/dashboard/orders">
              <CardDescription className="flex gap-2">
                View All  Products 
                <ArrowRight />
              </CardDescription>
            </Link>
         </div>
        <div className="flex gap-2">
            <CardDescription>Top 10</CardDescription>
           <span className='flex justify-center items-center'>-</span>
          <CardDescription>Last 6 months</CardDescription>
          </div>
       
        <div className='flex justify-between items-center'>
          

        
        <div className="my-2 w-48">
          <DynamicSortSelector<SortOption>
            options={OPTIONS}
            defaultValue="quantity-desc"
            onChange={(value) => setSortOption(value)}
          />
        </div>
        </div>
      </CardHeader>

      <CardContent>
        <ul className="text-md flex flex-col  gap-4 text-slate-600 mt-4 pb-5">
          {topData.map((item) => (
            <li key={item.title} className="flex   justify-between py-1">
              <span>{item.title}</span>
              <span className="font-medium">{item.quantity}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
