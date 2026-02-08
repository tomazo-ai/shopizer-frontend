"use client";

import useCart from "@/hooks/useCart";
import { CartItem } from "@/types/shopizer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2, Minus, Plus, ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

export default function CartPage() {
  const { cart, isLoading, itemCount, cartTotal, updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = async (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateQuantity(item.id, newQuantity);
  };

  const handleRemove = async (item: CartItem) => {
    await removeFromCart(item.id);
    toast.success(`${item.productName} removed from cart`);
  };

  const subtotal = cart?.subtotal || 0;
  const displaySubtotal = cart?.displaySubTotal || `$${subtotal.toFixed(2)}`;
  const displayTotal = cart?.displayTotal || `$${cartTotal.toFixed(2)}`;

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-stone-50/80 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="font-semibold text-lg tracking-tight">
              FREEDOM THREADS
            </Link>

            {/* Cart indicator */}
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <ShoppingBag className="w-4 h-4" />
              <span>{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="text-2xl font-semibold text-stone-900">Shopping Cart</h1>
        </div>

        {isLoading ? (
          /* Loading State */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white rounded-lg">
                  <Skeleton className="w-24 h-24 bg-stone-200" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4 bg-stone-200" />
                    <Skeleton className="h-4 w-1/4 bg-stone-200" />
                    <Skeleton className="h-8 w-32 bg-stone-200" />
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-64 w-full bg-stone-200" />
            </div>
          </div>
        ) : !cart?.products?.length ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-stone-400" />
            </div>
            <h2 className="text-xl font-semibold text-stone-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-stone-600 mb-6 max-w-sm mx-auto">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link href="/">
              <Button className="bg-stone-900 hover:bg-stone-800 text-white">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          /* Cart Content */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.products.map((item) => {
                const imageUrl = item.image?.url
                  ? `${process.env.NEXT_PUBLIC_API_URL}${item.image.url}`
                  : item.images?.[0]?.url
                  ? `${process.env.NEXT_PUBLIC_API_URL}${item.images[0].url}`
                  : "/placeholder-product.png";

                const itemPrice = item.finalPrice || `$${item.price?.toFixed(2) || '0.00'}`;
                const itemTotal = item.displaySubTotal || `$${item.subTotal?.toFixed(2) || '0.00'}`;
                const productLink = `/products/${item.sku}`;

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-white rounded-lg border border-stone-100"
                  >
                    {/* Product Image */}
                    <Link href={productLink} className="shrink-0">
                      <div className="w-24 h-24 bg-stone-100 rounded-md overflow-hidden relative">
                        <Image
                          src={imageUrl}
                          alt={item.productName || "Product"}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link
                            href={productLink}
                            className="font-medium text-stone-900 hover:text-stone-600 transition-colors line-clamp-1"
                          >
                            {item.productName}
                          </Link>
                          <p className="text-sm text-stone-600 mt-1">{itemPrice}</p>
                          
                          {/* Attributes if available */}
                          {item.attributes && item.attributes.length > 0 && (
                            <p className="text-xs text-stone-500 mt-1">
                              {item.attributes.map((attr, idx) => (
                                <span key={attr.id}>
                                  {attr.option?.name}: {attr.optionValue?.name}
                                  {idx < item.attributes!.length - 1 && ", "}
                                </span>
                              ))}
                            </p>
                          )}
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(item)}
                          className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          aria-label={`Remove ${item.productName} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity and Subtotal */}
                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-stone-200 text-stone-600 hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Line Item Subtotal */}
                        <p className="font-semibold text-stone-900">{itemTotal}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-stone-100 p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-stone-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">Subtotal</span>
                    <span className="text-stone-900">{displaySubtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">Shipping</span>
                    <span className="text-stone-500">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-stone-100 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-stone-900">Total</span>
                      <span className="font-semibold text-stone-900">{displayTotal}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white h-12"
                  onClick={() => toast.info("Checkout coming soon!")}
                >
                  Proceed to Checkout
                </Button>

                <Link
                  href="/"
                  className="block text-center text-sm text-stone-600 hover:text-stone-900 mt-4 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-6 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-stone-500">
            © 2025 Freedom Threads. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
