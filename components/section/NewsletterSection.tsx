// /components/layout/NewsletterSection.tsx
import Link from 'next/link'
import { Bell, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function NewsletterSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 py-20 text-white">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        {/* Icon */}
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
          <Bell className="h-8 w-8 text-cyan-400" />
        </div>

        <h2 className="text-4xl font-extrabold sm:text-5xl">
          Never Miss a{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Deal Again
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-indigo-200">
          Join 50,000+ smart shoppers. Get early access to exclusive sales,
          new arrivals, and member-only discounts delivered to your inbox.
        </p>

        {/* Perks */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-indigo-300">
          {['🎁 Welcome discount', '📦 Early access drops', '🚫 No spam, ever'].map((perk) => (
            <span
              key={perk}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
            >
              {perk}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="bg-white text-indigo-700 hover:bg-gray-50 shadow-xl"
            >
              Create Free Account
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <p className="text-sm text-indigo-400">No credit card required</p>
        </div>
      </div>
    </section>
  )
}
