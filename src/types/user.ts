import { Address } from './address';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  phone?: string;
  address?: Address;
  createdAt: Date;
  emailVerified?: Date;
  image?: string;
}