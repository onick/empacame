"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { formatPrice } from '@/lib/stores/config-store';
import { useCartStore } from '@/lib/stores/cart-store';

interface Product {
  id: string | number;
  name: string;
  price: number;
  category?: string;
  image?: string;
  sku?: string;
  status?: 'Activo' | 'Agotado' | 'Descontinuado';
  featured?: boolean;
}

interface ProductDisplayProps {
  product: Product;
  showAddToCart?: boolean;
  showCategory?: boolean;
  variant?: 'simple' | 'detailed';
}

export function ProductDisplay({ 
  product, 
  showAddToCart = true, 
  showCategory = true,
  variant = 'simple'
}: ProductDisplayProps) {
  const { addItem } = useCartStore();
  
  const handleAddToCart = () => {
    addItem({
      productId: String(product.id),
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      sku: product.sku || ''
    });
  };

  const isActive = product.status !== 'Agotado' && product.status !== 'Descontinuado';

  return variant === 'simple' ? (
    // Simple variant (for grid layouts)
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Product image */}
      <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-gray-100" />
        {product.image && (
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        )}
        
        {/* Featured badge */}
        {product.featured && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
              Destacado
            </span>
          </div>
        )}
        
        {/* Status badge if not active */}
        {!isActive && product.status && (
          <div className="absolute top-2 right-2 z-10">
            <span className={`text-xs font-semibold px-2 py-1 rounded ${
              product.status === 'Agotado' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.status}
            </span>
          </div>
        )}
      </Link>
      
      {/* Product info */}
      <div className="p-4">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-sm font-medium text-gray-900 hover:text-primary transition-colors">
            {product.name}
          </h3>
          {showCategory && product.category && (
            <p className="mt-1 text-xs text-gray-500">{product.category}</p>
          )}
          <p className="mt-2 text-lg font-semibold text-gray-900">
            {formatPrice(product.price)}
          </p>
        </Link>
        
        {/* Add to cart button */}
        {showAddToCart && isActive && (
          <button
            onClick={handleAddToCart}
            className="mt-3 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            <ShoppingBagIcon className="mr-2 h-4 w-4" />
            Añadir al carrito
          </button>
        )}
        
        {/* Out of stock button */}
        {showAddToCart && !isActive && (
          <button
            disabled
            className="mt-3 w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed"
          >
            No disponible
          </button>
        )}
      </div>
    </div>
  ) : (
    // Detailed variant (for featured products)
    <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="md:w-1/2 relative">
        <div className="h-80 w-full bg-gray-100 relative">
          {product.image && (
            <img 
              src={product.image} 
              alt={product.name} 
              className="h-full w-full object-cover object-center"
            />
          )}
          
          {/* Featured badge */}
          {product.featured && (
            <div className="absolute top-2 left-2 z-10">
              <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
                Destacado
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="md:w-1/2 p-6 flex flex-col justify-center">
        <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
        {showCategory && product.category && (
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        )}
        <div className="mt-4">
          <span className="text-xl font-medium text-gray-900">{formatPrice(product.price)}</span>
        </div>
        
        {/* Add to cart button */}
        {showAddToCart && isActive && (
          <div className="mt-6">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              <ShoppingBagIcon className="mr-2 h-4 w-4" />
              Añadir al carrito
            </button>
          </div>
        )}
        
        {/* Product link */}
        <div className="mt-4">
          <Link 
            href={`/products/${product.id}`} 
            className="text-primary hover:text-primary/80"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
}