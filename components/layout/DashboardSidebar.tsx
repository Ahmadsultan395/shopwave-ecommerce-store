'use client'
// /components/layout/DashboardSidebar.tsx
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Package, Tags, ShoppingBag,
  LogOut, Store, ChevronRight
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/utils'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/products', label: 'Products', icon: Package },
  { href: '/dashboard/categories', label: 'Categories', icon: Tags },
  { href: '/dashboard/orders', label: 'Orders', icon: ShoppingBag },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { profile, signOut } = useAuth()

  return (
    <aside className="flex h-screen w-64 flex-col bg-indigo-950 text-indigo-100">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-indigo-800 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
          <Store className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-white">ShopWave</p>
          <p className="text-xs text-indigo-400">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-indigo-400">
          Management
        </p>
        <ul className="space-y-1">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const isActive = exact ? pathname === href : pathname.startsWith(href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-indigo-300 hover:bg-indigo-800 hover:text-white'
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {label}
                  {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User */}
      <div className="border-t border-indigo-800 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-lg bg-indigo-900 px-3 py-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
            {profile?.email?.[0]?.toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {profile?.email?.split('@')[0]}
            </p>
            <p className="text-xs capitalize text-indigo-400">{profile?.role}</p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-indigo-300 hover:bg-indigo-800 hover:text-white transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
