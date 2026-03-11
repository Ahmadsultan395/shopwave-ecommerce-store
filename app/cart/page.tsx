"use client";
// app/cart/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart }    from "@/hooks/useCart";
import { Navbar }     from "@/components/layout/Navbar";
import { Footer }     from "@/components/layout/Footer";
import { Button }     from "@/components/ui/Button";
import { formatPrice } from "@/utils";

export default function CartPage() {
  const { items, total, count, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <ShoppingBag className="mb-6 h-24 w-24 text-gray-200" />
          <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-gray-500">Add some products to get started</p>
          <Link href="/#products" className="mt-8">
            <Button size="lg"><ArrowLeft className="h-5 w-5" />Continue Shopping</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const shipping   = total > 50 ? 0 : 5.99;
  const tax        = total * 0.08;
  const grandTotal = total + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Cart <span className="text-gray-400">({count})</span>
          </h1>
          <button onClick={clearCart} className="text-sm text-red-500 hover:underline">
            Clear all
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Items list */}
          <div className="space-y-4 lg:col-span-2">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  <Image src={product.image || "https://placehold.co/80x80"} alt={product.name} fill className="object-cover" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm font-medium text-primary-600">{formatPrice(product.price)}</p>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-200 transition-colors">
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)} disabled={quantity >= product.stock} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-40">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="w-20 text-right font-bold text-gray-900">
                  {formatPrice(product.price * quantity)}
                </div>

                <button onClick={() => removeItem(product.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-bold text-gray-900">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({count} items)</span><span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span><span>{formatPrice(tax)}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-base text-gray-900">
                <span>Total</span><span>{formatPrice(grandTotal)}</span>
              </div>
            </div>
            {total <= 50 && (
              <p className="mt-3 text-xs text-gray-500">Add {formatPrice(50 - total)} more for free shipping!</p>
            )}
            <Link href="/checkout" className="mt-6 block">
              <Button fullWidth size="lg">Proceed to Checkout</Button>
            </Link>
            <Link href="/#products" className="mt-3 block">
              <Button variant="ghost" fullWidth><ArrowLeft className="h-4 w-4" />Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
