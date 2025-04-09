import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreConfig {
  currency: 'EUR' | 'USD' | 'GBP';
  language: 'es' | 'en' | 'fr';
  vat: number;
  shippingFreeThreshold: number;
  shippingDefaultPrice: number;
  
  // Métodos para actualizar la configuración
  setCurrency: (currency: 'EUR' | 'USD' | 'GBP') => void;
  setLanguage: (language: 'es' | 'en' | 'fr') => void;
  setVat: (vat: number) => void;
  setShippingFreeThreshold: (threshold: number) => void;
  setShippingDefaultPrice: (price: number) => void;
  updateConfig: (config: Partial<Omit<StoreConfig, 'setCurrency' | 'setLanguage' | 'setVat' | 'setShippingFreeThreshold' | 'setShippingDefaultPrice' | 'updateConfig'>>) => void;
}

export const useConfigStore = create<StoreConfig>()(
  persist(
    (set) => ({
      currency: 'EUR',
      language: 'es',
      vat: 21,
      shippingFreeThreshold: 50,
      shippingDefaultPrice: 4.99,
      
      setCurrency: (currency) => set({ currency }),
      setLanguage: (language) => set({ language }),
      setVat: (vat) => set({ vat }),
      setShippingFreeThreshold: (shippingFreeThreshold) => set({ shippingFreeThreshold }),
      setShippingDefaultPrice: (shippingDefaultPrice) => set({ shippingDefaultPrice }),
      updateConfig: (config) => set((state) => ({ ...state, ...config }))
    }),
    {
      name: 'store-config'
    }
  )
);

// Utilidad para formatear precios según la moneda configurada
export const formatPrice = (price: number, currency?: 'EUR' | 'USD' | 'GBP') => {
  const { currency: storeCurrency } = useConfigStore.getState();
  const currencyToUse = currency || storeCurrency;
  
  let currencyCode: string;
  let locale: string;
  
  switch (currencyToUse) {
    case 'USD':
      currencyCode = 'USD';
      locale = 'en-US';
      break;
    case 'GBP':
      currencyCode = 'GBP';
      locale = 'en-GB';
      break;
    case 'EUR':
    default:
      currencyCode = 'EUR';
      locale = 'es-ES';
      break;
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode
  }).format(price);
};
