import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shop | Freedom Threads",
  description: "Minimal fashion for those who speak up. Hoodies and t-shirts delivered discreetly.",
  keywords: ["fashion", "hoodies", "t-shirts", "minimal", "streetwear"],
  authors: [{ name: "Freedom Threads" }],
  openGraph: {
    title: "Freedom Threads | Minimal Fashion",
    description: "Clean minimal fashion for the bold",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-stone-50 text-stone-900`}
      >
        <Providers>
          {children}
          <Toaster 
            position="bottom-center"
            toastOptions={{
              style: {
                background: "#292524",
                color: "#fafaf9",
                border: "none",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}