import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
      <ThemeToggle />
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="rounded-xl bg-primary px-6 py-3 text-white font-semibold shadow-lg hover:-translate-y-0.5 transition-transform">Go Home</Link>
    </div>
  );
}
