import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Cart, CartItem } from '@/types/shopizer';
import { createCart, getCart, addToCart, updateCartItem, removeCartItem } from '@/lib/api';

interface CartState {
  cart: Cart | null;
  cartId: number | null;
  isLoading: boolean;
  error: string | null;
  itemCount: number;
  
  // Actions
  initCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
  addItem: (productSku: string, quantity: number, attributes?: Array<{ code: string; value: string }>) => Promise<void>;
  updateItem: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => void;
  getTotalItems: () => number;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      cartId: null,
      isLoading: false,
      error: null,
      itemCount: 0,

      initCart: async () => {
        const { cartId } = get();
        if (cartId) return;
        
        set({ isLoading: true, error: null });
        try {
          const newCart = await createCart();
          set({
            cart: newCart,
            cartId: newCart.id,
            itemCount: newCart.products?.reduce((sum: number, item: CartItem) => sum + item.quantity, 0) || 0,
          });
        } catch (error) {
          set({ error: 'Failed to create cart' });
          console.error('Cart initialization error:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      fetchCart: async () => {
        const { cartId } = get();
        if (!cartId) {
          await get().initCart();
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const cart = await getCart(cartId);
          set({
            cart,
            itemCount: cart.products?.reduce((sum: number, item: CartItem) => sum + item.quantity, 0) || 0,
          });
        } catch (error) {
          set({ error: 'Failed to fetch cart' });
          console.error('Fetch cart error:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      addItem: async (productSku: string, quantity: number, attributes?: Array<{ code: string; value: string }>) => {
        const { cartId } = get();
        if (!cartId) {
          await get().initCart();
        }
        
        const currentCartId = get().cartId;
        if (!currentCartId) return;

        set({ isLoading: true, error: null });
        try {
          const cart = await addToCart(currentCartId, {
            product: productSku,
            quantity,
            attributes,
          });
          set({
            cart,
            itemCount: cart.products?.reduce((sum: number, item: CartItem) => sum + item.quantity, 0) || 0,
          });
        } catch (error) {
          set({ error: 'Failed to add item to cart' });
          console.error('Add to cart error:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      updateItem: async (itemId: number, quantity: number) => {
        const { cartId } = get();
        if (!cartId) return;

        if (quantity <= 0) {
          await get().removeItem(itemId);
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const cart = await updateCartItem(cartId, itemId, quantity);
          set({
            cart,
            itemCount: cart.products?.reduce((sum: number, item: CartItem) => sum + item.quantity, 0) || 0,
          });
        } catch (error) {
          set({ error: 'Failed to update item' });
          console.error('Update cart item error:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (itemId: number) => {
        const { cartId } = get();
        if (!cartId) return;

        set({ isLoading: true, error: null });
        try {
          const cart = await removeCartItem(cartId, itemId);
          set({
            cart,
            itemCount: cart.products?.reduce((sum: number, item: CartItem) => sum + item.quantity, 0) || 0,
          });
        } catch (error) {
          set({ error: 'Failed to remove item' });
          console.error('Remove cart item error:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: () => {
        // Server-side cart persists but we clear local state
        set({ cart: null, cartId: null, itemCount: 0, error: null });
      },

      getTotalItems: () => {
        return get().itemCount;
      },

      getCartTotal: () => {
        const { cart } = get();
        return cart?.total || 0;
      },
    }),
    {
      name: 'shopizer-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cartId: state.cartId }), // Only persist cartId
    }
  )
);

export default useCartStore;