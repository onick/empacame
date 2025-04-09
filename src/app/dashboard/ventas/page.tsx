"use client";

import { useState } from 'react';
import { ArrowDownTrayIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { formatPrice } from '@/lib/stores/config-store';
import { useConfigStore } from '@/lib/stores/config-store';

// Mock data
const salesData = {
  summary: {
    totalSales: 12589.95,
    orders: 87,
    averageOrder: 144.71,
    monthlyChange: 12.5,
  },
  weeklyData: [
    { date: '01/04/2025', sales: 1245.99, orders: 12 },
    { date: '02/04/2025', sales: 1567.50, orders: 15 },
    { date: '03/04/2025', sales: 1389.75, orders: 13 },
    { date: '04/04/2025', sales: 1678.25, orders: 16 },
    { date: '05/04/2025', sales: 2145.50, orders: 21 },
    { date: '06/04/2025', sales: 2478.75, orders: 24 },
    { date: '07/04/2025', sales: 2084.21, orders: 20 },
  ],
  topProducts: [
    { id: 1, name: 'Bolso Tote Elegance', sales: 12, revenue: 1079.88 },
    { id: 2, name: 'Bolso Crossbody Urban', sales: 10, revenue: 699.90 },
    { id: 3, name: 'Set Exclusivo Noche Perfecta', sales: 5, revenue: 1249.95 },
    { id: 4, name: 'Bolso Luxury Collection', sales: 8, revenue: 1599.92 },
    { id: 5, name: 'Cartera Minimalista', sales: 15, revenue: 749.85 },
  ],
  paymentMethods: [
    { method: 'Tarjeta de crédito', orders: 52, percentage: 59.8 },
    { method: 'PayPal', orders: 21, percentage: 24.1 },
    { method: 'Transferencia', orders: 9, percentage: 10.3 },
    { method: 'Otros', orders: 5, percentage: 5.8 },
  ]
};

// Helper component for formatting dates - separating component logic
const FormattedDate = ({ dateString }: { dateString: string }) => {
  const [day, month, year] = dateString.split('/');
  const date = new Date(`${year}-${month}-${day}`);
  const formatted = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
  
  return <>{formatted}</>;
};

// Helper component for change indicators - separating component logic
const ChangeIndicator = ({ change }: { change: number }) => {
  if (change > 0) {
    return (
      <span className="inline-flex items-center text-green-600">
        <ArrowUpIcon className="h-4 w-4 mr-1" />
        {change}%
      </span>
    );
  } else if (change < 0) {
    return (
      <span className="inline-flex items-center text-red-600">
        <ArrowDownIcon className="h-4 w-4 mr-1" />
        {Math.abs(change)}%
      </span>
    );
  } else {
    return <span className="text-gray-500">0%</span>;
  }
};

export default function Sales() {
  const [period, setPeriod] = useState('week');
  const { currency } = useConfigStore();

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ventas</h1>
          <p className="mt-1 text-sm text-gray-500">Análisis de ventas de tu tienda.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <select
            className="block border border-gray-300 rounded-md py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="day">Hoy</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="year">Este año</option>
          </select>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            Exportar
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Ventas Totales</h3>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">{formatPrice(salesData.summary.totalSales)}</div>
            <div className="text-xs"><ChangeIndicator change={salesData.summary.monthlyChange} /></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Número de Pedidos</h3>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">{salesData.summary.orders}</div>
            <div className="text-xs"><ChangeIndicator change={10.5} /></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Valor Medio de Pedido</h3>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">{formatPrice(salesData.summary.averageOrder)}</div>
            <div className="text-xs"><ChangeIndicator change={15.5} /></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Tasa de Conversión</h3>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">3.2%</div>
            <div className="text-xs"><ChangeIndicator change={1.8} /></div>
          </div>
        </div>
      </div>

      {/* Sales graph (placeholder) */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Evolución de Ventas</h3>
        <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
          <p className="text-gray-500">Gráfico de ventas sería mostrado aquí...</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top products */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Productos Más Vendidos</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ventas
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ingresos
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salesData.topProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.sales} uds.
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatPrice(product.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment methods */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Métodos de Pago</h3>
          </div>
          <div className="p-6">
            <ul className="divide-y divide-gray-200">
              {salesData.paymentMethods.map((payment) => (
                <li key={payment.method} className="py-4 flex justify-between">
                  <div className="text-sm font-medium text-gray-900">{payment.method}</div>
                  <div className="text-sm text-gray-500">
                    {payment.orders} pedidos ({payment.percentage}%)
                  </div>
                  <div className="w-1/3">
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-2 bg-primary rounded-full"
                        style={{ width: `${payment.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Recent sales */}
      <div className="bg-white rounded-lg shadow mt-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Ventas Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ventas
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pedidos
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesData.weeklyData.map((day) => (
                <tr key={day.date} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <FormattedDate dateString={day.date} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatPrice(day.sales)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {day.orders}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}