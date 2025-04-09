"use client";

import { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

// Mock data
const analyticsData = {
  summary: {
    visitors: 12540,
    pageViews: 45789,
    conversionRate: 3.2,
    bounceRate: 42.5,
  },
  topPages: [
    { page: '/', title: 'Página de inicio', views: 15230, uniqueVisitors: 9875 },
    { page: '/products', title: 'Catálogo de productos', views: 8546, uniqueVisitors: 5421 },
    { page: '/products/bolsos', title: 'Categoría Bolsos', views: 5230, uniqueVisitors: 3542 },
    { page: '/products/accesorios', title: 'Categoría Accesorios', views: 4125, uniqueVisitors: 2987 },
    { page: '/products/sets', title: 'Categoría Sets', views: 2890, uniqueVisitors: 1845 },
  ],
  trafficSources: [
    { source: 'Directo', visits: 5230, percentage: 41.7 },
    { source: 'Búsqueda orgánica', visits: 3854, percentage: 30.7 },
    { source: 'Social', visits: 1980, percentage: 15.8 },
    { source: 'Referidos', visits: 980, percentage: 7.8 },
    { source: 'Email', visits: 496, percentage: 4.0 },
  ],
  devices: [
    { type: 'Móvil', visits: 7650, percentage: 61.0 },
    { type: 'Escritorio', visits: 3845, percentage: 30.7 },
    { type: 'Tablet', visits: 1045, percentage: 8.3 },
  ],
  monthlyTrend: [
    { month: 'Ene', visitors: 8950, conversion: 2.8 },
    { month: 'Feb', visitors: 9235, conversion: 2.9 },
    { month: 'Mar', visitors: 10240, conversion: 3.0 },
    { month: 'Abr', visitors: 12540, conversion: 3.2 },
  ]
};

export default function Analytics() {
  const [period, setPeriod] = useState('month');

  // Format number with thousands separator
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-ES').format(num);
  };

  // Format percentage
  const formatPercentage = (num: number) => {
    return num.toFixed(1) + '%';
  };

  // Get change indicator
  const getChangeIndicator = (change: number) => {
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

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Análisis</h1>
          <p className="mt-1 text-sm text-gray-500">Estadísticas y comportamiento de visitantes.</p>
        </div>
        <div className="mt-4 md:mt-0">
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
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Visitantes</h3>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.summary.visitors)}</div>
            <div className="text-xs">{getChangeIndicator(12.5)}</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Páginas vistas</h3>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.summary.pageViews)}</div>
            <div className="text-xs">{getChangeIndicator(8.3)}</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Tasa de conversión</h3>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">{formatPercentage(analyticsData.summary.conversionRate)}</div>
            <div className="text-xs">{getChangeIndicator(0.4)}</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Tasa de rebote</h3>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">{formatPercentage(analyticsData.summary.bounceRate)}</div>
            <div className="text-xs">{getChangeIndicator(-1.2)}</div>
          </div>
        </div>
      </div>

      {/* Visitors trend graph (placeholder) */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Tendencia de Visitantes</h3>
        <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
          <p className="text-gray-500">Gráfico de visitantes sería mostrado aquí...</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top pages */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Páginas Más Visitadas</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Página
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vistas
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visitantes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analyticsData.topPages.map((page) => (
                  <tr key={page.page} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{page.title}</div>
                      <div className="text-xs text-gray-500">{page.page}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                      {formatNumber(page.views)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                      {formatNumber(page.uniqueVisitors)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traffic sources */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Fuentes de Tráfico</h3>
          </div>
          <div className="p-6">
            <ul className="divide-y divide-gray-200">
              {analyticsData.trafficSources.map((source) => (
                <li key={source.source} className="py-4 flex justify-between">
                  <div className="text-sm font-medium text-gray-900">{source.source}</div>
                  <div className="text-sm text-gray-500">
                    {formatNumber(source.visits)} ({source.percentage}%)
                  </div>
                  <div className="w-1/3">
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-2 bg-primary rounded-full"
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Devices */}
      <div className="bg-white rounded-lg shadow mt-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Dispositivos</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analyticsData.devices.map((device) => (
              <div key={device.type} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-lg font-medium text-gray-900">{device.type}</div>
                <div className="text-3xl font-bold my-2">{device.percentage}%</div>
                <div className="text-sm text-gray-500">{formatNumber(device.visits)} visitantes</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly trend */}
      <div className="bg-white rounded-lg shadow mt-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Tendencia Mensual</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mes
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visitantes
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tasa de Conversión
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cambio
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analyticsData.monthlyTrend.map((month, index) => {
                const prevMonth = index > 0 ? analyticsData.monthlyTrend[index - 1] : null;
                const change = prevMonth ? ((month.visitors - prevMonth.visitors) / prevMonth.visitors) * 100 : 0;
                
                return (
                  <tr key={month.month} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {month.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                      {formatNumber(month.visitors)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                      {formatPercentage(month.conversion)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      {getChangeIndicator(Math.round(change * 10) / 10)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}