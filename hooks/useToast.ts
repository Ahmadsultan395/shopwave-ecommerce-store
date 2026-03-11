// hooks/useToast.ts
// Toast notifications Redux UI slice se

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { showToast, hideToast } from "@/store/slices/uiSlice";
import { selectToasts } from "@/store/selectors";
import type { ToastType } from "@/store/slices/uiSlice";

export function useToast() {
  const dispatch = useAppDispatch();
  const toasts   = useAppSelector(selectToasts);

  const toast = useCallback(
    (message: string, type: ToastType = "success") => {
      dispatch(showToast({ message, type }));
    },
    [dispatch]
  );

  const dismiss = useCallback(
    (id: string) => dispatch(hideToast(id)),
    [dispatch]
  );

  return { toasts, toast, dismiss };
}
