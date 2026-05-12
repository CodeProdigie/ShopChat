import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopChat",
  description:
    "A conversational commerce platform where chat is the primary buying experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("shopchat-theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground font-sans">
       <ClerkProvider>
         {children}
       </ClerkProvider>
      </body>
    </html>
  );
}
