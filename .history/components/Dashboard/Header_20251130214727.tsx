import React from 'react'
import DashboardThemeToggle from './DashboardThemeToggle'

function Header() {
  return (
    <div className="w-full bg-[var(--card)] flex items-center justify-between px-6 py-2 lg:py-0 gap-4">
      <DashboardThemeToggle />
    </div>
  )
}

export default Header