'use client';

import { useCallback } from 'react';
import useCartStore from '@/stores/cart';
import { CartItem, Product } from '@/types/shopizer';

export function useCart() {
  const {
    cart,
    cartCode,
    isLoading,
    error,
    itemCount,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
    clearCart,
  } = useCartStore();

  const addToCart = useCallback(
    async (product: Product, quantity: number = 1, selectedOptions?: Record<string, string>) => {
      if (!product.sku) {
        console.error('Product has no SKU');
        return;
      }

      // Convert selected options to attributes format
      const attributes = selectedOptions
        ? Object.entries(selectedOptions).map(([code, value]) => ({
            code,
            value,
          }))
        : undefined;

      await addItem(product.sku, quantity, attributes);
    },
    [addItem]
  );

  const updateQuantity = useCallback(
    async (itemId: number, quantity: number) => {
      await updateItem(itemId, quantity);
    },
    [updateItem]
  );

  const removeFromCart = useCallback(
    async (itemId: number) => {
      await removeItem(itemId);
    },
    [removeItem]
  );

  const getItemQuantity = useCallback(
    (productSku: string): number => {
      const item = cart?.products?.find((p: CartItem) => p.sku === productSku);
      return item?.quantity || 0;
    },
    [cart]
  );

  const isInCart = useCallback(
    (productSku: string): boolean => {
      return cart?.products?.some((p: CartItem) => p.sku === productSku) || false;
    },
    [cart]
  );

  const cartTotal = cart?.total || 0;
  const cartSubtotal = cart?.subtotal || 0;

  return {
    cart,
    cartCode,
    isLoading,
    error,
    itemCount,
    cartTotal,
    cartSubtotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    getItemQuantity,
    isInCart,
    clearCart,
    refreshCart: fetchCart,
  };
}

export default useCart;