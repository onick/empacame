"use client";

import { Fragment } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export function UserMenu() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === 'admin';
  
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };
  
  return (
    <div className="ml-4 flow-root">
      {status === 'authenticated' ? (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex items-center justify-center w-full text-sm font-medium text-gray-700 hover:text-gray-900">
              <span className="sr-only">Abrir menú de usuario</span>
              <span className="inline-flex items-center">
                <span className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                  {session.user.name?.[0].toUpperCase() || <UserIcon className="h-5 w-5" />}
                </span>
                <span className="ml-2 hidden md:block">
                  {session.user.name || session.user.email}
                </span>
                <ChevronDownIcon className="ml-1 h-5 w-5" aria-hidden="true" />
              </span>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm">Conectado como</p>
                  <p className="text-sm font-medium truncate">{session.user.email}</p>
                </div>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/mi-cuenta"
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } block px-4 py-2 text-sm`}
                    >
                      Mi cuenta
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/mi-cuenta/pedidos"
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } block px-4 py-2 text-sm`}
                    >
                      Mis pedidos
                    </Link>
                  )}
                </Menu.Item>
                {isAdmin && (
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/dashboard"
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } block px-4 py-2 text-sm font-medium text-primary`}
                      >
                        Panel de administración
                      </Link>
                    )}
                  </Menu.Item>
                )}
                <div className="border-t border-gray-100">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        Cerrar sesión
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <Link
          href="/auth/login"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
        >
          Iniciar sesión
        </Link>
      )}
    </div>
  );
}