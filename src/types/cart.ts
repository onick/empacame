export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  sku: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  userId?: string;
}