"use client";
// app/checkout/page.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { createClient } from "@/supabase/client";
import { checkoutSchema, type CheckoutSchema } from "@/lib/validations";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const { profile } = useAuth();
  const { toast } = useToast();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: profile?.email || "",
      full_name: profile?.full_name || "",
    },
  });

  const shipping = total > 50 ? 0 : 5.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  const onSubmit = async (_data: CheckoutSchema) => {
    if (!profile) {
      router.push("/auth/login");
      return;
    }

    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        user_id: profile.id,
        status: "pending",
        total_price: grandTotal,
      })
      .select()
      .single();

    if (orderErr || !order) {
      toast("Failed to place order", "error");
      return;
    }

    const { error: itemsErr } = await supabase.from("order_items").insert(
      items.map((i) => ({
        order_id: order.id, // make sure it's a number
        product_id: i.product.id, // make sure it's a number
        quantity: Number(i.quantity), // convert to number just in case
        price: Number(i.product.price), // convert to number
      })),
    );

    if (itemsErr) {
      toast("Order items error", "error");
      return;
    }

    clearCart();
    toast("Order placed successfully!", "success");
    setOrderPlaced(true);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <ShoppingBag className="mb-4 h-16 w-16 text-gray-200" />
          <h2 className="text-xl font-bold">Your cart is empty</h2>
          <Link href="/#products" className="mt-6">
            <Button>Shop Now</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Order Placed!</h2>
          <p className="mt-3 text-gray-500">
            Thank you! You'll receive a confirmation email shortly.
          </p>
          <Link href="/" className="mt-8">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Checkout</h1>

        {!profile && (
          <div className="mb-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
            ⚠️ Please{" "}
            <Link href="/auth/login" className="font-medium underline">
              sign in
            </Link>{" "}
            to place an order.
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 lg:col-span-3"
          >
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-semibold text-gray-900">
                Shipping Information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Full Name"
                  error={errors.full_name?.message}
                  required
                  {...register("full_name")}
                />
                <Input
                  label="Email"
                  type="email"
                  error={errors.email?.message}
                  required
                  {...register("email")}
                />
                <div className="sm:col-span-2">
                  <Input
                    label="Address"
                    error={errors.address?.message}
                    required
                    {...register("address")}
                  />
                </div>
                <Input
                  label="City"
                  error={errors.city?.message}
                  required
                  {...register("city")}
                />
                <Input
                  label="Postal Code"
                  error={errors.postal_code?.message}
                  required
                  {...register("postal_code")}
                />
                <div className="sm:col-span-2">
                  <Input
                    label="Phone"
                    type="tel"
                    error={errors.phone?.message}
                    required
                    {...register("phone")}
                  />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={isSubmitting}
              disabled={!profile}
            >
              Place Order — {formatPrice(grandTotal)}
            </Button>
          </form>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-semibold text-gray-900">
                Order Summary
              </h2>
              <div className="space-y-3 text-sm">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between">
                    <span className="text-gray-600 max-w-[160px] truncate">
                      {product.name} ×{quantity}
                    </span>
                    <span className="font-medium">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span
                      className={
                        shipping === 0 ? "text-green-600 font-medium" : ""
                      }
                    >
                      {shipping === 0 ? "FREE" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
