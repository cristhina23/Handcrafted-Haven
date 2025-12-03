"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrderContext } from '@/contexts/OrderContext';
import React, { useState, useMemo } from 'react';
import DynamicSortSelector, { SortOption } from '@/components/'; // Ajusta la ruta

export default function BestSellers() {
  const { bestSellers } = useOrderContext();

  const [sortOption, setSortOption] = useState<SortOption>('quantity-desc');

  const data = useMemo(() => {
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

  return (
    <Card className='p-4'>
      <CardHeader>
        <CardTitle className='font-bold text-lg'>Best Sellers</CardTitle>
        <CardDescription>Last 6 months</CardDescription>
        <CardDescription>Top 10</CardDescription>

        {/* Selector para ordenar */}
        <div className="my-2 w-48">
          <DynamicSortSelector
            defaultValue="quantity-desc"
            onChange={(value) => setSortOption(value)}
          />
        </div>
      </CardHeader>

      <CardContent>
        <div className="mt-4 flex-1">
          <ul className="text-sm text-slate-600">
            {data.map((item) => (
              <li key={item.name} className="flex justify-between py-1">
                <span>{item.name}</span>
                <span className="font-medium">{item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
