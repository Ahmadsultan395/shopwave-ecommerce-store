"use client";
// providers/ReduxProvider.tsx
// Redux Provider — store wrap karta hai + localStorage se cart hydrate karta hai

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { hydrateCart } from "@/store/slices/cartSlice";
import type { CartItem } from "@/store/slices/cartSlice";

function CartHydrator() {
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    try {
      const raw = localStorage.getItem("shopwave_cart");
      if (raw) {
        const items: CartItem[] = JSON.parse(raw);
        store.dispatch(hydrateCart(items));
      }
    } catch {
      // localStorage parse error — ignore karo
    }

    // Cart change hone par localStorage update karo
    const unsubscribe = store.subscribe(() => {
      const items = store.getState().cart.items;
      localStorage.setItem("shopwave_cart", JSON.stringify(items));
    });

    return () => unsubscribe();
  }, []);

  return null;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartHydrator />
      {children}
    </Provider>
  );
}
