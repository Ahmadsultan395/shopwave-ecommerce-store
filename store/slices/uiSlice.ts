// store/slices/uiSlice.ts
// Global UI state — toasts, modals, sidebar

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface UIState {
  toasts: Toast[];
  isMobileMenuOpen: boolean;
}

const initialState: UIState = {
  toasts: [],
  isMobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showToast(state, action: PayloadAction<Omit<Toast, "id">>) {
      const id = `${Date.now()}-${Math.random()}`;
      state.toasts.push({ id, ...action.payload });
    },
    hideToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    toggleMobileMenu(state) {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu(state) {
      state.isMobileMenuOpen = false;
    },
  },
});

export const { showToast, hideToast, toggleMobileMenu, closeMobileMenu } =
  uiSlice.actions;

export default uiSlice.reducer;
