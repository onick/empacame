export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  categoryId: string;
  stock: number;
  status: 'Activo' | 'Agotado' | 'Descontinuado';
  featured: boolean;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}