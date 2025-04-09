"use client";

import { useState } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Mock data
const customers = [
  { 
    id: 1,
    name: 'María López',
    email: 'maria@ejemplo.com',
    location: 'Madrid, España',
    orders: 5,
    totalSpent: 589.95,
    lastOrder: '2025-04-07',
    status: 'Activo',
    phone: '+34612345678'
  },
  { 
    id: 2,
    name: 'Juan Pérez',
    email: 'juan@ejemplo.com',
    location: 'Barcelona, España',
    orders: 3,
    totalSpent: 249.97,
    lastOrder: '2025-04-02',
    status: 'Activo',
    phone: '+34698765432'
  },
  { 
    id: 3,
    name: 'Laura Martínez',
    email: 'laura@ejemplo.com',
    location: 'Valencia, España',
    orders: 8,
    totalSpent: 1129.92,
    lastOrder: '2025-04-06',
    status: 'Activo',
    phone: '+34654321987'
  },
  { 
    id: 4,
    name: 'Carlos Sánchez',
    email: 'carlos@ejemplo.com',
    location: 'Sevilla, España',
    orders: 1,
    totalSpent: 59.99,
    lastOrder: '2025-03-20',
    status: 'Inactivo',
    phone: '+34632145698'
  },
  { 
    id: 5,
    name: 'Ana García',
    email: 'ana@ejemplo.com',
    location: 'Málaga, España',
    orders: 4,
    totalSpent: 429.96,
    lastOrder: '2025-04-03',
    status: 'Activo',
    phone: '+34698745632'
  },
  { 
    id: 6,
    name: 'Roberto Fernández',
    email: 'roberto@ejemplo.com',
    location: 'Bilbao, España',
    orders: 2,
    totalSpent: 139.98,
    lastOrder: '2025-03-15',
    status: 'Inactivo',
    phone: '+34654789321'
  },
  { 
    id: 7,
    name: 'Elena Rodríguez',
    email: 'elena@ejemplo.com',
    location: 'Zaragoza, España',
    orders: 6,
    totalSpent: 729.94,
    lastOrder: '2025-04-05',
    status: 'Activo',
    phone: '+34612378945'
  },
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter customers based on search term and status filter
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      customer.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handle status filter change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get badge class based on status
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'inactivo':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="mt-1 text-sm text-gray-500">Gestiona los clientes de tu tienda.</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 bg-white rounded-lg shadow px-5 py-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="Buscar clientes..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on new search
              }}
            />
          </div>
          <div className="flex-shrink-0">
            <select
              className="block w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={statusFilter}
              onChange={handleStatusChange}
            >
              <option value="all">Todos los estados</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Localización
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pedidos
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gasto Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Pedido
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                          <span>{getInitials(customer.name)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.orders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatPrice(customer.totalSpent)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(customer.lastOrder)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        href={`/dashboard/clientes/${customer.id}`} 
                        className="text-primary hover:text-primary/80"
                      >
                        Ver detalles
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No se encontraron clientes con los criterios de búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredCustomers.length > itemsPerPage && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredCustomers.length)}
                  </span>{' '}
                  de <span className="font-medium">{filteredCustomers.length}</span> clientes
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 
                      ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-50'}`}
                  >
                    <span className="sr-only">Anterior</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                        currentPage === index + 1
                          ? 'z-10 bg-primary text-white focus:z-20'
                          : 'text-gray-500 hover:bg-gray-50 focus:z-20'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 
                      ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-50'}`}
                  >
                    <span className="sr-only">Siguiente</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}