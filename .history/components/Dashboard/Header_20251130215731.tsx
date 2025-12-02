import React from 'react'
import DashboardThemeToggle from './DashboardThemeToggle'

function Header() {
  return (
    <div className="w-full bg-card flex items-center justify-between px-6 py-2 lg:py-0 gap-4">
      <list-indent-decrea className="text-2xl" />
      <DashboardThemeToggle />
    </div>
  )
}

export default Header