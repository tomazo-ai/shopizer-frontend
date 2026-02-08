"use client";

import { Product } from "@/types/shopizer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isLoading } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const imageUrl = product.images?.[0]?.url 
    ? `${process.env.NEXT_PUBLIC_API_URL}${product.images[0].url}`
    : "/placeholder-product.png";

  const displayPrice = product.finalPrice || product.originalPrice || `${product.price}`;
  
  // API returns name inside description object
  const productName = (product.description as any)?.name || product.name || 'Item';

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.available || !product.canBePurchased) {
      toast.error("This product is not available for purchase");
      return;
    }

    setIsAdding(true);
    try {
      await addToCart(product, 1);
      setShowSuccess(true);
      toast.success(`${productName} added to cart`);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 1500);
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card className="group overflow-hidden border-0 bg-transparent shadow-none transition-all">
      <CardContent className="p-0 space-y-3">
        {/* Image Container */}
        <Link href={`/products/${product.friendlyUrl || product.id}`} className="block">
          <div className="relative aspect-square bg-stone-100 rounded-lg overflow-hidden">
            {product.images?.[0] ? (
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
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

            {/* Add to Cart Button - appears on hover */}
            {product.available && product.canBePurchased && (
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  className="bg-stone-900 hover:bg-stone-800 text-white shadow-lg"
                  onClick={handleAddToCart}
                  disabled={isAdding || isLoading}
                >
                  {isAdding ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : showSuccess ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <ShoppingBag className="w-4 h-4" />
                  )}
                </Button>
              </div>
            )}
          </div>
        </Link>

        {/* Product Info */}
        <div className="space-y-2">
          <Link href={`/products/${product.friendlyUrl || product.id}`} className="block">
            <h3 className="font-medium text-sm text-stone-900 line-clamp-1 hover:text-stone-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center justify-between">
            <p className="text-sm text-stone-600">
              {displayPrice}
            </p>
            
            {/* Always visible add to cart button for mobile */}
            {product.available && product.canBePurchased && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs hover:bg-stone-100 lg:hidden"
                onClick={handleAddToCart}
                disabled={isAdding || isLoading}
              >
                {isAdding ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : showSuccess ? (
                  <Check className="w-3 h-3 text-green-600" />
                ) : (
                  <ShoppingBag className="w-3 h-3" />
                )}
              </Button>
            )}
          </div>
          
          {/* Desktop: Add to cart button below product info */}
          {product.available && product.canBePurchased && (
            <Button
              variant="outline"
              size="sm"
              className="w-full hidden lg:flex border-stone-200 hover:bg-stone-100 hover:border-stone-300"
              onClick={handleAddToCart}
              disabled={isAdding || isLoading}
            >
              {isAdding ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : showSuccess ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-600" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
