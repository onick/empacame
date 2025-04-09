"use client";

import { useState } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, EyeIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

// Datos de ejemplo para clientes
const customers = [
  {
    id: 1,
    name: 'Ana García',
    email: 'ana.garcia@example.com',
    phone: '+34 612 345 678',
    location: 'Madrid, España',
    orders: 5,
    totalSpent: '€540.00',
    lastOrder: '22 Mar 2023',
    status: 'Activo',
  },
  {
    id: 2,
    name: 'Carlos Pérez',
    email: 'carlos.perez@example.com',
    phone: '+34 623 456 789',
    location: 'Barcelona, España',
    orders: 3,
    totalSpent: '€320.00',
    lastOrder: '18 Mar 2023',
    status: 'Activo',
  },
  {
    id: 3,
    name: 'María López',
    email: 'maria.lopez@example.com',
    phone: '+34 634 567 890',
    location: 'Valencia, España',
    orders: 8,
    totalSpent: '€890.00',
    lastOrder: '15 Mar 2023',
    status: 'Activo',
  },
  {
    id: 4,
    name: 'Juan Martínez',
    email: 'juan.martinez@example.com',
    phone: '+34 645 678 901',
    location: 'Sevilla, España',
    orders: 2,
    totalSpent: '€160.00',
    lastOrder: '10 Mar 2023',
    status: 'Activo',
  },
  {
    id: 5,
    name: 'Laura Sánchez',
    email: 'laura.sanchez@example.com',
    phone: '+34 656 789 012',
    location: 'Bilbao, España',
    orders: 6,
    totalSpent: '€720.00',
    lastOrder: '08 Mar 2023',
    status: 'Activo',
  },
  {
    id: 6,
    name: 'Pedro Rojas',
    email: 'pedro.rojas@example.com',
    phone: '+34 667 890 123',
    location: 'Zaragoza, España',
    orders: 0,
    totalSpent: '€0.00',
    lastOrder: 'N/A',
    status: 'Inactivo',
  },
  {
    id: 7,
    name: 'Sofía Torres',
    email: 'sofia.torres@example.com',
    phone: '+34 678 901 234',
    location: 'Málaga, España',
    orders: 4,
    totalSpent: '€430.00',
    lastOrder: '05 Mar 2023',
    status: 'Activo',
  },
  {
    id: 8,
    name: 'Miguel Flores',
    email: 'miguel.flores@example.com',
    phone: '+34 689 012 345',
    location: 'Alicante, España',
    orders: 1,
    totalSpent: '€95.00',
    lastOrder: '01 Mar 2023',
    status: 'Activo',
  },
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState('all');

  // Filtrar clientes por término de búsqueda y estado
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      customer.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  // Manejar cambio de página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        <p className="mt-1 text-sm text-gray-500">Gestiona la información de tus clientes.</p>
      </div>

      {/* Filtros y búsqueda */}
      <div className="mb-6 bg-white rounded-lg shadow px-5 py-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="Buscar cliente..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Resetear a primera página en nueva búsqueda
              }}
            />
          </div>
          <div className="flex-shrink-0">
            <select
              className="block w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1); // Resetear a primera página en cambio de filtro
              }}
            >
              <option value="all">Todos los estados</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de clientes */}
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
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-500">
                            {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.email}</div>
                          <div className="text-sm text-gray-500">{customer.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.orders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.totalSpent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.lastOrder}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        customer.status === 'Activo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          href={`/dashboard/customers/${customer.id}`} 
                          className="text-primary hover:text-primary/80" 
                          title="Ver detalles"
                        >
                          <EyeIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                        <button 
                          className="text-primary hover:text-primary/80" 
                          title="Enviar email"
                          onClick={() => window.open(`mailto:${customer.email}`)}
                        >
                          <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
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

        {/* Paginación */}
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
