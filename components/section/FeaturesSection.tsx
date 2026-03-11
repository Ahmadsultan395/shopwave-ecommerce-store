// /components/layout/FeaturesSection.tsx
import { Zap, RefreshCcw, Headphones, Gift, Lock, Globe } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast Delivery',
    desc: 'Orders processed within 24 hours and delivered to your door in record time.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
  {
    icon: RefreshCcw,
    title: 'Easy Returns',
    desc: '30-day no-questions-asked return policy. Your satisfaction is our priority.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Our customer care team is always available to help you with any issue.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    icon: Gift,
    title: 'Exclusive Deals',
    desc: 'Members get access to flash sales, early drops, and special discounts.',
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
  },
  {
    icon: Lock,
    title: 'Secure Checkout',
    desc: 'Your payment info is always protected with bank-grade encryption.',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
  {
    icon: Globe,
    title: 'Worldwide Shipping',
    desc: 'We ship to 120+ countries with real-time order tracking included.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10',
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
            Why Choose Us
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Everything You Need,{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              All in One Place
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            We've built a shopping experience that puts you first — from browsing to delivery.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, desc, color, bg }) => (
            <div
              key={title}
              className="group rounded-2xl border border-gray-100 bg-gray-50 p-8 transition-all duration-300 hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-lg"
            >
              <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${bg}`}>
                <Icon className={`h-7 w-7 ${color}`} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
