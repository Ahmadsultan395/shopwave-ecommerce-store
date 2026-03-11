// /components/layout/StatsSection.tsx

const stats = [
  { value: '50K+', label: 'Happy Customers', desc: 'Across 120+ countries' },
  { value: '10K+', label: 'Products Listed', desc: 'Curated & quality-checked' },
  { value: '99%', label: 'Satisfaction Rate', desc: 'Based on reviews' },
  { value: '24h', label: 'Avg. Delivery', desc: 'Express processing' },
]

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-indigo-950 via-purple-900 to-indigo-900 py-20 text-white">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-indigo-300 backdrop-blur-sm">
            Our Numbers
          </span>
          <h2 className="mt-4 text-4xl font-extrabold">
            Trusted at{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Scale
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map(({ value, label, desc }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm"
            >
              <p className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-5xl font-extrabold text-transparent">
                {value}
              </p>
              <p className="mt-3 text-lg font-semibold">{label}</p>
              <p className="mt-1 text-sm text-indigo-300">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
