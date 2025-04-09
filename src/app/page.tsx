"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/site-layout";
import { formatPrice } from "@/lib/stores/config-store";
import { useConfigStore } from "@/lib/stores/config-store";

export default function Home() {
  const { currency, shippingFreeThreshold } = useConfigStore();

  return (
    <SiteLayout>
      {/* Hero Banner */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gray-900 opacity-50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8 flex items-center justify-center min-h-[70vh]">
          <div className="text-center w-full">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Diseños únicos que cuentan historias
            </h1>
            <p className="mt-6 text-xl text-white">
              Descubre nuestra colección de bolsos y accesorios exclusivos, hechos con pasión y dedicación.
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
              <Link
                href="/products"
                className="btn-primary px-8 py-3 text-lg"
              >
                Ver Productos
              </Link>
              <Link
                href="/products/customizable"
                className="btn-outline bg-transparent text-white border-white px-8 py-3 text-lg"
              >
                Personalizar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category Sections */}
      <section className="bg-white py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Explora Nuestras Categorías</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                href={category.href}
                className="group relative overflow-hidden rounded-lg shadow-md h-80 card-hover"
              >
                <div className="absolute inset-0 bg-gray-900 opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                    <span className="inline-block mt-2 text-sm bg-white bg-opacity-90 rounded px-3 py-1 text-gray-800 font-medium">
                      Ver Colección
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-4">Nuevos Lanzamientos</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Descubre nuestras últimas creaciones, diseñadas con los materiales más exclusivos y las tendencias más actuales.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm card-hover">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                  <div className="h-64 w-full bg-gray-200" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-lg font-medium text-gray-900">{formatPrice(product.numericPrice)}</p>
                    <button className="btn-primary py-1 px-3 text-sm">
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/products" className="btn-outline py-2 px-6">
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      {/* Customization Banner */}
      <section className="bg-primary py-16">
        <div className="container-custom">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-4">Personaliza tu Diseño</h2>
              <p className="text-primary-foreground mb-8 max-w-xl">
                Crea un producto único y a tu medida. Elige materiales, colores y añade detalles personalizados para conseguir exactamente lo que deseas.
              </p>
              <Link href="/products/customizable" className="bg-white text-primary font-medium rounded-md px-6 py-3 hover:bg-opacity-90 transition-colors">
                Comenzar Diseño
              </Link>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2">
              <div className="h-80 w-full bg-primary-foreground/10 rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Premium Collection */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Colección Premium</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {premiumProducts.map((product) => (
              <div key={product.id} className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-sm card-hover">
                <div className="md:w-1/2">
                  <div className="h-80 w-full bg-gray-200" />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  <p className="mt-2 text-gray-500">{product.description}</p>
                  <div className="mt-4">
                    <span className="text-xl font-medium text-gray-900">{formatPrice(product.numericPrice)}</span>
                  </div>
                  <div className="mt-6">
                    <button className="btn-primary w-full py-2">Ver Detalles</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Calidad y Artesanía en Cada Detalle</h2>
            <p className="text-lg text-gray-600 mb-12">
              Nos enorgullecemos de crear productos que no solo son hermosos, sino también duraderos y funcionales. Cada pieza está hecha con atención meticulosa a los detalles, utilizando materiales de la más alta calidad.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-xl font-bold">{value.icon}</span>
                </div>
                <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">★</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Clientes Satisfechos</h3>
              <p className="text-gray-600">Más de 10,000 clientes felices con nuestros productos</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">✓</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Garantía de Calidad</h3>
              <p className="text-gray-600">Todos nuestros productos tienen 2 años de garantía</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">🚚</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Envío Gratuito</h3>
              <p className="text-gray-600">En todos los pedidos superiores a {formatPrice(shippingFreeThreshold)}</p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

// Sample data with numeric prices for proper formatting
const categories = [
  { name: "Bolsos", href: "/products/bags" },
  { name: "Accesorios", href: "/products/accessories" },
  { name: "Decoración Hogar", href: "/products/home-decor" },
];

const newProducts = [
  { id: 1, name: "Bolso Tote Elegance", category: "Bolsos", numericPrice: 89.99 },
  { id: 2, name: "Cartera Minimalista", category: "Accesorios", numericPrice: 49.99 },
  { id: 3, name: "Bolso Crossbody Urban", category: "Bolsos", numericPrice: 69.99 },
  { id: 4, name: "Pañuelo de Seda Floral", category: "Accesorios", numericPrice: 39.99 },
];

const premiumProducts = [
  { 
    id: 1, 
    name: "Bolso Luxury Collection", 
    description: "Elaborado con cuero italiano de primera calidad y acabados metálicos de oro rosa. Un complemento elegante para cualquier ocasión especial.", 
    numericPrice: 199.99 
  },
  { 
    id: 2, 
    name: "Set Exclusivo Noche Perfecta", 
    description: "Un conjunto sofisticado que incluye bolso de mano, cartera a juego y pañuelo de seda con diseño exclusivo. La combinación ideal para eventos.", 
    numericPrice: 249.99 
  },
];

const values = [
  { 
    icon: "♻️", 
    title: "Materiales Sostenibles", 
    description: "Utilizamos materiales reciclados y de origen sostenible siempre que es posible." 
  },
  { 
    icon: "🧵", 
    title: "Artesanía Local", 
    description: "Cada pieza está confeccionada por artesanos locales con décadas de experiencia." 
  },
  { 
    icon: "🌱", 
    title: "Compromiso Verde", 
    description: "Por cada compra, plantamos un árbol para contribuir a un futuro más verde." 
  },
];