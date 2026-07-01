import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, ShoppingCart, ChevronDown } from 'lucide-react';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { fetchCategories } from '@/features/products/services/taxonomies.api';
import type { Category } from '@/types/catalog';

import { useCart } from '@/features/cart/hooks/useCart';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { itemCount } = useCart();

  useEffect(() => {
    fetchCategories().then(setCategories).catch(err => console.error("Error loading categories", err));
  }, []);

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
            <div className="relative group cursor-pointer">
              <button 
                className="flex items-center gap-2 bg-teal hover:bg-teal-dark text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-teal/20"
              >
                <span>Catálogo</span>
                <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
              </button>
              
              {/* Dropdown flotante */}
              <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-card border border-line rounded-xl shadow-lg overflow-hidden flex flex-col py-2">
                  <Link to="/products" className="px-4 py-2.5 hover:bg-line-soft text-ink font-bold text-sm transition-colors">
                    Todos los productos
                  </Link>
                  <div className="h-px bg-line mx-4 my-1"></div>
                  {categories.map(cat => (
                    <Link key={cat.id} to={`/products?category=${cat.slug}`} className="px-4 py-2 hover:bg-line-soft text-muted hover:text-teal font-medium text-sm transition-colors">
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <NavLink 
              to="/tracking" 
              className={({ isActive }) => `font-bold text-sm transition-colors ${isActive ? 'text-teal' : 'text-ink hover:text-teal'}`}
            >
              Seguimiento
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
