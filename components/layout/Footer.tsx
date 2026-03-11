// /components/layout/Footer.tsx
import Link from "next/link";
import {
  Store,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
} from "lucide-react";

const links = {
  Shop: [
    { label: "All Products", href: "#products" },
    { label: "New Arrivals", href: "#" },
    { label: "Best Sellers", href: "#" },
    { label: "Sale & Offers", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Track Order", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Refund Policy", href: "#" },
  ],
};

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const contact = [
  { icon: Mail, text: "support@shopwave.com" },
  { icon: Phone, text: "+1 (800) 123-4567" },
  { icon: MapPin, text: "New York, NY 10001, USA" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 text-indigo-300">
      {/* Background blobs — same as HeroSection */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />
      </div>

      {/* Top promo strip */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-indigo-200">
            🚚 Free shipping on all orders over{" "}
            <span className="font-semibold text-white">$50</span>
          </p>
          <Link
            href="#products"
            className="flex items-center gap-1 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
          >
            Shop Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Main body */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="mb-5 inline-flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                <Store className="h-5 w-5 text-cyan-400" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Shop<span className="text-cyan-400">Wave</span>
              </span>
            </Link>

            <p className="mb-6 max-w-xs text-sm leading-relaxed text-indigo-300">
              Your one-stop destination for premium products. Curated quality,
              fast delivery, and exceptional service — every time.
            </p>

            {/* Contact info */}
            <ul className="mb-8 space-y-3">
              {contact.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 text-sm text-indigo-300"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    <Icon className="h-4 w-4 text-cyan-400" />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-indigo-300 backdrop-blur-sm transition-all hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-8 lg:grid-cols-4">
            {Object.entries(links).map(([group, items]) => (
              <div key={group}>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white">
                  {group}
                </h4>
                <ul className="space-y-3">
                  {items.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm text-indigo-300 transition-colors hover:text-cyan-400"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-indigo-400">
            &copy; {new Date().getFullYear()} ShopWave. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-indigo-400">
            <span>Secure payments:</span>
            {["Visa", "Mastercard", "PayPal", "Stripe"].map((pay) => (
              <span
                key={pay}
                className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-indigo-200 backdrop-blur-sm"
              >
                {pay}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
