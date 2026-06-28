import { Link } from 'react-router-dom';
import { useCart } from '@/features/cart/hooks/useCart';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export function Cart() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <main className="flex-1 bg-bg p-4 md:p-8 flex flex-col items-center justify-center text-center">
        <div className="bg-card p-8 rounded-3xl border border-line border-dashed max-w-md w-full">
          <div className="w-16 h-16 bg-line-soft rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCartIcon />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-ink mb-2">Tu carrito está vacío</h2>
          <p className="text-muted mb-6">Parece que aún no has añadido nada al carrito. ¡Explora nuestro catálogo!</p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center bg-teal hover:bg-teal-dark text-white font-bold py-3 px-8 rounded-xl transition-colors active:scale-95"
          >
            Ir al catálogo
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-bg p-4 md:p-8 pb-24 md:pb-8 max-w-5xl mx-auto w-full">
      <header className="mb-6">
        <h1 className="font-display font-extrabold text-3xl text-ink">Tu Carrito</h1>
        <p className="mt-2 text-muted">Revisa tus productos antes de finalizar la compra.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lista de Productos */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <article 
              key={item.variantId} 
              className="bg-card p-4 rounded-2xl border border-line flex gap-4 items-start md:items-center relative shadow-sm"
            >
              <Link to={`/products/${item.productSlug}`} className="shrink-0 bg-line-soft rounded-xl p-2 w-24 h-24 flex items-center justify-center">
                <img 
                  src={item.imageUrl || '/placeholder.webp'} 
                  alt={item.productName} 
                  className="w-full h-full object-contain"
                />
              </Link>

              <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-display font-bold text-ink truncate">
                    <Link to={`/products/${item.productSlug}`} className="hover:text-teal transition-colors">
                      {item.productName}
                    </Link>
                  </h3>
                  <p className="text-sm font-bold text-muted mt-1 uppercase tracking-wider">{item.variantLabel}</p>
                  <p className="font-extrabold text-teal-ink mt-2">
                    ${item.price.toLocaleString('es-AR')}
                  </p>
                </div>

                {/* Controles */}
                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                  {/* Cantidad */}
                  <div className="flex items-center gap-3 bg-bg border border-line rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-1 rounded bg-card text-ink disabled:opacity-50 hover:text-teal transition-colors"
                      aria-label="Restar cantidad"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold w-4 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      disabled={item.quantity >= item.available}
                      className="p-1 rounded bg-card text-ink disabled:opacity-50 hover:text-teal transition-colors"
                      aria-label="Sumar cantidad"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Eliminar */}
                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors absolute top-2 right-2 md:relative md:top-auto md:right-auto"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Resumen */}
        <div className="lg:col-span-4">
          <div className="bg-card rounded-3xl p-6 border border-line shadow-sm sticky top-24">
            <h2 className="font-display font-extrabold text-xl text-ink mb-4">Resumen de compra</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="font-bold text-ink">${subtotal.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Envío</span>
                <span className="font-bold text-teal">A calcular</span>
              </div>
            </div>

            <div className="border-t border-line pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-ink">Total parcial</span>
                <span className="font-display font-black text-2xl text-teal-ink">
                  ${subtotal.toLocaleString('es-AR')}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-lime hover:bg-lime-dark text-teal-ink py-4 rounded-xl font-extrabold text-lg transition-all active:scale-95 shadow-[0_4px_14px_0_rgba(142,212,76,0.39)]"
            >
              <span>Ir a pagar</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

// Simple icon para el empty state
function ShoppingCartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
      <circle cx="8" cy="21" r="1"/>
      <circle cx="19" cy="21" r="1"/>
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    </svg>
  );
}
