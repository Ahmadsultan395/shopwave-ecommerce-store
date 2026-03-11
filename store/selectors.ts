// store/selectors.ts
// Sabhi selectors ek jagah — reusable, testable

import type { RootState } from "./index";

// Cart selectors
export const selectCartItems    = (s: RootState) => s.cart.items;
export const selectCartTotal    = (s: RootState) => s.cart.total;
export const selectCartCount    = (s: RootState) => s.cart.count;
export const selectCartIsEmpty  = (s: RootState) => s.cart.items.length === 0;
export const selectItemById     = (id: string) => (s: RootState) =>
  s.cart.items.find((i) => i.product.id === id);
export const selectIsInCart     = (id: string) => (s: RootState) =>
  s.cart.items.some((i) => i.product.id === id);

// UI selectors
export const selectToasts          = (s: RootState) => s.ui.toasts;
export const selectIsMobileMenuOpen = (s: RootState) => s.ui.isMobileMenuOpen;
