// /components/layout/HowItWorksSection.tsx
import { UserPlus, Search, ShoppingCart, PackageCheck } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: UserPlus,
    title: 'Create an Account',
    desc: 'Sign up in seconds. No credit card needed to start browsing our full catalog.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
  },
  {
    step: '02',
    icon: Search,
    title: 'Browse & Discover',
    desc: 'Explore thousands of curated products across all categories with smart filters.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
  },
  {
    step: '03',
    icon: ShoppingCart,
    title: 'Add to Cart & Checkout',
    desc: 'Secure checkout with multiple payment options. Fast, simple, and safe.',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  {
    step: '04',
    icon: PackageCheck,
    title: 'Receive Your Order',
    desc: 'Track your package in real time and receive it right at your doorstep.',
    color: 'text-pink-500',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
  },
]

export function HowItWorksSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
            Simple Process
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            How It{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Get started in minutes. Shopping has never been this easy.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop only) */}
          <div className="absolute left-0 right-0 top-16 hidden h-0.5 bg-gradient-to-r from-cyan-200 via-indigo-200 to-pink-200 lg:block" />

          <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ step, icon: Icon, title, desc, color, bg, border }) => (
              <div key={step} className="flex flex-col items-center text-center">
                {/* Icon circle */}
                <div
                  className={`relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 ${border} ${bg}`}
                >
                  <Icon className={`h-8 w-8 ${color}`} />
                  {/* Step badge */}
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                    {step.slice(1)}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
