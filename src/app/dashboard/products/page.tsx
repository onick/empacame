"use client";

import { useState } from 'react';
import Link from 'next/link';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Mock data
const products = [
  { 
    id: 1, 
    name: 'Bolso Tote Elegance', 
    category: 'Bolsos', 
    price: '89,99 €', 
    stock: 24, 
    status: 'Activo',
    sku: 'BTE-001',
    image: null 
  },
  { 
    id: 2, 
    name: 'Cartera Minimalista', 
    category: 'Accesorios', 
    price: '49,99 €', 
    stock: 45, 
    status: 'Activo',
    sku: 'CM-002',
    image: null 
  },
  { 
    id: 3, 
    name: 'Bolso Crossbody Urban', 
    category: 'Bolsos', 
    price: '69,99 €', 
    stock: 18, 
    status: 'Activo',
    sku: 'BCU-003',
    image: null 
  },
  { 
    id: 4, 
    name: 'Pañuelo de Seda Floral', 
    category: 'Accesorios', 
    price: '39,99 €', 
    stock: 32, 
    status: 'Activo',
    sku: 'PSF-004',
    image: null 
  },
  { 
    id: 5, 
    name: 'Bolso Luxury Collection', 
    category: 'Bolsos', 
    price: '199,99 €', 
    stock: 8, 
    status: 'Activo',
    sku: 'BLC-005',
    image: null 
  },
  { 
    id: 6, 
    name: 'Set Exclusivo Noche Perfecta', 
    category: 'Sets', 
    price: '249,99 €', 
    stock: 5, 
    status: 'Activo',
    sku: 'SENP-006',
    image: null 
  },
  { 
    id: 7, 
    name: 'Monedero Vintage', 
    category: 'Accesorios', 
    price: '29,99 €', 
    stock: 0, 
    status: 'Agotado',
    sku: 'MV-007',
    image: null 
  },
  { 
    id: 8, 
    name: 'Bolso Shopper Canvas', 
    category: 'Bolsos', 
    price: '59,99 €', 
    stock: 0, 
    status: 'Descontinuado',
    sku: 'BSC-008',
    image: null 
  },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter products based on search term and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || 
      product.category.toLowerCase() === categoryFilter.toLowerCase();
    
    const matchesStatus = statusFilter === 'all' || 
      product.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handle category filter change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Handle status filter change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
          <p className="mt-1 text-sm text-gray-500">Gestiona tu catálogo de productos.</p>
        </div>
        <Link 
          href="/dashboard/products/new" 
          className="mt-4 md:mt-0 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Añadir Producto
        </Link>
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
              placeholder="Buscar productos..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on new search
              }}
            />
          </div>
          <div className="flex-shrink-0 flex space-x-2">
            <select
              className="block w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={categoryFilter}
              onChange={handleCategoryChange}
            >
              <option value="all">Todas las categorías</option>
              <option value="bolsos">Bolsos</option>
              <option value="accesorios">Accesorios</option>
              <option value="sets">Sets</option>
            </select>
            <select
              className="block w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={statusFilter}
              onChange={handleStatusChange}
            >
              <option value="all">Todos los estados</option>
              <option value="activo">Activo</option>
              <option value="agotado">Agotado</option>
              <option value="descontinuado">Descontinuado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
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
                currentItems.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded"></div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === 'Activo'
                          ? 'bg-green-100 text-green-800'
                          : product.status === 'Agotado'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          href={`/dashboard/products/edit/${product.id}`} 
                          className="text-primary hover:text-primary/80" 
                          title="Editar"
                        >
                          <PencilIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                        <button 
                          className="text-red-600 hover:text-red-900" 
                          title="Eliminar"
                          onClick={() => {
                            if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
                              // Aquí iría la lógica para eliminar el producto
                              console.log(`Eliminar producto ${product.id}`);
                            }
                          }}
                        >
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No se encontraron productos con los criterios de búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredProducts.length > itemsPerPage && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredProducts.length)}
                  </span>{' '}
                  de <span className="font-medium">{filteredProducts.length}</span> productos
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
