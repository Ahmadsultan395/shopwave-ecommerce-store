// store/slices/cartSlice.ts
// Cart ka poora state Redux mein — add, remove, update, clear

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  count: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
  count: 0,
};

// Helper — har action ke baad totals recalculate karo
function recalculate(items: CartItem[]): Pick<CartState, "total" | "count"> {
  return {
    total: items.reduce((s, i) => s + i.product.price * i.quantity, 0),
    count: items.reduce((s, i) => s + i.quantity, 0),
  };
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        existing.quantity = Math.min(existing.quantity + 1, product.stock);
      } else {
        state.items.push({ product, quantity: 1 });
      }
      Object.assign(state, recalculate(state.items));
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
      Object.assign(state, recalculate(state.items));
    },

    updateQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.product.id !== productId);
      } else {
        const item = state.items.find((i) => i.product.id === productId);
        if (item) item.quantity = Math.min(quantity, item.product.stock);
      }
      Object.assign(state, recalculate(state.items));
    },

    clearCart(state) {
      state.items = [];
      state.total = 0;
      state.count = 0;
    },

    // localStorage se hydrate karo — app load pe call hoga
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      Object.assign(state, recalculate(action.payload));
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, hydrateCart } =
  cartSlice.actions;

export default cartSlice.reducer;
