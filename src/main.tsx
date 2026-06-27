import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Fuentes de marca (solo los pesos que usa el diseño)
import '@fontsource/archivo/700.css';
import '@fontsource/archivo/800.css';
import '@fontsource/archivo/900.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';

import './index.css';
import { App } from '@/App';
import { CartProvider } from '@/features/cart/context/CartContext';
import { initMercadoPago } from '@mercadopago/sdk-react';

initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY, {
    locale: "es-AR",
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);