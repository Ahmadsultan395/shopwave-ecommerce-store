"use client";
// components/product/ProductCard.tsx
import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Package } from "lucide-react";
import { Button }      from "@/components/ui/Button";
import { Badge }       from "@/components/ui/Card";
import { useCart }     from "@/hooks/useCart";
import { useToast }    from "@/hooks/useToast";
import { formatPrice, truncate } from "@/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast }   = useToast();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    toast(`"${product.name}" added to cart!`, "success");
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const outOfStock = product.stock === 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image || "https://placehold.co/400x400?text=No+Image"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-700">
              Out of Stock
            </span>
          </div>
        )}
        {product.category && (
          <div className="absolute left-3 top-3">
            <Badge variant="info">{product.category.name}</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 font-semibold text-gray-900 line-clamp-1">
          {product.name}
        </h3>
        <p className="mb-3 text-sm text-gray-500 line-clamp-2">
          {truncate(product.description, 80)}
        </p>

        <div className="mt-auto">
          <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
            <Package className="h-3.5 w-3.5" />
            {product.stock > 10
              ? "In stock"
              : product.stock > 0
              ? `Only ${product.stock} left`
              : "Out of stock"}
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            <Button
              size="sm"
              onClick={handleAdd}
              disabled={outOfStock}
              variant={added ? "secondary" : "primary"}
            >
              <ShoppingCart className="h-4 w-4" />
              {added ? "Added!" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
