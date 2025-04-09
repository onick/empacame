"use client";

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartPieIcon,
  CogIcon,
  TagIcon,
  QueueListIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Productos', href: '/dashboard/products', icon: ShoppingBagIcon },
  { name: 'Categorías', href: '/dashboard/categorias', icon: TagIcon },
  { name: 'Pedidos', href: '/dashboard/pedidos', icon: QueueListIcon },
  { name: 'Clientes', href: '/dashboard/clientes', icon: UserGroupIcon },
  { name: 'Ventas', href: '/dashboard/ventas', icon: CurrencyDollarIcon },
  { name: 'Análisis', href: '/dashboard/analisis', icon: ChartPieIcon },
  { name: 'Configuración', href: '/dashboard/configuracion', icon: CogIcon },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75" 
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex max-w-xs w-full bg-white">
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <div className="flex items-center">
                <span className="font-bold text-lg">TIENDA Admin</span>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                onClick={() => setSidebarOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pt-5 pb-4">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md 
                      ${pathname === item.href 
                        ? 'bg-primary text-white' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                    `}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon 
                      className={`mr-3 flex-shrink-0 h-6 w-6 
                        ${pathname === item.href 
                          ? 'text-white' 
                          : 'text-gray-400 group-hover:text-gray-500'}
                      `}
                      aria-hidden="true" 
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
            <span className="font-bold text-lg">TIENDA Admin</span>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md 
                    ${pathname === item.href 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                >
                  <item.icon 
                    className={`mr-3 flex-shrink-0 h-6 w-6 
                      ${pathname === item.href 
                        ? 'text-white' 
                        : 'text-gray-400 group-hover:text-gray-500'}
                    `}
                    aria-hidden="true" 
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        <div className="sticky top-0 z-10 flex flex-shrink-0 h-16 bg-white shadow md:shadow-sm">
          <button
            type="button"
            className="md:hidden px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              {/* Breadcrumb or page title can go here */}
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Profile dropdown can go here */}
            </div>
          </div>
        </div>

        <main className="py-6 px-4 sm:px-6 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}