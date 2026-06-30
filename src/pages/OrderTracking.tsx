import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrder } from '../features/checkout/services/orders.api';
import type { OrderResponse } from '../types/order';
import { Spinner } from '../components/ui/Spinner';
import { Package, Search, CreditCard, Truck } from 'lucide-react';

function renderInfoBox(title: string, icon: React.ReactNode, data?: Record<string, any>) {
  if (!data || Object.keys(data).length === 0) return null;
  return (
    <div className="bg-line-soft rounded-2xl p-6 mb-6">
      <h3 className="font-bold text-ink flex items-center gap-2 mb-4 border-b border-line pb-2">
        {icon}
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(data).map(([key, value]) => (
           <div key={key}>
             <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1">{key.replace(/_/g, ' ')}</p>
             <p className="text-sm font-medium text-ink capitalize">{String(value)}</p>
           </div>
        ))}
      </div>
    </div>
  );
}

export function OrderTracking() {
  const { code: urlCode } = useParams<{ code?: string }>();
  const navigate = useNavigate();
  
  const [inputCode, setInputCode] = useState(urlCode || '');
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (urlCode) {
      handleSearch(urlCode);
    }
  }, [urlCode]);

  const handleSearch = async (codeToSearch: string) => {
    if (!codeToSearch.trim()) return;
    
    setLoading(true);
    setError(null);
    setOrder(null);
    
    try {
      const data = await getOrder(codeToSearch);
      setOrder(data);
    } catch (err: any) {
      console.error('Error fetching order:', err);
      setError('No pudimos encontrar un pedido con ese código. Por favor, verificá que esté bien escrito.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      navigate(`/tracking/${inputCode}`);
    }
  };

  return (
    <main className="flex-1 bg-bg p-4 md:p-8 flex flex-col items-center min-h-[60vh]">
      <div className="max-w-2xl w-full">
        
        <header className="mb-8 text-center min-h-[104px]">
          <h1 className="font-display font-black text-3xl md:text-4xl text-ink">Seguí tu pedido</h1>
          <p className="mt-2 text-muted text-lg">Ingresá el código de seguimiento que recibiste al comprar.</p>
        </header>

        <form onSubmit={onSubmit} className="mb-8 flex gap-2">
          <label htmlFor="tracking-code" className="sr-only">Código de seguimiento</label>
          <input 
            id="tracking-code"
            type="text" 
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Ej: ABC-123456" 
            className="flex-1 bg-card border border-line rounded-xl px-4 py-3 focus:outline-none focus:border-teal transition-colors font-bold text-ink uppercase"
          />
          <button 
            type="submit" 
            aria-label="Buscar pedido"
            disabled={!inputCode.trim() || loading}
            className="bg-teal hover:bg-teal-dark text-white px-6 rounded-xl font-bold flex items-center justify-center transition-colors disabled:opacity-50 min-w-[68px]"
          >
            {loading ? <Spinner size={20} /> : <Search size={20} />}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl font-bold text-center mb-8">
            {error}
          </div>
        )}

        {order && (
          <div className="bg-card p-6 md:p-8 rounded-3xl border border-line shadow-sm">
            <div className="flex justify-between items-start mb-6 pb-6 border-b border-line">
              <div>
                <p className="text-sm font-bold text-muted uppercase tracking-wider mb-1">Código de Pedido</p>
                <h2 className="font-display font-black text-2xl text-ink">{order.code}</h2>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-muted uppercase tracking-wider mb-1">Estado General</p>
                <div className="inline-block bg-teal/10 text-teal-ink px-3 py-1 rounded-full font-bold text-sm">
                  {order.status}
                </div>
              </div>
            </div>

            {renderInfoBox("Información de Pago", <CreditCard size={20} className="text-teal" />, 
              order.payments && order.payments.length > 0 ? order.payments[0] : { estado: 'Pendiente de pago' }
            )}
            
            {renderInfoBox("Información de Envío", <Truck size={20} className="text-teal" />, 
              order.shipment ? order.shipment : { estado: 'Pendiente de preparación' }
            )}

            <h3 className="font-bold text-ink flex items-center gap-2 mb-4">
              <Package size={20} className="text-teal" />
              Detalle de los artículos
            </h3>
            
            {order.items && order.items.length > 0 ? (
              <ul className="space-y-3 mb-6">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between items-start gap-4">
                    <div>
                      <p className="font-bold text-ink">{item.product || `SKU: ${item.sku}`}</p>
                      <p className="text-sm text-muted">Cant: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-teal-ink">
                      ${Number(item.subtotal).toLocaleString('es-AR')}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted mb-6">No hay detalles de artículos disponibles.</p>
            )}

            <div className="space-y-2 text-sm text-muted border-t border-line pt-4">
              <div className="flex justify-between items-center font-bold text-ink text-base">
                <span>Total pagado:</span>
                <span className="text-teal-ink text-xl">${Number(order.total).toLocaleString('es-AR')}</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
