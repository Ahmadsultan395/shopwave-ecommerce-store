"use client";
// app/dashboard/products/page.tsx
import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Edit2, Trash2, X, Package } from "lucide-react";
import { createClient } from "@/supabase/client";
import { productSchema, type ProductSchema } from "@/lib/validations";
import { useToast } from "@/hooks/useToast";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Card";
import { formatPrice } from "@/utils";
import type { Product, Category } from "@/types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const supabase = createClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
  });

  const fetchData = async () => {
    try {
      const [{ data: prods, error: prodErr }, { data: cats, error: catErr }] =
        await Promise.all([
          supabase
            .from("products")
            .select("*, category:categories(id,name,slug,created_at)")
            .order("created_at", { ascending: false }),
          supabase.from("categories").select("*").order("name"),
        ]);

      if (prodErr) console.error("Products error:", prodErr);
      if (catErr) console.error("Categories error:", catErr);

      setProducts(prods || []);
      setCategories(cats || []);
      setLoading(false);
    } catch (err) {
      console.error("Fetch failed:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAdd = () => {
    setEditing(null);
    reset({
      name: "",
      description: "",
      price: 0,
      image: "",
      category_id: "",
      stock: 0,
    });
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    reset({
      name: p?.name,
      description: p?.description,
      price: p?.price,
      image: p?.image,
      category_id: p?.category_id,
      stock: p?.stock,
    });
    setShowForm(true);
  };

  const onSubmit = async (data: ProductSchema) => {
    console.log(data);
    if (editing) {
      const { error } = await supabase
        .from("products")
        .update(data)
        .eq("id", editing.id);
      if (error) {
        toast("Failed to update product", "error");
        return;
      }
      toast("Product updated!", "success");
    } else {
      const { error } = await supabase.from("products").insert(data);
      if (error) {
        toast("Failed to add product", "error");
        return;
      }
      toast("Product added!", "success");
    }
    setShowForm(false);
    fetchData();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast("Failed to delete", "error");
      return;
    }
    toast("Product deleted", "success");
    fetchData();
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-gray-500">
            {products?.length} products total
          </p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editing ? "Edit Product" : "Add Product"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-1 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Product Name"
                error={errors.name?.message}
                required
                {...register("name")}
              />
              <Textarea
                label="Description"
                error={errors.description?.message}
                required
                {...register("description")}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Price ($)"
                  type="number"
                  step="0.01"
                  error={errors.price?.message}
                  required
                  {...register("price", { valueAsNumber: true })}
                />
                <Input
                  label="Stock"
                  type="number"
                  error={errors.stock?.message}
                  required
                  {...register("stock", { valueAsNumber: true })}
                />
              </div>
              <Input
                label="Image URL"
                type="url"
                placeholder="https://..."
                error={errors.image?.message}
                required
                {...register("image")}
              />
              <Select
                label="Category"
                options={categories.map((c) => ({
                  value: c.id,
                  label: c.name,
                }))}
                placeholder="Select category"
                error={errors.category_id?.message}
                required
                {...register("category_id")}
              />
              <div className="flex gap-3 pt-2">
                <Button type="submit" fullWidth loading={isSubmitting}>
                  {editing ? "Update" : "Add"} Product
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : products?.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <Package className="mx-auto mb-3 h-10 w-10 text-gray-200" />
                  <p className="text-gray-400">No products yet</p>
                </td>
              </tr>
            ) : (
              products?.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover"
                          onError={(e) =>
                            (e.currentTarget.src = "/placeholder.png")
                          }
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 max-w-[180px] truncate">
                          {p.name}
                        </p>
                        <p className="text-xs text-gray-400 max-w-[180px] truncate">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="info">{p.category?.name || "—"}</Badge>
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    {formatPrice(p?.price)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        p.stock === 0
                          ? "error"
                          : p.stock < 10
                            ? "warning"
                            : "success"
                      }
                    >
                      {p.stock}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
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
