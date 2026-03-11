// /components/layout/HeroSection.tsx
import Link from 'next/link'
import { ShoppingBag, ArrowRight, Star, Shield, Truck } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-primary-900 to-purple-900 text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-sm">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>Trusted by 50,000+ customers</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
            Discover
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Premium Products
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-200">
            Shop our curated collection of high-quality products. Fast delivery, easy returns,
            and exceptional customer service.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#products">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-50 shadow-lg">
                <ShoppingBag className="h-5 w-5" />
                Shop Now
              </Button>
            </a>
            <Link href="/auth/signup">
              <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { icon: Truck, label: 'Free Shipping', desc: 'On orders over $50' },
              { icon: Shield, label: 'Secure Payments', desc: '256-bit SSL encryption' },
              { icon: Star, label: 'Top Quality', desc: 'Curated products only' },
            ].map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600/30">
                  <Icon className="h-6 w-6 text-cyan-400" />
                </div>
                <p className="font-semibold">{label}</p>
                <p className="text-sm text-indigo-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
