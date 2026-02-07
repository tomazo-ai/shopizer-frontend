"use client";

import { Product } from "@/types/shopizer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.url 
    ? `${process.env.NEXT_PUBLIC_API_URL}${product.images[0].url}`
    : "/placeholder-product.png";

  const displayPrice = product.finalPrice || product.originalPrice || `${product.price}`;

  return (
    <Link href={`/products/${product.friendlyUrl || product.id}`}>
      <Card className="group overflow-hidden border-0 bg-transparent shadow-none hover:opacity-90 transition-opacity">
        <CardContent className="p-0 space-y-3">
          {/* Image Container */}
          <div className="relative aspect-square bg-stone-100 rounded-lg overflow-hidden">
            {product.images?.[0] ? (
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-400">
                <span className="text-sm">No image</span>
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.discounted && (
                <Badge variant="secondary" className="bg-stone-900 text-stone-50 text-[10px] px-2 py-0.5">
                  SALE
                </Badge>
              )}
              {!product.available && (
                <Badge variant="secondary" className="bg-stone-400 text-stone-900 text-[10px] px-2 py-0.5">
                  SOLD OUT
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-1">
            <h3 className="font-medium text-sm text-stone-900 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-stone-600">
              {displayPrice}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
