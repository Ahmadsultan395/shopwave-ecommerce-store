// hooks/useCart.ts
// Cart hook — Redux actions aur selectors wrap karta hai
// Components mein direct Redux import karne ki zaroorat nahi

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { addItem, removeItem, updateQuantity, clearCart } from "@/store/slices/cartSlice";
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  selectCartIsEmpty,
  selectIsInCart,
  selectItemById,
} from "@/store/selectors";
import type { Product } from "@/types";

export function useCart() {
  const dispatch = useAppDispatch();

  const items    = useAppSelector(selectCartItems);
  const total    = useAppSelector(selectCartTotal);
  const count    = useAppSelector(selectCartCount);
  const isEmpty  = useAppSelector(selectCartIsEmpty);

  const add = useCallback(
    (product: Product) => dispatch(addItem(product)),
    [dispatch]
  );

  const remove = useCallback(
    (productId: string) => dispatch(removeItem(productId)),
    [dispatch]
  );

  const updateQty = useCallback(
    (productId: string, quantity: number) =>
      dispatch(updateQuantity({ productId, quantity })),
    [dispatch]
  );

  const clear = useCallback(() => dispatch(clearCart()), [dispatch]);

  // Per-product helpers
  const isInCart    = (id: string) => useAppSelector(selectIsInCart(id));
  const getItem     = (id: string) => useAppSelector(selectItemById(id));

  return {
    items,
    total,
    count,
    isEmpty,
    addItem: add,
    removeItem: remove,
    updateQuantity: updateQty,
    clearCart: clear,
    isInCart,
    getItem,
  };
}
