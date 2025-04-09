import { User } from "./user";
import { Address } from "./address";

export interface Customer extends User {
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: Date;
  status: 'Activo' | 'Inactivo';
  notes?: string;
  addresses: Address[];
  wishlist?: string[]; // Array de IDs de productos
}