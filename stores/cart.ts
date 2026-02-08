import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Cart, CartItem } from '@/types/shopizer';
import { createCart, getCart, addToCart, updateCartItem, removeCartItem } from '@/lib/api';

interface CartState {
  cart: Cart | null;
  cartCode: string | null;
  isLoading: boolean;
  error: string | null;
  itemCount: number;
  
  // Actions
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
      cartCode: null,
      isLoading: false,
      error: null,
      itemCount: 0,

      fetchCart: async () => {
        const { cartCode } = get();
        if (!cartCode) return;

        set({ isLoading: true, error: null });
        try {
          const cart = await getCart(cartCode);
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
        const { cartCode, cart } = get();

        set({ isLoading: true, error: null });
        try {
          let newCart: Cart;

          if (!cartCode) {
            // No cart exists - create new cart with POST /api/v1/cart
            newCart = await createCart({
              product: productSku,
              quantity,
              attributes,
            });
            // Extract and store the cart code from response
            set({ cartCode: newCart.code });
          } else {
            // Cart exists - check if product already in cart
            const existingItem = cart?.products?.find(
              (item: CartItem) => item.sku === productSku
            );

            if (existingItem) {
              // Product already exists - update quantity (current + adding)
              const newQuantity = existingItem.quantity + quantity;
              newCart = await updateCartItem(cartCode, existingItem.sku, newQuantity);
            } else {
              // Product doesn't exist - add to existing cart with PUT /api/v1/cart/{code}
              newCart = await addToCart(cartCode, {
                product: productSku,
                quantity,
                attributes,
              });
            }
          }

          set({
            cart: newCart,
            itemCount: newCart.products?.reduce((sum: number, item: CartItem) => sum + item.quantity, 0) || 0,
          });
        } catch (error) {
          set({ error: 'Failed to add item to cart' });
          console.error('Add to cart error:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      updateItem: async (itemId: number, quantity: number) => {
        const { cartCode, cart } = get();
        if (!cartCode) return;

        // Find the item in cart to get its SKU
        const item = cart?.products?.find((p: CartItem) => p.id === itemId);
        if (!item) return;

        if (quantity <= 0) {
          await get().removeItem(itemId);
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const updatedCart = await updateCartItem(cartCode, item.sku, quantity);
          set({
            cart: updatedCart,
            itemCount: updatedCart.products?.reduce((sum: number, item: CartItem) => sum + item.quantity, 0) || 0,
          });
        } catch (error) {
          set({ error: 'Failed to update item' });
          console.error('Update cart item error:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (itemId: number) => {
        const { cartCode } = get();
        if (!cartCode) return;

        set({ isLoading: true, error: null });
        try {
          const cart = await removeCartItem(cartCode, itemId);
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
        set({ cart: null, cartCode: null, itemCount: 0, error: null });
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
      partialize: (state) => ({ cartCode: state.cartCode }), // Only persist cartCode
    }
  )
);

export default useCartStore;