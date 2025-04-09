"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon, ShoppingBagIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";

const navigation = {
  categories: [
    {
      id: "destacados",
      name: "DESTACADOS",
      featured: [
        { name: "Lo más vendido", href: "/products/best-sellers" },
        { name: "Nuevos lanzamientos", href: "/products/new-arrivals" },
        { name: "Ofertas", href: "/products/sales" },
        { name: "Ver todo en DESTACADOS", href: "/products/featured" },
      ],
    },
    {
      id: "personalizacion",
      name: "PERSONALIZACIÓN",
      featured: [
        { name: "Productos personalizables", href: "/products/customizable" },
        { name: "Opciones de materiales", href: "/products/materials" },
        { name: "Diseños personalizados", href: "/products/custom-designs" },
      ],
    },
    {
      id: "categorias",
      name: "CATEGORÍAS",
      featured: [
        { name: "Suéteres/Prendas", href: "/products/clothing" },
        { name: "Bolsas/Accesorios", href: "/products/bags" },
        { name: "Decoración hogar", href: "/products/home-decor" },
        { name: "Artículos especiales", href: "/products/special-items" },
      ],
    },
    {
      id: "rubros",
      name: "COLECCIONES",
      featured: [
        { name: "Moda", href: "/products/fashion" },
        { name: "Accesorios", href: "/products/accessories" },
        { name: "Hogar", href: "/products/home" },
        { name: "Regalos", href: "/products/gifts" },
        { name: "Temporadas", href: "/products/seasonal" },
        { name: "Eventos", href: "/products/events" },
      ],
    },
  ],
  pages: [
    { name: "Inicio", href: "/" },
    { name: "Sobre Nosotros", href: "/about" },
    { name: "Contacto", href: "/contact" },
  ],
};

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <div className={`relative z-40 lg:hidden ${open ? "" : "hidden"}`}>
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setOpen(false)} />
        <div className="fixed inset-y-0 left-0 z-40 w-full max-w-xs overflow-y-auto bg-white shadow-xl">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <Link href="/" className="text-xl font-bold">
                TIENDA
              </Link>
            </div>
            <button
              type="button"
              className="-m-2 p-2 rounded-md text-gray-400"
              onClick={() => setOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-2 px-4 py-6">
            {navigation.categories.map((category) => (
              <div key={category.id} className="mb-8">
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {category.featured.map((item) => (
                    <li key={item.name} className="group">
                      <Link
                        href={item.href}
                        className="block text-gray-700 hover:text-primary"
                        onClick={() => setOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="space-y-3 mt-8 border-t border-gray-200 pt-6">
              {navigation.pages.map((page) => (
                <div key={page.name}>
                  <Link
                    href={page.href}
                    className="block text-gray-700 hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <header className="relative">
        <nav aria-label="Top">
          <div className="bg-white shadow-sm">
            <div className="container-custom">
              <div className="flex h-16 items-center justify-between">
                {/* Mobile menu button */}
                <button
                  type="button"
                  className="rounded-md p-2 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="flex flex-1 items-center">
                  <Link href="/" className="text-xl font-bold lg:ml-0">
                    TIENDA
                  </Link>
                </div>

                {/* Navigation - Desktop */}
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:space-x-8">
                  {navigation.categories.map((category) => (
                    <div key={category.name} className="group relative">
                      <button className="flex items-center text-sm font-medium hover:text-primary">
                        {category.name}
                      </button>
                      <div className="absolute top-full left-0 z-10 mt-2 w-60 hidden group-hover:block">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative bg-white p-6">
                            <ul role="list" className="space-y-4">
                              {category.featured.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    className="block text-sm text-gray-700 hover:text-primary"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Search, Account, Cart */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="p-2 hover:text-primary"
                  >
                    <MagnifyingGlassIcon className="h-6 w-6" />
                  </button>
                  <Link href="/account" className="p-2 hover:text-primary">
                    <UserIcon className="h-6 w-6" />
                  </Link>
                  <Link href="/cart" className="group p-2 hover:text-primary">
                    <div className="relative">
                      <ShoppingBagIcon className="h-6 w-6" />
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-xs text-white">
                        0
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Search panel */}
        {searchOpen && (
          <div className="absolute inset-x-0 top-full z-20">
            <div className="bg-white shadow-md p-4">
              <div className="container-custom">
                <div className="relative">
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Buscar productos..."
                      className="w-full border-0 bg-gray-100 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-400" />
                    <button
                      onClick={() => setSearchOpen(false)}
                      className="absolute right-3 p-1 hover:text-primary"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
} 