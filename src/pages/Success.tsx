import { useLocation, Navigate, Link } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';
import type { OrderResponse } from '../types/order';
import { MercadoPagoButton } from '../components/ui/MercadoPagoButton';

export function Success() {
  const location = useLocation();
  const order = location.state?.order as OrderResponse | undefined;
  const shippingData = location.state?.shippingData;
  const cartItems = location.state?.cartItems || [];

  // Si no hay orden en el estado, redirigir al inicio para evitar vistas vacías
  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="flex-1 bg-bg p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full bg-card p-6 md:p-10 rounded-3xl border border-line shadow-sm text-center">
        <div className="w-20 h-20 bg-lime/20 text-lime rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-teal-ink" />
        </div>
        
        <h1 className="font-display font-black text-3xl md:text-4xl text-ink mb-2">
          ¡Gracias por tu compra!
        </h1>
        <p className="text-muted text-lg mb-8">
          Tu pedido <strong className="text-teal">#{order.id}</strong> ha sido procesado exitosamente.
        </p>

        {/* Resumen de la Orden */}
        <div className="bg-line-soft rounded-2xl p-6 text-left mb-8">
          <h2 className="font-bold text-ink flex items-center gap-2 mb-4 border-b border-line pb-2">
            <Package size={20} className="text-teal" />
            Resumen del Pedido
          </h2>
          
          {order.items && order.items.length > 0 && (
            <ul className="space-y-3 mb-6">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between items-start gap-4">
                  <div>
                    <p className="font-bold text-ink">{item.product || `Producto (SKU: ${item.sku})`}</p>
                    <p className="text-sm text-muted">Cant: {item.quantity} x ${Number(item.unit_price).toLocaleString('es-AR')}</p>
                  </div>
                  <span className="font-bold text-teal-ink">
                    ${Number(item.subtotal).toLocaleString('es-AR')}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="space-y-2 text-sm text-muted border-t border-line pt-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${Number(order.subtotal).toLocaleString('es-AR')}</span>
            </div>
            {Number(order.discount) > 0 && (
              <div className="flex justify-between text-lime">
                <span>Descuento:</span>
                <span>-${Number(order.discount).toLocaleString('es-AR')}</span>
              </div>
            )}
            <div className="flex justify-between items-center font-bold text-ink text-base mt-2 pt-2 border-t border-line">
              <span>Total pagado:</span>
              <span className="text-teal-ink text-xl">${Number(order.total).toLocaleString('es-AR')}</span>
            </div>
          </div>
        </div>

        {/* Datos de Envío */}
        {shippingData && (
          <div className="bg-line-soft rounded-2xl p-6 text-left mb-8">
            <h2 className="font-bold text-ink flex items-center gap-2 mb-4 border-b border-line pb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal"><path d="M5 9l2 9h10l2-9"></path><path d="M16 4.5l-4-2.5-4 2.5"></path><path d="M12 2v2.5"></path></svg>
              Datos de Envío
            </h2>
            <div className="text-sm text-muted space-y-1">
              <p><strong className="text-ink">Calle:</strong> {shippingData.street}</p>
              <p><strong className="text-ink">Ciudad:</strong> {shippingData.city}</p>
              <p><strong className="text-ink">Provincia:</strong> {shippingData.province}</p>
              <p><strong className="text-ink">Código Postal:</strong> {shippingData.postal_code}</p>
            </div>
          </div>
        )}

        <div className="mb-8 p-6 bg-card border border-teal-ink/20 rounded-2xl shadow-sm">
          <MercadoPagoButton items={cartItems.length > 0 ? cartItems : order.items || []} />
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center bg-teal hover:bg-teal-dark text-white font-bold py-3 px-8 rounded-xl transition-colors active:scale-95 w-full md:w-auto"
        >
          Volver a la tienda
        </Link>
      </div>
    </main>
  );
}
