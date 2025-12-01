
import DashboardPage from '@/components/Dashboard/DashboardPage'
import React from 'react'

function page() {
  return (
    <div className=''>
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