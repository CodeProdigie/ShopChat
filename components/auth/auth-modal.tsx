"use client";

import { SignIn, SignUp } from "@clerk/nextjs";
import { X } from "lucide-react";

type AuthMode = "sign-in" | "sign-up";

export function AuthModal({
  mode,
  open,
  onClose,
  onModeChange,
}: {
  mode: AuthMode;
  open: boolean;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close authentication modal"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-2xl border border-line bg-surface p-4 shadow-2xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="inline-flex rounded-xl border border-line bg-surface-soft p-1">
            <button
              type="button"
              onClick={() => onModeChange("sign-in")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                mode === "sign-in"
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => onModeChange("sign-up")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                mode === "sign-up"
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign up
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line text-muted-foreground hover:bg-surface-soft hover:text-foreground"
            aria-label="Close authentication modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex justify-center">
          {mode === "sign-in" ? (
            <SignIn
              routing="hash"
              signUpUrl="#"
              fallbackRedirectUrl="/marketplace"
              signUpFallbackRedirectUrl="/marketplace"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  cardBox: "w-full shadow-none",
                  card: "shadow-none border-0 bg-transparent",
                },
              }}
            />
          ) : (
            <SignUp
              routing="hash"
              signInUrl="#"
              fallbackRedirectUrl="/marketplace"
              signInFallbackRedirectUrl="/marketplace"
              unsafeMetadata={{ role: "buyer" }}
              appearance={{
                elements: {
                  rootBox: "w-full",
                  cardBox: "w-full shadow-none",
                  card: "shadow-none border-0 bg-transparent",
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
