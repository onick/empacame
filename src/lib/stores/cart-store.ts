import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem } from '@/types/cart';

interface CartState extends Cart {
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      isOpen: false,
      
      addItem: (item: CartItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(i => i.productId === item.productId);
        
        let newItems;
        if (existingItem) {
          // Update quantity if item already exists
          newItems = currentItems.map(i => 
            i.productId === item.productId 
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        } else {
          // Add new item
          newItems = [...currentItems, item];
        }
        
        // Calculate new subtotal
        const subtotal = newItems.reduce(
          (total, item) => total + item.price * item.quantity, 
          0
        );
        
        set({ items: newItems, subtotal });
      },
      
      removeItem: (productId: string) => {
        const newItems = get().items.filter(item => item.productId !== productId);
        const subtotal = newItems.reduce(
          (total, item) => total + item.price * item.quantity, 
          0
        );
        
        set({ items: newItems, subtotal });
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        const newItems = get().items.map(item => 
          item.productId === productId 
            ? { ...item, quantity } 
            : item
        );
        
        const subtotal = newItems.reduce(
          (total, item) => total + item.price * item.quantity, 
          0
        );
        
        set({ items: newItems, subtotal });
      },
      
      clearCart: () => {
        set({ items: [], subtotal: 0 });
      },
      
      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }));
      }
    }),
    {
      name: 'shopping-cart',
      // Only persist specific parts of the state
      partialize: (state) => ({ 
        items: state.items, 
        subtotal: state.subtotal 
      }),
    }
  )
);