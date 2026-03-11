"use client";
// components/layout/Navbar.tsx
import Link from "next/link";
import { ShoppingCart, Store, LogIn, LayoutDashboard, LogOut, User } from "lucide-react";
import { useAppSelector } from "@/store";
import { selectCartCount } from "@/store/selectors";
import { useAuth }         from "@/hooks/useAuth";
import { Button }          from "@/components/ui/Button";

export function Navbar() {
  const count                   = useAppSelector(selectCartCount);
  const { profile, loading, signOut, canAccessDashboard } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
            <Store className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">
            Shop<span className="text-primary-600">Wave</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/"          className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Home</Link>
          <Link href="/#products" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Products</Link>
          {canAccessDashboard && (
            <Link href="/dashboard" className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700">
              <LayoutDashboard className="h-4 w-4" />Dashboard
            </Link>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Cart icon — Redux count */}
          <Link href="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>

          {/* Auth — Context API */}
          {!loading && (
            <>
              {profile ? (
                <div className="flex items-center gap-2">
                  <div className="hidden items-center gap-2 rounded-lg bg-gray-50 px-3 py-1.5 sm:flex">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{profile.email?.split("@")[0]}</span>
                    <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700 capitalize">{profile.role}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={signOut}>
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </Button>
                </div>
              ) : (
                <Link href="/auth/login">
                  <Button size="sm">
                    <LogIn className="h-4 w-4" />Sign In
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
