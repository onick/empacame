"use client";

import { useState } from 'react';
import Link from 'next/link';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Mock data
const categories = [
  { 
    id: 1, 
    name: 'Bolsos', 
    products: 15, 
    featured: true,
    slug: 'bolsos',
    parentId: null
  },
  { 
    id: 2, 
    name: 'Accesorios', 
    products: 22, 
    featured: false,
    slug: 'accesorios',
    parentId: null
  },
  { 
    id: 3, 
    name: 'Bolsos Crossbody', 
    products: 8, 
    featured: false,
    slug: 'bolsos-crossbody',
    parentId: 1
  },
  { 
    id: 4, 
    name: 'Bolsos Tote', 
    products: 5, 
    featured: true,
    slug: 'bolsos-tote',
    parentId: 1
  },
  { 
    id: 5, 
    name: 'Decoración Hogar', 
    products: 12, 
    featured: false,
    slug: 'decoracion-hogar',
    parentId: null
  },
  { 
    id: 6, 
    name: 'Sets', 
    products: 3, 
    featured: true,
    slug: 'sets',
    parentId: null
  },
];

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Filter categories based on search term
  const filteredCategories = categories.filter(category => {
    return (
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getParentCategoryName = (parentId: number | null) => {
    if (parentId === null) return '-';
    const parent = categories.find(cat => cat.id === parentId);
    return parent ? parent.name : '-';
  };

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categorías</h1>
          <p className="mt-1 text-sm text-gray-500">Gestiona las categorías de productos.</p>
        </div>
        <Link 
          href="/dashboard/categorias/new" 
          className="mt-4 md:mt-0 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Añadir Categoría
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6 bg-white rounded-lg shadow px-5 py-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="Buscar categorías..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on new search
              }}
            />
          </div>
        </div>
      </div>

      {/* Categories table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Productos
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría Padre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destacada
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.products}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getParentCategoryName(category.parentId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        category.featured
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {category.featured ? 'Destacada' : 'No destacada'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          href={`/dashboard/categorias/edit/${category.id}`} 
                          className="text-primary hover:text-primary/80" 
                          title="Editar"
                        >
                          <PencilIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                        <button 
                          className="text-red-600 hover:text-red-900" 
                          title="Eliminar"
                          onClick={() => {
                            if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
                              // Aquí iría la lógica para eliminar la categoría
                              console.log(`Eliminar categoría ${category.id}`);
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
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No se encontraron categorías con los criterios de búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredCategories.length > itemsPerPage && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredCategories.length)}
                  </span>{' '}
                  de <span className="font-medium">{filteredCategories.length}</span> categorías
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