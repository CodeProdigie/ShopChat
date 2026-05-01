"use client";

import { MoonStar, SunMedium } from "lucide-react";

function getPreferredTheme(): "light" | "dark" {
  const storedTheme = window.localStorage.getItem("shopchat-theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  function toggleTheme() {
    const currentTheme =
      document.documentElement.dataset.theme === "dark"
        ? "dark"
        : getPreferredTheme();
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("shopchat-theme", nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color mode"
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/80 text-foreground backdrop-blur hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
    >
      <SunMedium className="hidden h-4 w-4 dark-icon" />
      <MoonStar className="h-4 w-4 light-icon" />
    </button>
  );
}
