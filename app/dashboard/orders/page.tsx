"use client";
// app/dashboard/orders/page.tsx
import { useEffect, useState } from "react";
import { ShoppingBag, ChevronDown } from "lucide-react";
import { createClient } from "@/supabase/client";
import { useToast } from "@/hooks/useToast";
import { Badge } from "@/components/ui/Card";
import { formatPrice, formatDate } from "@/utils";
import type { Order, OrderStatus } from "@/types";

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "processing",
  "completed",
  "cancelled",
];

const statusVariant = (s: string): any =>
  ({
    pending: "warning",
    processing: "info",
    completed: "success",
    cancelled: "error",
  })[s] || "default";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilter] = useState("all");
  const { toast } = useToast();
  const supabase = createClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
    }
  }, []);

  const fetchOrders = async () => {
    setLoading(true);

    // 1️⃣ Fetch latest 5 orders
    const { data: recentOrdersRaw, error: recentOrdersError } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (recentOrdersError) {
      console.error("Recent Orders Error:", recentOrdersError);
      setLoading(false);
      return;
    }

    // 2️⃣ Fetch emails for these users
    const userIds = recentOrdersRaw?.map((o) => o.user_id) || [];
    const { data: users, error: usersError } = await supabase
      .from("profiles")
      .select("id, email, full_name")
      .in("id", userIds);

    if (usersError) {
      console.error("Users Error:", usersError);
      setLoading(false);
      return;
    }

    // 3️⃣ Merge emails into orders
    const mergedOrders = recentOrdersRaw?.map((o) => ({
      ...o,
      email: users?.find((u) => u.id === o.user_id)?.email || "Unknown",
      full_name:
        users?.find((u) => u.id === o.user_id)?.full_name || "Customer",
    }));

    setOrders(mergedOrders || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: OrderStatus) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);
    if (error) {
      toast("Failed to update status", "error");
      return;
    }
    toast(`Order marked as ${status}`, "success");
    fetchOrders();
  };

  const filtered =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  if (!mounted) {
    return (
      <div className="p-8">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="mt-1 text-gray-500">{orders.length} total orders</p>
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none rounded-xl border border-gray-200 bg-white py-2 pl-4 pr-10 text-sm font-medium focus:border-primary-400 focus:outline-none"
          >
            <option value="all">All Orders</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATUS_OPTIONS.map((status) => (
          <div
            key={status}
            className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm"
          >
            <Badge variant={statusVariant(status)}>{status}</Badge>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {orders.filter((o) => o.status === status).length}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="px-6 py-3">Order</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Items</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center">
                  <ShoppingBag className="mx-auto mb-3 h-10 w-10 text-gray-200" />
                  <p className="text-gray-400">No orders found</p>
                </td>
              </tr>
            ) : (
              filtered.map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-xs text-gray-600">
                    #{order.id.toString().slice(0, 8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">
                      {order.profiles?.full_name || "Customer"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {order.profiles?.email}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {order.order_items?.length || 0} item(s)
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    {formatPrice(order.total_price)}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative inline-block">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order.id, e.target.value as OrderStatus)
                        }
                        className={`appearance-none rounded-full px-3 py-1 pr-7 text-xs font-medium cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : order.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.status === "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 opacity-60" />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
