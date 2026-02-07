"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag, Menu } from "lucide-react";
import useCart from "@/hooks/useCart";
import Link from "next/link";

export default function Home() {
  const { itemCount } = useCart();
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({ page: 0, count: 20, available: true }),
  });

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-stone-50/80 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="font-semibold text-lg tracking-tight">
              FREEDOM THREADS
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-stone-200 rounded-full transition-colors">
                <Menu className="w-5 h-5" />
              </button>
              <Link 
                href="/cart" 
                className="p-2 hover:bg-stone-200 rounded-full transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-stone-900 text-stone-50 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900">
              Minimal. Bold. Yours.
            </h1>
            <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto">
              Clean essentials for those who speak their mind.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square w-full rounded-lg bg-stone-200" />
                  <Skeleton className="h-4 w-3/4 bg-stone-200" />
                  <Skeleton className="h-4 w-1/2 bg-stone-200" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-stone-600">Failed to load products.</p>
              <button 
                className="mt-4 text-stone-900 underline underline-offset-4"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          ) : products?.products?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-stone-600">No products available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products?.products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-stone-500">
            © 2025 Freedom Threads. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}