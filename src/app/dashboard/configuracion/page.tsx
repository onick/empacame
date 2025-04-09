"use client";

import { useState, useEffect } from 'react';
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useConfigStore } from '@/lib/stores/config-store';

export default function Settings() {
  // Obtener la configuración del store
  const { 
    currency, 
    language, 
    vat, 
    shippingFreeThreshold, 
    shippingDefaultPrice, 
    updateConfig
  } = useConfigStore();
  
  const [formData, setFormData] = useState({
    storeName: 'Mi Tienda de Bolsos',
    email: 'contacto@mitienda.com',
    phone: '+34 666 888 999',
    address: 'Calle Ejemplo, 123, 28001 Madrid',
    logo: null,
    currency: currency,
    language: language,
    vat: vat,
    // Shipping settings
    shippingFreeThreshold: shippingFreeThreshold,
    shippingDefaultPrice: shippingDefaultPrice,
    // Payment settings
    stripeEnabled: true,
    paypalEnabled: true,
    transferEnabled: true,
    // Email notifications
    notifyNewOrder: true,
    notifyLowStock: true,
    notifyNewCustomer: true,
  });

  // Asegurar que el formulario refleja la configuración global al cargar la página
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      currency,
      language,
      vat,
      shippingFreeThreshold,
      shippingDefaultPrice
    }));
  }, [currency, language, vat, shippingFreeThreshold, shippingDefaultPrice]);

  const [activeTab, setActiveTab] = useState('general');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload for logo
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, logo: e.target.files?.[0] || null }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Actualizar la configuración global
    updateConfig({
      currency: formData.currency as 'EUR' | 'USD' | 'GBP',
      language: formData.language as 'es' | 'en' | 'fr',
      vat: Number(formData.vat),
      shippingFreeThreshold: Number(formData.shippingFreeThreshold),
      shippingDefaultPrice: Number(formData.shippingDefaultPrice)
    });
    
    // Aquí normalmente guardarías los datos en la base de datos
    console.log('Settings to save:', formData);
    
    alert('Configuración guardada correctamente');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="mt-1 text-sm text-gray-500">Gestiona los ajustes de tu tienda.</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'general'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'shipping'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('shipping')}
          >
            Envíos
          </button>
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'payment'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('payment')}
          >
            Pagos
          </button>
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'notifications'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('notifications')}
          >
            Notificaciones
          </button>
        </nav>
      </div>

      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit}>
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
                    Nombre de la Tienda
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="storeName"
                      id="storeName"
                      value={formData.storeName}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Dirección
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                    Logo
                  </label>
                  <div className="mt-1 flex items-center">
                    <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                      {formData.logo ? (
                        <img
                          src={URL.createObjectURL(formData.logo as File)}
                          alt="Logo preview"
                          className="h-12 w-12 object-contain"
                        />
                      ) : (
                        <ArrowUpTrayIcon className="h-6 w-6" aria-hidden="true" />
                      )}
                    </div>
                    <label
                      htmlFor="file-upload"
                      className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
                    >
                      <span>Cambiar</span>
                      <input
                        id="file-upload"
                        name="logo"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                    Moneda
                  </label>
                  <div className="mt-1">
                    <select
                      id="currency"
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="EUR">Euro (€)</option>
                      <option value="USD">Dólar ($)</option>
                      <option value="GBP">Libra Esterlina (£)</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                    Idioma
                  </label>
                  <div className="mt-1">
                    <select
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="es">Español</option>
                      <option value="en">Inglés</option>
                      <option value="fr">Francés</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="vat" className="block text-sm font-medium text-gray-700">
                    IVA (%)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="vat"
                      id="vat"
                      value={formData.vat}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shipping Settings */}
          {activeTab === 'shipping' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="shippingFreeThreshold" className="block text-sm font-medium text-gray-700">
                    Umbral para envío gratuito (€)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="shippingFreeThreshold"
                      id="shippingFreeThreshold"
                      value={formData.shippingFreeThreshold}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Los pedidos superiores a este importe tendrán envío gratuito.
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="shippingDefaultPrice" className="block text-sm font-medium text-gray-700">
                    Precio de envío por defecto (€)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      step="0.01"
                      name="shippingDefaultPrice"
                      id="shippingDefaultPrice"
                      value={formData.shippingDefaultPrice}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === 'payment' && (
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="stripeEnabled"
                    name="stripeEnabled"
                    type="checkbox"
                    checked={formData.stripeEnabled}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="stripeEnabled" className="ml-3 block text-sm font-medium text-gray-700">
                    Habilitar Stripe (tarjeta de crédito)
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="paypalEnabled"
                    name="paypalEnabled"
                    type="checkbox"
                    checked={formData.paypalEnabled}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="paypalEnabled" className="ml-3 block text-sm font-medium text-gray-700">
                    Habilitar PayPal
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="transferEnabled"
                    name="transferEnabled"
                    type="checkbox"
                    checked={formData.transferEnabled}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="transferEnabled" className="ml-3 block text-sm font-medium text-gray-700">
                    Habilitar transferencia bancaria
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="notifyNewOrder"
                    name="notifyNewOrder"
                    type="checkbox"
                    checked={formData.notifyNewOrder}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="notifyNewOrder" className="ml-3 block text-sm font-medium text-gray-700">
                    Notificar nuevos pedidos
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="notifyLowStock"
                    name="notifyLowStock"
                    type="checkbox"
                    checked={formData.notifyLowStock}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="notifyLowStock" className="ml-3 block text-sm font-medium text-gray-700">
                    Notificar stock bajo
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="notifyNewCustomer"
                    name="notifyNewCustomer"
                    type="checkbox"
                    checked={formData.notifyNewCustomer}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="notifyNewCustomer" className="ml-3 block text-sm font-medium text-gray-700">
                    Notificar nuevos clientes
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Form actions */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}