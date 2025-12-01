import React from 'react'
import DashboardThemeToggle from './DashboardThemeToggle'
import { ListIndentDecrease } from 'lucide-react'

function Header() {
  return (
    <div className="w-full bg-card flex items-center justify-between px-6 py-2 lg:py-4 gap-4">
      <ListIndentDecrease
        className="text-muted-foreground"
        size={24}
        o
      />
      <DashboardThemeToggle />
    </div>
  )
}

export default Header