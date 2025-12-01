
import DashboardPage from '@/components/Dashboard/DashboardPage'
import Sidebar from '@/components/Shop/Sidebar/Sidebar'
import React from 'react'

function page() {
  return (
    <div className='flex'>
      <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          screenSize={screenSize}
          currentColor={currentColor}
        />

      <DashboardPage />
    </div>
  )
}

export default page