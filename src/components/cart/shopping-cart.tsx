"use client";

import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ShoppingBagIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/lib/stores/cart-store';

export function ShoppingCart() {
  const { items, subtotal, isOpen, toggleCart, removeItem, updateQuantity, clearCart } = useCartStore();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={toggleCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Carrito de compra</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={toggleCart}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Cerrar panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        {items.length > 0 ? (
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {items.map((item) => (
                                <li key={item.productId} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    {item.image ? (
                                      <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={96}
                                        height={96}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    ) : (
                                      <div className="h-full w-full bg-gray-200" />
                                    )}
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link href={`/products/${item.productId}`} onClick={toggleCart}>
                                            {item.name}
                                          </Link>
                                        </h3>
                                        <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">{item.sku}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center space-x-2">
                                        <button
                                          type="button"
                                          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                        >
                                          <MinusIcon className="h-4 w-4" aria-hidden="true" />
                                        </button>
                                        <span className="text-gray-500">Cant: {item.quantity}</span>
                                        <button
                                          type="button"
                                          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                        >
                                          <PlusIcon className="h-4 w-4" aria-hidden="true" />
                                        </button>
                                      </div>

                                      <button
                                        type="button"
                                        className="font-medium text-primary hover:text-primary/80"
                                        onClick={() => removeItem(item.productId)}
                                      >
                                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-10">
                            <ShoppingBagIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">Tu carrito está vacío</h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Comienza a añadir productos a tu carrito.
                            </p>
                            <div className="mt-6">
                              <Link
                                href="/products"
                                className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                onClick={toggleCart}
                              >
                                Ver productos
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {items.length > 0 && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>{formatPrice(subtotal)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Envío e impuestos calculados al finalizar la compra.</p>
                        <div className="mt-6">
                          <Link
                            href="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/90"
                            onClick={toggleCart}
                          >
                            Finalizar compra
                          </Link>
                        </div>
                        <div className="mt-3 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            <button
                              type="button"
                              className="font-medium text-primary hover:text-primary/80"
                              onClick={toggleCart}
                            >
                              Seguir comprando
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                        <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
                          <button
                            type="button"
                            className="font-medium text-red-600 hover:text-red-500"
                            onClick={clearCart}
                          >
                            Vaciar carrito
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}