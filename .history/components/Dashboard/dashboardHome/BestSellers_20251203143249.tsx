import { Card, CardHeader } from '@/components/ui/card'
import React from 'react'

function BestSellers() {
  return (
    <div>
      <Card className='p-4'>
        <CardHeader>
          <CardTitle className='font-bold text-lg'>Best Sellers</CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}

export default BestSellers