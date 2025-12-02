
import DashboardPage from '@/components/Dashboard/DashboardPage'
import Sidebar from '@/components/Dashboard/Sidebar'
import React, { useState } from 'react'

function page() {
   const [activeMenu, setActiveMenu] = useState(true);
    const [collapsed, setCollapsed] = useState(false);
    const [screenSize, setScreenSize] = useState(1200);

  
    const currentColor = "#4f46e5";

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