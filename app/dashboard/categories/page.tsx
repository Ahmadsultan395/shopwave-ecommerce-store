"use client";
// app/dashboard/categories/page.tsx
import { useEffect, useState } from "react";
import { useForm }             from "react-hook-form";
import { zodResolver }         from "@hookform/resolvers/zod";
import { Plus, Edit2, Trash2, X, Tags } from "lucide-react";
import { createClient }        from "@/supabase/client";
import { categorySchema, type CategorySchema } from "@/lib/validations";
import { useToast }            from "@/hooks/useToast";
import { slugify, formatDate } from "@/utils";
import { Input }               from "@/components/ui/Input";
import { Button }              from "@/components/ui/Button";
import type { Category }       from "@/types";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm]     = useState(false);
  const [editing, setEditing]       = useState<Category | null>(null);
  const [loading, setLoading]       = useState(true);
  const { toast }                   = useToast();
  const supabase                    = createClient();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
  });

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*").order("created_at", { ascending: false });
    setCategories(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  const openAdd = () => { setEditing(null); reset({ name: "" }); setShowForm(true); };
  const openEdit = (c: Category) => { setEditing(c); reset({ name: c.name }); setShowForm(true); };

  const onSubmit = async (data: CategorySchema) => {
    const payload = { name: data.name, slug: slugify(data.name) };
    if (editing) {
      const { error } = await supabase.from("categories").update(payload).eq("id", editing.id);
      if (error) { toast("Failed to update", "error"); return; }
      toast("Category updated!", "success");
    } else {
      const { error } = await supabase.from("categories").insert(payload);
      if (error) {
        toast(error.code === "23505" ? "Name already exists" : "Failed to create", "error");
        return;
      }
      toast("Category created!", "success");
    }
    setShowForm(false);
    fetchCategories();
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) { toast("Failed to delete", "error"); return; }
    toast("Category deleted", "success");
    fetchCategories();
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="mt-1 text-gray-500">{categories.length} total</p>
        </div>
        <Button onClick={openAdd}><Plus className="h-4 w-4" />Add Category</Button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">{editing ? "Edit" : "Add"} Category</h2>
              <button onClick={() => setShowForm(false)} className="rounded-lg p-1 hover:bg-gray-100"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input label="Category Name" placeholder="e.g. Electronics..." error={errors.name?.message} required {...register("name")} />
              <div className="flex gap-3">
                <Button type="submit" fullWidth loading={isSubmitting}>{editing ? "Update" : "Create"}</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="py-16 text-center text-gray-400">Loading...</div>
      ) : categories.length === 0 ? (
        <div className="py-20 text-center">
          <Tags className="mx-auto mb-3 h-12 w-12 text-gray-200" />
          <p className="text-gray-400">No categories yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((cat) => (
            <div key={cat.id} className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                  <Tags className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{cat.name}</p>
                  <p className="text-xs text-gray-400">{formatDate(cat.created_at)}</p>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(cat)} className="rounded-lg p-1.5 text-gray-400 hover:bg-blue-50 hover:text-blue-600"><Edit2 className="h-4 w-4" /></button>
                <button onClick={() => deleteCategory(cat.id)} className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
