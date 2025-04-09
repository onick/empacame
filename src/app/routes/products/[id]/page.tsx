"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/site-layout";
import { ProductCard } from "@/components/product/product-card";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <SiteLayout>
      <div className="bg-white">
        <div className="container-custom py-12">
          {/* Breadcrumbs */}
          <nav className="flex text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-gray-900">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-gray-900">
              Productos
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/products/${product.category.toLowerCase()}`} className="hover:text-gray-900">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
            {/* Product images */}
            <div className="lg:col-span-1">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                <div className="h-96 w-full bg-gray-200" />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                    <div className="h-24 w-full bg-gray-100" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product details */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              {/* Badge for new or sale product */}
              {(product.isNew || product.isSale) && (
                <div className="mb-4 flex gap-2">
                  {product.isNew && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      Nuevo
                    </span>
                  )}
                  {product.isSale && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                      Oferta
                    </span>
                  )}
                </div>
              )}

              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

              {/* Reviews */}
              <div className="mt-3">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <span key={rating}>
                        {product.rating > rating ? (
                          <StarIcon className="h-5 w-5 flex-shrink-0 text-yellow-400" aria-hidden="true" />
                        ) : (
                          <StarOutlineIcon className="h-5 w-5 flex-shrink-0 text-yellow-400" aria-hidden="true" />
                        )}
                      </span>
                    ))}
                  </div>
                  <p className="ml-3 text-sm text-gray-500">
                    {product.reviewCount} reseñas
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-center">
                <p className="text-2xl font-bold text-gray-900">{product.price}</p>
                {product.originalPrice && (
                  <p className="ml-3 text-base text-gray-500 line-through">{product.originalPrice}</p>
                )}
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Descripción</h3>
                <div className="mt-2 space-y-4">
                  <p className="text-base text-gray-500">{product.description}</p>
                </div>
              </div>

              {/* Colors */}
              {product.colors.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <div className="mt-2 flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ${
                          selectedColor.name === color.name 
                            ? 'ring-2 ring-primary' 
                            : ''
                        }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        <span
                          className="h-8 w-8 rounded-full border border-black border-opacity-10"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-medium text-gray-900">Tamaño</h3>
                  <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {product.sizes.map((size) => (
                      <button
                        key={size.name}
                        className={`flex items-center justify-center rounded-md border py-2 px-3 text-sm font-medium focus:outline-none ${
                          selectedSize.name === size.name
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                        } ${
                          !size.inStock ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                        }`}
                        onClick={() => size.inStock && setSelectedSize(size)}
                        disabled={!size.inStock}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Add to cart */}
              <div className="mt-8 flex flex-col gap-6 sm:flex-row">
                <div>
                  <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                    Cantidad
                  </label>
                  <select
                    id="quantity"
                    name="quantity"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    value={quantity}
                    onChange={handleQuantityChange}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 flex space-x-4">
                  <button
                    type="button"
                    className="flex-1 btn-primary py-3 text-base"
                  >
                    Añadir al Carrito
                  </button>
                  <button
                    type="button"
                    className="flex-1 btn-secondary py-3 text-base"
                  >
                    Comprar Ahora
                  </button>
                </div>
              </div>

              {/* Shipping information */}
              <div className="mt-8 border-t border-gray-200 pt-8">
                <h3 className="text-sm font-medium text-gray-900">Envío y Devoluciones</h3>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-500">
                    Envío gratuito en pedidos superiores a 50€. Entrega estimada en 2-5 días laborables.
                  </p>
                  <p className="text-sm text-gray-500">
                    Devoluciones gratuitas dentro de los 30 días posteriores a la recepción de tu pedido.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related products */}
          <div className="mt-16 border-t border-gray-200 pt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">También te puede gustar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-16 border-t border-gray-200 pt-16">
            <h2 className="text-2xl font-bold text-gray-900">Reseñas de Clientes</h2>
            <div className="mt-8 lg:grid lg:grid-cols-3 lg:gap-x-12">
              <div className="lg:col-span-1">
                <div className="flex items-center">
                  <p className="text-5xl font-bold text-gray-900">{product.rating.toFixed(1)}</p>
                  <div className="ml-4">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <span key={rating}>
                          {product.rating > rating ? (
                            <StarIcon className="h-5 w-5 flex-shrink-0 text-yellow-400" aria-hidden="true" />
                          ) : (
                            <StarOutlineIcon className="h-5 w-5 flex-shrink-0 text-yellow-400" aria-hidden="true" />
                          )}
                        </span>
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Basado en {product.reviewCount} reseñas
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <button type="button" className="btn-outline w-full py-2">
                    Escribir una Reseña
                  </button>
                </div>
              </div>

              <div className="mt-12 lg:col-span-2 lg:mt-0">
                <div className="space-y-8">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-8">
                      <div className="flex items-center mb-2">
                        <p className="font-medium text-gray-900">{review.author}</p>
                        <time className="ml-4 text-sm text-gray-500" dateTime={review.date}>
                          {review.date}
                        </time>
                      </div>
                      <div className="flex items-center mb-2">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <span key={rating}>
                            {review.rating > rating ? (
                              <StarIcon className="h-4 w-4 flex-shrink-0 text-yellow-400" aria-hidden="true" />
                            ) : (
                              <StarOutlineIcon className="h-4 w-4 flex-shrink-0 text-yellow-400" aria-hidden="true" />
                            )}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-700">{review.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

// Sample product data
const product = {
  id: 1,
  name: "Bolso Tote Elegance",
  category: "Bolsos",
  price: "89,99 €",
  originalPrice: "119,99 €",
  description: "Un elegante bolso tote confeccionado en piel sintética de alta calidad. Espacioso y versátil, ideal para el día a día. Incluye correa larga ajustable para llevarlo al hombro o cruzado. Interior completamente forrado con bolsillos organizadores.",
  rating: 4.5,
  reviewCount: 117,
  isNew: false,
  isSale: true,
  colors: [
    { name: "Negro", hex: "#000000" },
    { name: "Marrón", hex: "#8B4513" },
    { name: "Azul marino", hex: "#000080" },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: false },
  ],
};

// Sample related products
const relatedProducts = [
  { id: 2, name: "Cartera Minimalista", category: "Accesorios", price: "49,99 €", isNew: true },
  { id: 3, name: "Bolso Crossbody Urban", category: "Bolsos", price: "69,99 €" },
  { id: 4, name: "Pañuelo de Seda Floral", category: "Accesorios", price: "39,99 €" },
  { id: 5, name: "Bolso Hobo Casual", category: "Bolsos", price: "79,99 €", originalPrice: "99,99 €", isSale: true },
];

// Sample reviews
const reviews = [
  {
    id: 1,
    author: "María G.",
    rating: 5,
    date: "12/03/2023",
    content: "Increíble calidad y muy práctico. Lo uso a diario y es perfecto tanto para el trabajo como para salir. Muy recomendable.",
  },
  {
    id: 2,
    author: "Carlos R.",
    rating: 4,
    date: "25/02/2023",
    content: "Lo compré como regalo para mi esposa y le encantó. Buena calidad aunque algo más pequeño de lo que esperaba.",
  },
  {
    id: 3,
    author: "Laura M.",
    rating: 5,
    date: "10/01/2023",
    content: "Espectacular. Ya es mi segundo bolso de esta marca y no me defraudan. Acabados perfectos y materiales de primera.",
  },
]; 