"use client";
// components/ui/Toast.tsx
// Global toast renderer — Redux UI state se toasts dikhata hai

import { useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/utils";

const icons = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error:   <XCircle    className="h-5 w-5 text-red-500"   />,
  warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
  info:    <Info        className="h-5 w-5 text-blue-500"  />,
};

const bgMap = {
  success: "border-green-200 bg-green-50",
  error:   "border-red-200   bg-red-50",
  warning: "border-yellow-200 bg-yellow-50",
  info:    "border-blue-200  bg-blue-50",
};

function SingleToast({
  id,
  message,
  type,
}: {
  id: string;
  message: string;
  type: keyof typeof icons;
}) {
  const { dismiss } = useToast();

  useEffect(() => {
    const t = setTimeout(() => dismiss(id), 3000);
    return () => clearTimeout(t);
  }, [id, dismiss]);

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg",
        "animate-in slide-in-from-bottom-2 duration-300",
        bgMap[type]
      )}
    >
      {icons[type]}
      <p className="text-sm font-medium text-gray-800">{message}</p>
      <button
        onClick={() => dismiss(id)}
        className="ml-2 text-gray-400 hover:text-gray-600"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// Ye component app layout mein ek dafa render karo
export function ToastContainer() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <SingleToast key={t.id} {...t} />
      ))}
    </div>
  );
}
