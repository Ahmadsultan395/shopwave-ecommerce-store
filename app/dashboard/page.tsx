// /app/dashboard/page.tsx
import { createClient } from "@/supabase/server";
import {
  Package,
  Tags,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Clock,
} from "lucide-react";
import { formatPrice, formatDate } from "@/utils";
import { Badge } from "@/components/ui/Card";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { count: productsCount },
    { count: categoriesCount },
    { data: orders },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("total_price, status"),
  ]);

  // Fetch recent orders
  const { data: recentOrdersRaw, error: recentOrdersError } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  if (recentOrdersError) console.error(recentOrdersError);

  // Fetch corresponding emails
  const userIds = recentOrdersRaw?.map((o) => o.user_id) || [];
  const { data: users, error: usersError } = await supabase
    .from("profiles")
    .select("id, email")
    .in("id", userIds);

  if (usersError) console.error(usersError);

  // Merge email into recent orders
  const recentOrders = recentOrdersRaw?.map((o) => ({
    ...o,
    email: users?.find((u) => u.id === o.user_id)?.email || "Unknown",
  }));

  console.log(recentOrders);

  const totalRevenue =
    orders
      ?.filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + o.total_price, 0) || 0;
  const pendingOrders =
    orders?.filter((o) => o.status === "pending").length || 0;

  const stats = [
    {
      label: "Total Products",
      value: productsCount || 0,
      icon: Package,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Categories",
      value: categoriesCount || 0,
      icon: Tags,
      color: "text-purple-600 bg-purple-50",
    },
    {
      label: "Total Orders",
      value: orders?.length || 0,
      icon: ShoppingBag,
      color: "text-green-600 bg-green-50",
    },
    {
      label: "Revenue",
      value: formatPrice(totalRevenue),
      icon: DollarSign,
      color: "text-yellow-600 bg-yellow-50",
      isRevenue: true,
    },
  ];

  const statusVariant = (status: string) => {
    const map: Record<string, "warning" | "success" | "error" | "default"> = {
      pending: "warning",
      processing: "info" as any,
      completed: "success",
      cancelled: "error",
    };
    return map[status] || "default";
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-500">
          Welcome back! Here&apos;s what&apos;s happening.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
              >
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick info */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending orders alert */}
        {pendingOrders > 0 && (
          <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-5">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-yellow-600" />
              <div>
                <p className="font-semibold text-yellow-800">
                  {pendingOrders} Pending Order(s)
                </p>
                <p className="text-sm text-yellow-600">
                  Requires your attention
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Revenue trend */}
        <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">Total Revenue</p>
              <p className="text-sm text-green-600">
                {formatPrice(totalRevenue)} from completed orders
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="mt-8 rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders?.map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-xs text-gray-600">
                    #{order?.id?.toString()?.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {order.profiles?.email || "Unknown"}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {formatPrice(order.total_price)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={statusVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {formatDate(order.created_at)}
                  </td>
                </tr>
              ))}
              {(!recentOrders || recentOrders.length === 0) && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-400"
                  >
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
