import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

function BestSellers() {
  return (
    <div>
      <Card className='p-4'>
        <CardHeader>
          <CardTitle className='font-bold text-lg'>Best Sellers</CardTitle>
          <CardDescription>Last 6 months</CardDescription>
          <CardDescription>Top 10</CardDescription>
          <CardContent>

             <div className="mt-4 flex-1">
        <h3 className="font-semibold mb-2">Top countries by revenue</h3>
        <ul className="text-sm text-slate-600">
          {data.map((item) => (
            <li key={item.country} className="flex justify-between py-1">
              <span>{item.country}</span>
              <span className="font-medium">${item.revenue}</span>
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