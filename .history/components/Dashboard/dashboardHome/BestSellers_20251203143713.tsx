import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useOrderContext } from '@/contexts/OrderContext';
import React from 'react'

function BestSellers() {
  const { bestSellers } = useOrderContext();

  const data = Object.entries(bestSellers).map(([name, quantity]) => ({
    name,
    quantity,
  }));

  return (
    <div>
      <Card className='p-4'>
        <CardHeader>
          <CardTitle className='font-bold text-lg'>Best Sellers</CardTitle>
          <CardDescription>Last 6 months</CardDescription>
          <CardDescription>Top 10</CardDescription>
          <CardContent>

             <div className="mt-4 flex-1">
                <ul className="text-sm text-slate-600">
                  {data.map((item) => (
                    <li key={item.name} className="flex justify-between py-1">
                      <span>{item.name}</span>
                      <span className="font-medium">${item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}

export default BestSellers