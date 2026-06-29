import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../features/cart/hooks/useCart';
import { createOrder } from '../features/checkout/services/orders.api';
import { getPaymentMethods } from '../features/checkout/services/paymentMethods.api';
import type { OrderPayload } from '../types/order';
import type { PaymentMethod } from '../types/paymentMethod';
import { Spinner } from '../components/ui/Spinner';
import { ChevronLeft, CreditCard } from 'lucide-react';

export function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number | null>(null);
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(true);

  useEffect(() => {
    async function loadPaymentMethods() {
      try {
        const methods = await getPaymentMethods();
        setPaymentMethods(methods);
        if (methods.length > 0) {
          setSelectedPaymentMethod(methods[0].id);
        }
      } catch (err) {
        console.error('Error loading payment methods:', err);
      } finally {
        setLoadingPaymentMethods(false);
      }
    }
    loadPaymentMethods();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dni: '',
    street: '',
    city: '',
    province: '',
    postal_code: ''
  });

  // Si el carrito está vacío, no debería poder hacer checkout
  if (items.length === 0) {
    return (
      <main className="flex-1 p-8 bg-bg flex flex-col items-center justify-center">
        <h2 className="font-display font-bold text-2xl text-ink mb-4">Tu carrito está vacío</h2>
        <Link to="/products" className="text-teal font-bold hover:underline">Volver al catálogo</Link>
      </main>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiError(null);

    const payload: OrderPayload = {
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        dni: parseInt(formData.dni, 10)
      },
      address: {
        street: formData.street,
        city: formData.city,
        province: formData.province,
        postal_code: formData.postal_code
      },
      items: items.map(i => ({
        variant_id: i.variantId,
        quantity: i.quantity
      })),
      payment_method_id: selectedPaymentMethod || undefined
    };

    try {
      const response = await createOrder(payload);
      const selectedMethodObj = paymentMethods.find(m => String(m.id) === String(selectedPaymentMethod));
      clearCart();
      // Redirigir a Success pasando la orden devuelta, datos de envío y los items del carrito para MP
      navigate('/success', { 
        state: { 
          order: response,
          shippingData: payload.address,
          cartItems: items,
          paymentMethod: selectedMethodObj
        }, 
        replace: true 
      });
    } catch (error) {
      console.error('Error creating order:', error);
      const msg = error instanceof Error ? error.message : 'Ocurrió un error al procesar tu pedido. Verifica tus datos.';
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 bg-bg pb-24 md:pb-12 max-w-5xl mx-auto w-full px-4 md:px-8">
      {/* Volver */}
      <div className="py-4">
        <Link to="/cart" className="inline-flex items-center text-ink hover:text-teal transition-colors font-bold text-sm">
          <ChevronLeft size={20} />
          <span>Volver al carrito</span>
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="font-display font-black text-3xl md:text-4xl text-ink">Finalizar Compra</h1>
        <p className="mt-2 text-muted text-lg">Completa tus datos para recibir tu pedido.</p>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
        
        {/* Formularios */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Datos Personales */}
          <section className="bg-card p-6 md:p-8 rounded-3xl border border-line shadow-sm">
            <h2 className="font-display font-bold text-xl text-ink mb-6 border-b border-line pb-2">Datos Personales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="checkout-name" className="text-sm font-bold text-ink">Nombre Completo *</label>
                <input id="checkout-name" required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-bg border border-line rounded-xl px-4 py-3 focus:outline-none focus:border-teal transition-colors" placeholder="Ej. Juan Pérez" />
              </div>
              <div className="space-y-1">
                <label htmlFor="checkout-email" className="text-sm font-bold text-ink">Correo Electrónico *</label>
                <input id="checkout-email" required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-bg border border-line rounded-xl px-4 py-3 focus:outline-none focus:border-teal transition-colors" placeholder="ejemplo@correo.com" />
              </div>
              <div className="space-y-1">
                <label htmlFor="checkout-phone" className="text-sm font-bold text-ink">Teléfono *</label>
                <input id="checkout-phone" required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-bg border border-line rounded-xl px-4 py-3 focus:outline-none focus:border-teal transition-colors" placeholder="Ej. 11 1234 5678" />
              </div>
              <div className="space-y-1">
                <label htmlFor="checkout-dni" className="text-sm font-bold text-ink">DNI *</label>
                <input id="checkout-dni" required type="number" name="dni" value={formData.dni} onChange={handleChange} className="w-full bg-bg border border-line rounded-xl px-4 py-3 focus:outline-none focus:border-teal transition-colors" placeholder="Sin puntos ni espacios" />
              </div>
            </div>
          </section>

          {/* Dirección de Envío */}
          <section className="bg-card p-6 md:p-8 rounded-3xl border border-line shadow-sm">
            <h2 className="font-display font-bold text-xl text-ink mb-6 border-b border-line pb-2">Dirección de Envío</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-1">
                <label htmlFor="checkout-street" className="text-sm font-bold text-ink">Calle y Número *</label>
                <input id="checkout-street" required type="text" name="street" value={formData.street} onChange={handleChange} className="w-full bg-bg border border-line rounded-xl px-4 py-3 focus:outline-none focus:border-teal transition-colors" placeholder="Av. Corrientes 1234, Depto 5B" />
              </div>
              <div className="space-y-1">
                <label htmlFor="checkout-city" className="text-sm font-bold text-ink">Ciudad *</label>
                <input id="checkout-city" required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-bg border border-line rounded-xl px-4 py-3 focus:outline-none focus:border-teal transition-colors" placeholder="Ciudad Autónoma de BS.AS" />
              </div>
              <div className="space-y-1">
                <label htmlFor="checkout-province" className="text-sm font-bold text-ink">Provincia *</label>
                <input id="checkout-province" required type="text" name="province" value={formData.province} onChange={handleChange} className="w-full bg-bg border border-line rounded-xl px-4 py-3 focus:outline-none focus:border-teal transition-colors" placeholder="Buenos Aires" />
              </div>
              <div className="space-y-1">
                <label htmlFor="checkout-postal_code" className="text-sm font-bold text-ink">Código Postal *</label>
                <input id="checkout-postal_code" required type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} className="w-full bg-bg border border-line rounded-xl px-4 py-3 focus:outline-none focus:border-teal transition-colors" placeholder="1043" />
              </div>
            </div>
          </section>

          {/* Método de Pago */}
          <section className="bg-card p-6 md:p-8 rounded-3xl border border-line shadow-sm">
            <h2 className="font-display font-bold text-xl text-ink mb-6 border-b border-line pb-2 flex items-center gap-2">
              <CreditCard size={24} className="text-teal" />
              Método de Pago
            </h2>
            {loadingPaymentMethods ? (
              <div className="flex justify-center p-4"><Spinner /></div>
            ) : paymentMethods.length > 0 ? (
              <div className="space-y-4">
                {paymentMethods.map(method => (
                  <label 
                    key={method.id}
                    htmlFor={`payment-method-${method.id}`}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPaymentMethod === method.id 
                        ? 'border-teal bg-teal/5' 
                        : 'border-line hover:border-teal/50'
                    }`}
                  >
                    <div className="pt-1">
                      <input 
                        id={`payment-method-${method.id}`}
                        type="radio" 
                        name="paymentMethod" 
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={() => setSelectedPaymentMethod(method.id)}
                        className="w-4 h-4 text-teal focus:ring-teal border-line"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-ink">{method.name}</p>
                      {method.description && (
                        <p className="text-sm text-muted mt-1">{method.description}</p>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-muted">No hay métodos de pago disponibles en este momento.</p>
            )}
          </section>

        </div>

        {/* Resumen Lateral */}
        <div className="lg:col-span-5">
          <div className="bg-card rounded-3xl p-6 md:p-8 border border-line shadow-sm sticky top-24">
            <h2 className="font-display font-bold text-xl text-ink mb-4">Tu Pedido</h2>
            
            <ul className="space-y-4 mb-6 max-h-[30vh] overflow-y-auto pr-2 hide-scrollbar">
              {items.map(item => (
                <li key={item.variantId} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-line-soft rounded-lg p-1 shrink-0">
                    <img src={item.imageUrl || '/placeholder.webp'} alt={item.productName} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-ink truncate text-sm">{item.productName}</p>
                    <p className="text-xs text-muted uppercase">{item.variantLabel} x{item.quantity}</p>
                  </div>
                  <span className="font-bold text-teal-ink text-sm shrink-0">
                    ${(item.price * item.quantity).toLocaleString('es-AR')}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-line pt-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted">Subtotal</span>
                <span className="font-bold text-ink">${subtotal.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Envío</span>
                <span className="font-bold text-teal text-sm">Gratis</span>
              </div>
            </div>

            <div className="border-t border-line pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-ink text-lg">Total</span>
                <span className="font-display font-black text-3xl text-teal-ink">
                  ${subtotal.toLocaleString('es-AR')}
                </span>
              </div>
            </div>

            {apiError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl font-bold">
                {apiError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center bg-lime hover:bg-lime-dark text-teal-ink py-4 rounded-xl font-extrabold text-lg transition-all active:scale-95 shadow-[0_4px_14px_0_rgba(142,212,76,0.39)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Spinner /> : 'Confirmar Pedido'}
            </button>
          </div>
        </div>

      </form>
    </main>
  );
}
