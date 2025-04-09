"use client";

import { 
  ShoppingBagIcon, 
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { formatPrice } from '@/lib/stores/config-store';
import { useConfigStore } from '@/lib/stores/config-store';

// Mock data with numeric values
const statsMockData = [
  { id: 1, name: 'Ventas Hoy', value: 1200, change: '+12%', changeType: 'increase', icon: CurrencyDollarIcon, isCurrency: true },
  { id: 2, name: 'Pedidos Pendientes', value: 28, change: '+4%', changeType: 'increase', icon: ShoppingBagIcon, isCurrency: false },
  { id: 3, name: 'Clientes Nuevos', value: 15, change: '+8%', changeType: 'increase', icon: UserGroupIcon, isCurrency: false },
  { id: 4, name: 'Visitantes', value: 342, change: '+23%', changeType: 'increase', icon: ChartBarIcon, isCurrency: false },
];

const recentOrdersMockData = [
  { id: '8743', customer: 'Ana García', date: '22 Mar 2023', amount: 102.00, status: 'Completado' },
  { id: '8742', customer: 'Carlos Pérez', date: '21 Mar 2023', amount: 89.00, status: 'Procesando' },
  { id: '8741', customer: 'María López', date: '21 Mar 2023', amount: 125.00, status: 'Pendiente' },
  { id: '8740', customer: 'Juan Martínez', date: '20 Mar 2023', amount: 78.00, status: 'Completado' },
  { id: '8739', customer: 'Laura Sánchez', date: '20 Mar 2023', amount: 157.00, status: 'Completado' },
];

const topProductsMockData = [
  { id: 1, name: 'Bolso Tote Elegance', sales: 542, revenue: 48780 },
  { id: 2, name: 'Cartera Minimalista', sales: 423, revenue: 21150 },
  { id: 3, name: 'Bolso Crossbody Urban', sales: 389, revenue: 27230 },
  { id: 4, name: 'Pañuelo de Seda Floral', sales: 294, revenue: 11760 },
];

// Helper component for order status
const OrderStatus = ({ status }: { status: string }) => {
  const getStatusClasses = () => {
    switch(status) {
      case 'Completado':
        return 'bg-green-100 text-green-800';
      case 'Procesando':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };
  
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses()}`}>
      {status}
    </span>
  );
};

export default function Dashboard() {
  // Use the config store to get the currency
  const { currency } = useConfigStore();
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Bienvenido al panel de administración de tu tienda online.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statsMockData.map((stat) => (
          <div
            key={stat.id}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stat.isCurrency ? formatPrice(stat.value) : stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <span 
                  className={`font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </span>{' '}
                <span className="text-gray-500">vs ayer</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent orders */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Pedidos Recientes</h2>
              <Link href="/dashboard/pedidos" className="text-sm text-primary font-medium hover:text-primary-dark">
                Ver todos
              </Link>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pedido
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Importe
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrdersMockData.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-primary">
                        #{order.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {order.customer}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatPrice(order.amount)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <OrderStatus status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top selling products */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Productos Más Vendidos</h2>
              <Link href="/dashboard/products" className="text-sm text-primary font-medium hover:text-primary-dark">
                Ver todos
              </Link>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unidades
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ingresos
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topProductsMockData.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {product.sales}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatPrice(product.revenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}