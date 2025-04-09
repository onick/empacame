"use client";

import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/lib/stores/cart-store';

export function CartButton() {
  const { items, toggleCart } = useCartStore();
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <button 
      type="button" 
      className="relative p-2 text-gray-500 hover:text-gray-700"
      onClick={toggleCart}
    >
      <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
          {itemCount}
        </span>
      )}
    </button>
  );
}