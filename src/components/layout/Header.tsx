import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, ShoppingCart } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

import { useCart } from '../../features/cart/hooks/useCart';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-md shadow-sm border-b border-line px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <button 
              type="button"
              aria-label="Abrir menú"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 -ml-2 text-ink hover:text-teal transition-colors"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center" aria-label="Ir a la página de inicio">
              {/* <img src="/logo.png" alt="Víbora Padel Store" className="h-10 w-auto object-contain" /> */}
              <span className="text-xl font-bold text-teal font-display">Víbora Padel Store</span>
            </Link>
          </div>

          {/* Navegación de Escritorio - Izquierda */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Navegación principal de escritorio">
            <NavLink 
              to="/products" 
              className={({ isActive }) => `font-bold text-sm transition-colors ${isActive ? 'text-teal' : 'text-ink hover:text-teal'}`}
            >
              Catálogo
            </NavLink>
          </nav>
        </div>

        {/* Navegación de Escritorio - Derecha */}
        <div className="hidden md:flex items-center">
          <NavLink 
            to="/cart" 
            className="relative p-2 text-ink hover:text-teal transition-colors"
            aria-label="Ir al carrito"
          >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-lime text-[9px] font-bold text-teal-ink">
                {itemCount}
              </span>
            )}
          </NavLink>
        </div>
      </header>

      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </>
  );
}
