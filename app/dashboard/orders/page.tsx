import OrdersPageContainer from '@/components/Dashboard/orders/OrdersPageContainer'
import React from 'react'

function page({ params }: { params: { id: string } }) {
  return (
    <div>

      <OrdersPageContainer  />
    </div>
  )
}

export default page