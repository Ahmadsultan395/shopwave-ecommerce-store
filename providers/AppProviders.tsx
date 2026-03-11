"use client";
// providers/AppProviders.tsx
// Sabhi providers + global UI components ek jagah

import { AuthProvider }    from "@/context/AuthContext";
import { ReduxProvider }   from "./ReduxProvider";
import { ToastContainer }  from "@/components/ui/Toast";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <AuthProvider>
        {children}
        {/* Global toast notifications — koi bhi page se toast trigger kar sakta hai */}
        <ToastContainer />
      </AuthProvider>
    </ReduxProvider>
  );
}
