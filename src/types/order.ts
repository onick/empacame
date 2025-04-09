import { CartItem } from "./cart";
import { Address } from "./address";

export interface OrderItem extends CartItem {
  priceAtPurchase: number;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  status: 'Pendiente' | 'Procesando' | 'Enviado' | 'Entregado' | 'Cancelado';
  shipping: number;
  tax: number;
  subtotal: number;
  total: number;
  paymentStatus: 'Pendiente' | 'Pagado' | 'Fallido';
  paymentMethod: string;
  shippingAddress: Address;
  billingAddress?: Address;
  notes?: string;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}