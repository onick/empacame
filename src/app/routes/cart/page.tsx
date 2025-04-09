"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/site-layout";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface CartItem {
  id: number;
  name: string;
  color: string;
  size?: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = subtotal * 0.21; // 21% IVA
  const total = subtotal + shipping + tax;

  return (
    <SiteLayout>
      <div className="bg-white">
        <div className="container-custom py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Tu Carrito</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Tu carrito está vacío</h2>
              <p className="text-gray-500 mb-8">Parece que aún no has añadido ningún producto a tu carrito.</p>
              <Link href="/products" className="btn-primary py-2 px-6">
                Continuar Comprando
              </Link>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
              <div className="lg:col-span-8">
                <div className="border-t border-b border-gray-200 py-6">
                  <h2 className="text-lg font-medium text-gray-900">Productos en tu carrito</h2>
                </div>

                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-6 flex">
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-center object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>

                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link href={`/products/${item.id}`}>{item.name}</Link>
                            </h3>
                            <p className="ml-4">{(item.price * item.quantity).toFixed(2)} €</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                          {item.size && <p className="mt-1 text-sm text-gray-500">Talla: {item.size}</p>}
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <div className="flex items-center border rounded-md">
                            <button
                              type="button"
                              className="p-2 text-gray-500 hover:text-gray-700"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            <span className="px-2 text-gray-900">{item.quantity}</span>
                            <button
                              type="button"
                              className="p-2 text-gray-500 hover:text-gray-700"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-primary hover:text-primary/80 flex items-center"
                              onClick={() => removeItem(item.id)}
                            >
                              <XMarkIcon className="h-5 w-5 mr-1" />
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-200 py-6">
                  <Link href="/products" className="text-primary hover:text-primary/80 font-medium">
                    ← Continuar Comprando
                  </Link>
                </div>
              </div>

              <div className="mt-12 lg:mt-0 lg:col-span-4">
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Resumen de Pedido</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="font-medium text-gray-900">{subtotal.toFixed(2)} €</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Envío</p>
                      <p className="font-medium text-gray-900">
                        {shipping === 0 ? "Gratis" : `${shipping.toFixed(2)} €`}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Impuestos (21%)</p>
                      <p className="font-medium text-gray-900">{tax.toFixed(2)} €</p>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                      <p className="text-lg font-medium text-gray-900">Total</p>
                      <p className="text-lg font-bold text-primary">{total.toFixed(2)} €</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full btn-primary py-3 text-base font-medium"
                    >
                      Proceder al Pago
                    </button>
                  </div>

                  <div className="mt-6">
                    <div className="bg-white p-4 rounded-md border border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Código de Descuento</h3>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm"
                          placeholder="Introduce tu código"
                        />
                        <button
                          type="button"
                          className="btn-outline py-2 px-4 text-sm font-medium"
                        >
                          Aplicar
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-sm text-gray-500">
                    <p>
                      Los gastos de envío son gratuitos en pedidos superiores a 50€. Para envíos internacionales, 
                      los gastos serán calculados durante el proceso de pago.
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Métodos de Pago Aceptados</h3>
                  <div className="flex space-x-3">
                    <div className="h-8 w-12 bg-gray-200 rounded" />
                    <div className="h-8 w-12 bg-gray-200 rounded" />
                    <div className="h-8 w-12 bg-gray-200 rounded" />
                    <div className="h-8 w-12 bg-gray-200 rounded" />
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    Todas las transacciones son seguras y están encriptadas.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}

// Sample cart data
const initialCart: CartItem[] = [
  {
    id: 1,
    name: "Bolso Tote Elegance",
    color: "Negro",
    size: "M",
    price: 89.99,
    quantity: 1,
  },
  {
    id: 2,
    name: "Cartera Minimalista",
    color: "Marrón",
    price: 49.99,
    quantity: 1,
  },
]; 