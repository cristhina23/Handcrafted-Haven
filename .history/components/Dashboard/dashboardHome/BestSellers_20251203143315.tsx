import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

function BestSellers() {
  return (
    <div>
      <Card className='p-4'>
        <CardHeader>
          <CardTitle className='font-bold text-lg'>Best Sellers</CardTitle>
          <CardDescription>Last 6 months</CardDescription>
          <CardDescription
        </CardHeader>
      </Card>
    </div>
  )
}

export default BestSellers