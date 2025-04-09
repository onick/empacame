import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  items: string[]; // Array of product IDs
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToWishlist: (productId: string) => {
        const currentItems = get().items;
        if (!currentItems.includes(productId)) {
          set({ items: [...currentItems, productId] });
        }
      },
      
      removeFromWishlist: (productId: string) => {
        const currentItems = get().items;
        set({ items: currentItems.filter(id => id !== productId) });
      },
      
      isInWishlist: (productId: string) => {
        return get().items.includes(productId);
      },
      
      clearWishlist: () => {
        set({ items: [] });
      }
    }),
    {
      name: 'wishlist',
    }
  )
);