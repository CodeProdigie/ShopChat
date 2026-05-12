"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return <Toaster position="top-right" richColors toastOptions={{ duration: 4000 }} />;
}
