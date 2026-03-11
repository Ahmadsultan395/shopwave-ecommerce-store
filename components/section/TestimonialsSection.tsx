// /components/layout/TestimonialsSection.tsx
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Regular Buyer",
    avatar: "SJ",
    rating: 5,
    review:
      "Absolutely love the quality of products here. The delivery was super fast and packaging was excellent. Will definitely be ordering again!",
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Ahmed Khan",
    role: "Verified Customer",
    avatar: "AK",
    rating: 5,
    review:
      "Best online shopping experience I've had. Customer support was responsive and the return process was hassle free Highly recommend!",
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "Maria Garcia",
    role: "Loyal Member",
    avatar: "MG",
    rating: 5,
    review:
      "I've been shopping here for over a year. The product selection keeps getting better and the prices are unbeatable. 10/10!",
    color: "from-cyan-500 to-teal-500",
  },
  {
    name: "James Wilson",
    role: "First-time Buyer",
    avatar: "JW",
    rating: 4,
    review:
      "Great first experience. Found exactly what I was looking for and checkout was smooth. The site is really easy to navigate too.",
    color: "from-amber-500 to-orange-500",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-700">
            Customer Reviews
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            What Our{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Real reviews from real people who love shopping with us.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map(({ name, role, avatar, rating, review, color }) => (
            <div
              key={name}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="flex-1 text-sm leading-relaxed text-gray-600">
                "{review}"
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${color} text-sm font-bold text-white`}
                >
                  {avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{name}</p>
                  <p className="text-xs text-gray-400">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
