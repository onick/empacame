"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  MapPinIcon, 
  ShoppingBagIcon,
  TagIcon,
  CreditCardIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function CustomerDetail() {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Simular carga de datos
  useEffect(() => {
    // Aquí normalmente harías una llamada a la API
    const fetchCustomer = async () => {
      try {
        // Simulación de datos de cliente
        const mockCustomer = {
          id: params.id,
          name: 'Ana García',
          email: 'ana.garcia@example.com',
          phone: '+34 612 345 678',
          location: 'Madrid, España',
          address: {
            street: 'Calle Principal 123',
            city: 'Madrid',
            postalCode: '28001',
            country: 'España',
          },
          joinDate: '15 Ene 2023',
          orders: 5,
          totalSpent: '€540.00',
          lastOrder: '22 Mar 2023',
          status: 'Activo',
          notes: 'Cliente frecuente. Prefiere recibir notificaciones por correo electrónico.',
          recentOrders: [
            {
              id: '8743',
              date: '22 Mar 2023',
              status: 'Completado',
              total: '€102.00',
              items: 3,
            },
            {
              id: '8701',
              date: '15 Mar 2023',
              status: 'Completado',
              total: '€156.00',
              items: 2,
            },
            {
              id: '8688',
              date: '05 Mar 2023',
              status: 'Completado',
              total: '€89.00',
              items: 1,
            },
            {
              id: '8623',
              date: '20 Feb 2023',
              status: 'Completado',
              total: '€118.00',
              items: 2,
            },
            {
              id: '8560',
              date: '02 Feb 2023',
              status: 'Completado',
              total: '€75.00',
              items: 1,
            },
          ],
        };

        // Simular retraso de red
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setCustomer(mockCustomer);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer:', error);
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [params.id]);

  // Obtener clases para la insignia de estado
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completado':
        return 'bg-green-100 text-green-800';
      case 'procesando':
        return 'bg-blue-100 text-blue-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'enviado':
        return 'bg-purple-100 text-purple-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'inactivo':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Cliente no encontrado</h2>
        <p className="mt-2 text-gray-500">No se ha podido encontrar el cliente solicitado.</p>
        <Link
          href="/dashboard/customers"
          className="mt-6 inline-flex items-center text-primary hover:text-primary-dark"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" /> Volver a clientes
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/dashboard/customers"
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Perfil de Cliente
          </h1>
        </div>
        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusBadgeClass(customer.status)}`}>
          {customer.status}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Información principal del cliente */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-medium text-primary">
                    {customer.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">{customer.name}</h2>
                  <p className="text-sm text-gray-500">Cliente desde {customer.joinDate}</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-5">
              <h3 className="text-base font-medium text-gray-900">Información de contacto</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <a href={`mailto:${customer.email}`} className="text-sm text-primary hover:text-primary-dark">
                    {customer.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <a href={`tel:${customer.phone}`} className="text-sm text-gray-500">
                    {customer.phone}
                  </a>
                </div>
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">{customer.address.street}</p>
                    <p className="text-sm text-gray-500">{customer.address.city}, {customer.address.postalCode}</p>
                    <p className="text-sm text-gray-500">{customer.address.country}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-5 border-t border-gray-200">
              <h3 className="text-base font-medium text-gray-900">Estadísticas</h3>
              <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <ShoppingBagIcon className="h-5 w-5 text-gray-400 mr-1" />
                    Pedidos
                  </dt>
                  <dd className="mt-1 text-lg font-medium text-gray-900">{customer.orders}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <CreditCardIcon className="h-5 w-5 text-gray-400 mr-1" />
                    Gasto total
                  </dt>
                  <dd className="mt-1 text-lg font-medium text-gray-900">{customer.totalSpent}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <ClockIcon className="h-5 w-5 text-gray-400 mr-1" />
                    Último pedido
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{customer.lastOrder}</dd>
                </div>
              </dl>
            </div>
            {customer.notes && (
              <div className="px-6 py-5 border-t border-gray-200">
                <h3 className="text-base font-medium text-gray-900">Notas</h3>
                <p className="mt-2 text-sm text-gray-500">{customer.notes}</p>
              </div>
            )}
            <div className="px-6 py-5 border-t border-gray-200 flex space-x-3">
              <button 
                className="flex-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md text-sm font-medium"
                onClick={() => window.open(`mailto:${customer.email}`)}
              >
                Enviar correo
              </button>
              <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2 px-4 rounded-md text-sm font-medium">
                Editar
              </button>
            </div>
          </div>
        </div>

        {/* Pedidos recientes */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Pedidos recientes</h2>
                <Link 
                  href={`/dashboard/orders?customer=${customer.id}`}
                  className="text-sm font-medium text-primary hover:text-primary-dark"
                >
                  Ver todos
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pedido
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Productos
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customer.recentOrders.map((order: any) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.items} artículos
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/dashboard/orders/${order.id}`}
                          className="text-primary hover:text-primary-dark"
                        >
                          Ver
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-5 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <ShoppingBagIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">Total de {customer.orders} pedidos</span>
                </div>
                <button className="text-sm font-medium text-primary hover:text-primary-dark">
                  Crear nuevo pedido
                </button>
              </div>
            </div>
          </div>

          {/* Acciones adicionales */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-base font-medium text-gray-900">Enviar comunicación</h3>
              <p className="mt-1 text-sm text-gray-500">Envía un correo electrónico o mensaje personalizado a este cliente.</p>
              <div className="mt-4 space-y-2">
                <button className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90">
                  <EnvelopeIcon className="h-5 w-5 mr-2" />
                  Enviar correo
                </button>
              </div>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-base font-medium text-gray-900">Acciones rápidas</h3>
              <p className="mt-1 text-sm text-gray-500">Acciones comunes para gestionar a este cliente.</p>
              <div className="mt-4 space-y-2">
                <button className="w-full text-left flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                  <TagIcon className="h-5 w-5 text-gray-400 mr-2" />
                  Asignar etiquetas
                </button>
                <button className="w-full text-left flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                  <ShoppingBagIcon className="h-5 w-5 text-gray-400 mr-2" />
                  Ver productos comprados
                </button>
                <button className="w-full text-left flex items-center py-2 px-4 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md">
                  Cambiar estado
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
