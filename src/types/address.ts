export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  name?: string;
  phone?: string;
  isDefault?: boolean;
}