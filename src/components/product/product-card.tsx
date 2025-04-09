"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBagIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Product } from '@/types/product';
import { useCartStore } from '@/lib/stores/cart-store';
import { useWishlistStore } from '@/lib/stores/wishlist-store';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

export function ProductCard({ product, showAddToCart = true }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      sku: product.sku
    });
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <div 
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge if product is featured */}
      {product.featured && (
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
            Destacado
          </span>
        </div>
      )}
      
      {/* Stock status badge */}
      {product.status !== 'Activo' && (
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

      {/* Wishlist button */}
      <button 
        onClick={handleWishlistToggle}
        className="absolute top-2 right-2 z-20 p-1 rounded-full bg-white bg-opacity-70 shadow-sm transition-all duration-300 hover:bg-opacity-100"
        aria-label={inWishlist ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        {inWishlist ? (
          <HeartIconSolid className="h-5 w-5 text-red-500" />
        ) : (
          <HeartIcon className="h-5 w-5 text-gray-500 hover:text-red-500" />
        )}
      </button>
      
      {/* Product image */}
      <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-gray-100" />
        {product.images?.length > 0 && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        )}
        
        {/* Second image on hover if available */}
        {product.images?.length > 1 && (
          <Image
            src={product.images[1]}
            alt={`${product.name} - Imagen alternativa`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover object-center transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </Link>
      
      {/* Product info */}
      <div className="p-4">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-gray-500">{product.sku}</p>
          <p className="mt-2 text-lg font-semibold text-gray-900">
            {formatPrice(product.price)}
          </p>
        </Link>
        
        {/* Add to cart button */}
        {showAddToCart && product.status === 'Activo' && (
          <button
            onClick={handleAddToCart}
            className="mt-3 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            <ShoppingBagIcon className="mr-2 h-4 w-4" />
            Añadir al carrito
          </button>
        )}
        
        {/* Out of stock button */}
        {showAddToCart && product.status !== 'Activo' && (
          <button
            disabled
            className="mt-3 w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed"
          >
            No disponible
          </button>
        )}
      </div>
    </div>
  );
}