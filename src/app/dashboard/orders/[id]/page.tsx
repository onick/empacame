"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, TruckIcon, CreditCardIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function OrderDetail() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Simular carga de datos
  useEffect(() => {
    // Aquí normalmente harías una llamada a la API
    const fetchOrder = async () => {
      try {
        // Simulación de datos de pedido
        const mockOrder = {
          id: params.id,
          customer: {
            name: 'Ana García',
            email: 'ana.garcia@example.com',
            phone: '+34 612 345 678',
          },
          shipping: {
            address: 'Calle Principal 123',
            city: 'Madrid',
            postalCode: '28001',
            country: 'España',
          },
          items: [
            {
              id: 1,
              name: 'Bolso Tote Elegance',
              price: '€89.99',
              quantity: 1,
              total: '€89.99',
              sku: 'BTE-001',
            },
            {
              id: 2,
              name: 'Pañuelo de Seda Floral',
              price: '€39.99',
              quantity: 1,
              total: '€39.99',
              sku: 'PSF-004',
            },
          ],
          date: '22 Mar 2023',
          status: 'Completado',
          paymentStatus: 'Pagado',
          paymentMethod: 'Tarjeta de crédito',
          subtotal: '€129.98',
          shipping: '€4.99',
          tax: '€28.00',
          total: '€162.97',
          notes: '',
        };

        // Simular retraso de red
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setOrder(mockOrder);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order:', error);
        setLoading(false);
      }
    };

    fetchOrder();
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

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Pedido no encontrado</h2>
        <p className="mt-2 text-gray-500">No se ha podido encontrar el pedido solicitado.</p>
        <Link
          href="/dashboard/orders"
          className="mt-6 inline-flex items-center text-primary hover:text-primary-dark"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" /> Volver a pedidos
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/dashboard/orders"
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Pedido #{order.id}
          </h1>
        </div>
        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Información del cliente y envío */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Información del cliente</h2>
              <div className="mt-4 space-y-3">
                <p className="text-sm font-medium text-gray-900">{order.customer.name}</p>
                <p className="text-sm text-gray-500">{order.customer.email}</p>
                <p className="text-sm text-gray-500">{order.customer.phone}</p>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">Dirección de envío</h2>
              <div className="mt-4 space-y-1">
                <p className="text-sm text-gray-500">{order.shipping.address}</p>
                <p className="text-sm text-gray-500">{order.shipping.city}, {order.shipping.postalCode}</p>
                <p className="text-sm text-gray-500">{order.shipping.country}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium text-gray-900">Detalles del pedido</h2>
            <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Número de pedido</dt>
                <dd className="mt-1 text-sm text-gray-900">#{order.id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Fecha</dt>
                <dd className="mt-1 text-sm text-gray-900">{order.date}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Método de pago</dt>
                <dd className="mt-1 text-sm text-gray-900">{order.paymentMethod}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Estado del pago</dt>
                <dd className="mt-1 text-sm text-gray-900">{order.paymentStatus}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 space-y-4">
            <button className="flex items-center text-primary hover:text-primary-dark">
              <TruckIcon className="h-5 w-5 mr-2" />
              <span>Actualizar estado de envío</span>
            </button>
            <button className="flex items-center text-primary hover:text-primary-dark">
              <CreditCardIcon className="h-5 w-5 mr-2" />
              <span>Ver detalles del pago</span>
            </button>
            <button className="flex items-center text-primary hover:text-primary-dark">
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              <span>Generar factura</span>
            </button>
          </div>
        </div>

        {/* Productos y resumen */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900">Productos</h2>
          <div className="mt-4 -mx-4 sm:-mx-6 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Producto</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Precio</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Cantidad</th>
                    <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.items.map((item: any) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-gray-500">{item.sku}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.price}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.quantity}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-medium text-gray-900">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">{order.subtotal}</dd>
            </div>
            <div className="flex justify-between mt-3">
              <dt className="text-sm text-gray-500">Envío</dt>
              <dd className="text-sm font-medium text-gray-900">{order.shipping}</dd>
            </div>
            <div className="flex justify-between mt-3">
              <dt className="text-sm text-gray-500">Impuestos</dt>
              <dd className="text-sm font-medium text-gray-900">{order.tax}</dd>
            </div>
            <div className="flex justify-between mt-6 border-t border-gray-200 pt-6">
              <dt className="text-base font-medium text-gray-900">Total</dt>
              <dd className="text-base font-medium text-gray-900">{order.total}</dd>
            </div>
          </div>

          {order.notes && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-900">Notas</h3>
              <p className="mt-2 text-sm text-gray-500">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
