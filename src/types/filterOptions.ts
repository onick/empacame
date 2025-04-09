export interface ProductFilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
  featured?: boolean;
  search?: string;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface OrderFilterOptions {
  status?: string;
  paymentStatus?: string;
  startDate?: Date;
  endDate?: Date;
  search?: string;
  sortBy?: 'createdAt' | 'total';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface CustomerFilterOptions {
  status?: string;
  sortBy?: 'name' | 'totalSpent' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  search?: string;
  page?: number;
  limit?: number;
}