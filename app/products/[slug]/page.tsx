"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProductByFriendlyUrl, getProductById } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import useCart from "@/hooks/useCart";
import { ShoppingBag, ArrowLeft, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToCart, isInCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  // Try to fetch by friendly URL first, fallback to ID if numeric
  const isNumeric = /^\d+$/.test(slug);
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      if (isNumeric) {
        return getProductById(parseInt(slug, 10));
      }
      return getProductByFriendlyUrl(slug);
    },
  });

  const handleAddToCart = async () => {
    if (!product) return;
    
    setAddingToCart(true);
    try {
      await addToCart(product, quantity);
      toast.success("Added to cart", {
        description: `${product.name} (${quantity})`,
      });
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const imageUrl = product?.images?.[0]?.url
    ? `${process.env.NEXT_PUBLIC_API_URL}${product.images[0].url}`
    : "/placeholder-product.png";

  const displayPrice = product?.finalPrice || product?.originalPrice || `${product?.price}`;

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-stone-50/80 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </Link>

            <span className="font-semibold text-lg tracking-tight">
              FREEDOM THREADS
            </span>

            <Link 
              href="/cart" 
              className="p-2 hover:bg-stone-200 rounded-full transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square w-full bg-stone-200" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4 bg-stone-200" />
              <Skeleton className="h-6 w-1/3 bg-stone-200" />
              <Skeleton className="h-24 w-full bg-stone-200" />
              <Skeleton className="h-12 w-full bg-stone-200" />
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-stone-600">Product not found.</p>
            <Link 
              href="/" 
              className="mt-4 inline-block text-stone-900 underline underline-offset-4"
            >
              Back to home
            </Link>
          </div>
        ) : product ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative aspect-square bg-stone-100 rounded-lg overflow-hidden">
              {product.images?.[0] ? (
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400">
                  <span>No image available</span>
                </div>
              )}
              
              {product.discounted && (
                <Badge 
                  className="absolute top-4 left-4 bg-stone-900 text-stone-50"
                >
                  SALE
                </Badge>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold text-stone-900">
                  {product.name}
                </h1>
                <p className="text-xl text-stone-700">
                  {displayPrice}
                </p>
              </div>

              {product.description && (
                <p className="text-stone-600 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-stone-700">Quantity:</span>
                <div className="flex items-center border border-stone-200 rounded-lg">
                  <button
                    className="p-2 hover:bg-stone-100 transition-colors disabled:opacity-50"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    className="p-2 hover:bg-stone-100 transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                className="w-full h-12 bg-stone-900 hover:bg-stone-800 text-stone-50"
                onClick={handleAddToCart}
                disabled={!product.available || addingToCart}
              >
                {addingToCart ? (
                  "Adding..."
                ) : !product.available ? (
                  "Sold Out"
                ) : isInCart(product.sku) ? (
                  "Add More to Cart"
                ) : (
                  "Add to Cart"
                )}
              </Button>

              {/* Product Meta */}
              <div className="pt-4 border-t border-stone-200 space-y-2 text-sm text-stone-600">
                {product.sku && (
                  <p>
                    <span className="font-medium">SKU:</span> {product.sku}
                  </p>
                )}
                {product.quantity > 0 && product.quantity < 10 && (
                  <p className="text-amber-600">
                    Only {product.quantity} left in stock
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
