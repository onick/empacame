"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/site-layout";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <SiteLayout>
      <div className="bg-white">
        <div className="container-custom py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Cuenta</h1>

          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <nav className="flex flex-col space-y-1">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`px-4 py-3 text-left rounded-md font-medium ${
                    activeTab === "profile" 
                      ? "bg-primary text-primary-foreground" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Información Personal
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`px-4 py-3 text-left rounded-md font-medium ${
                    activeTab === "orders" 
                      ? "bg-primary text-primary-foreground" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Mis Pedidos
                </button>
                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`px-4 py-3 text-left rounded-md font-medium ${
                    activeTab === "addresses" 
                      ? "bg-primary text-primary-foreground" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Direcciones
                </button>
                <button
                  onClick={() => setActiveTab("favorites")}
                  className={`px-4 py-3 text-left rounded-md font-medium ${
                    activeTab === "favorites" 
                      ? "bg-primary text-primary-foreground" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Favoritos
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`px-4 py-3 text-left rounded-md font-medium ${
                    activeTab === "settings" 
                      ? "bg-primary text-primary-foreground" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Ajustes
                </button>
              </nav>
              <div className="mt-8">
                <button className="text-primary hover:text-primary/80 font-medium">
                  Cerrar Sesión
                </button>
              </div>
            </div>

            {/* Main content */}
            <div className="mt-10 lg:mt-0 lg:col-span-9">
              {activeTab === "profile" && <ProfileTab />}
              {activeTab === "orders" && <OrdersTab />}
              {activeTab === "addresses" && <AddressesTab />}
              {activeTab === "favorites" && <FavoritesTab />}
              {activeTab === "settings" && <SettingsTab />}
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function ProfileTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Información Personal</h2>
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Datos de Perfil</h3>
        </div>
        <div className="px-6 py-5">
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    defaultValue="María"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Apellidos
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    defaultValue="García Rodríguez"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    defaultValue="maria.garcia@ejemplo.com"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    defaultValue="612345678"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="birth-date" className="block text-sm font-medium text-gray-700">
                  Fecha de Nacimiento
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="birth-date"
                    id="birth-date"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    defaultValue="1990-05-15"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="btn-primary py-2 px-4"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-8 bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Cambiar Contraseña</h3>
        </div>
        <div className="px-6 py-5">
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                  Contraseña Actual
                </label>
                <div className="mt-1">
                  <input
                    id="current-password"
                    name="current-password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                  Nueva Contraseña
                </label>
                <div className="mt-1">
                  <input
                    id="new-password"
                    name="new-password"
                    type="password"
                    autoComplete="new-password"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirmar Nueva Contraseña
                </label>
                <div className="mt-1">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="btn-primary py-2 px-4"
              >
                Actualizar Contraseña
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function OrdersTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Mis Pedidos</h2>
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Pedido
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          order.status === "Entregado"
                            ? "bg-green-100 text-green-800"
                            : order.status === "En camino"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Procesando"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      `}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.total} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link href={`/orders/${order.id}`} className="text-primary hover:text-primary/80 font-medium">
                      Ver detalles
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AddressesTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Mis Direcciones</h2>
        <button
          type="button"
          className="btn-primary py-2 px-4"
        >
          Añadir Nueva Dirección
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                {address.name}
                {address.isDefault && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                    Predeterminada
                  </span>
                )}
              </h3>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 font-medium"
                >
                  Eliminar
                </button>
              </div>
            </div>
            <div className="px-6 py-5 text-gray-700 space-y-2">
              <p>{address.street}</p>
              <p>{address.city}, {address.postalCode}</p>
              <p>{address.state}</p>
              <p>{address.country}</p>
              <p className="text-gray-500">Teléfono: {address.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FavoritesTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Mis Favoritos</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden"
          >
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
              <div className="h-64 w-full bg-gray-200" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-500 mb-2">{product.category}</p>
              <p className="text-lg font-medium text-gray-900 mb-4">{product.price} €</p>
              <div className="flex space-x-3">
                <button
                  type="button"
                  className="flex-1 btn-primary py-2 text-sm"
                >
                  Añadir al Carrito
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ajustes</h2>
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Preferencias de Comunicación</h3>
        </div>
        <div className="px-6 py-5">
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="comments"
                    name="comments"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    defaultChecked
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="comments" className="font-medium text-gray-700">Boletín de noticias</label>
                  <p className="text-gray-500">Recibe nuestro boletín con novedades, tendencias y ofertas exclusivas.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="offers"
                    name="offers"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    defaultChecked
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="offers" className="font-medium text-gray-700">Ofertas y Promociones</label>
                  <p className="text-gray-500">Recibe notificaciones sobre descuentos y promociones especiales.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="order-updates"
                    name="order-updates"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    defaultChecked
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="order-updates" className="font-medium text-gray-700">Actualizaciones de Pedidos</label>
                  <p className="text-gray-500">Recibe notificaciones sobre el estado de tus pedidos.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="btn-primary py-2 px-4"
              >
                Guardar Preferencias
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-8 bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-red-600">Eliminar Cuenta</h3>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-gray-500 mb-4">
            Una vez que elimines tu cuenta, todos tus datos personales y el historial de pedidos serán eliminados permanentemente. Esta acción no se puede deshacer.
          </p>
          <button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-md px-4 py-2 transition-colors"
          >
            Eliminar mi cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

// Sample data
const orders = [
  { id: "ORD12345", date: "15/03/2023", status: "Entregado", total: "139.98" },
  { id: "ORD12346", date: "22/02/2023", status: "En camino", total: "89.99" },
  { id: "ORD12347", date: "10/01/2023", status: "Procesando", total: "75.50" },
  { id: "ORD12348", date: "05/12/2022", status: "Entregado", total: "219.97" },
];

const addresses = [
  {
    id: 1,
    name: "Casa",
    street: "Calle Mayor 25, 3ºB",
    city: "Madrid",
    postalCode: "28001",
    state: "Madrid",
    country: "España",
    phone: "612345678",
    isDefault: true,
  },
  {
    id: 2,
    name: "Trabajo",
    street: "Avenida de la Innovación 42",
    city: "Madrid",
    postalCode: "28003",
    state: "Madrid",
    country: "España",
    phone: "687654321",
    isDefault: false,
  },
];

const favorites = [
  { id: 1, name: "Bolso Tote Elegance", category: "Bolsos", price: "89.99" },
  { id: 2, name: "Cartera Minimalista", category: "Accesorios", price: "49.99" },
  { id: 3, name: "Pañuelo de Seda Floral", category: "Accesorios", price: "39.99" },
]; 