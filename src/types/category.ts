export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  featured: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}